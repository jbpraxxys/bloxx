import React, { useRef, useEffect, useCallback } from 'react'
import { useProjectStore } from '../../store/projectStore'
import { useCanvasStore } from '../../store/canvasStore'
import { useDesignTokensStore } from '../../store/designTokensStore'
import { VIEWPORT_CONFIG } from '../../types'
import { PreviewBar } from './PreviewBar'
import type { CanvasToShellMessage } from '../../types'

const CANVAS_IFRAME_SRC = '/src/canvas/index.html'

export const CanvasContainer: React.FC = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { project } = useProjectStore()
  const { viewport, editorMode, selectedBlockIndex, selectElement, clearSelection } = useCanvasStore()
  const isDirty = useDesignTokensStore((s) => s.isDirty)

  const viewportWidth = VIEWPORT_CONFIG[viewport].width

  // ─── Send RENDER to iframe ───────────────────────────
  const sendRender = useCallback(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow || !project) return

    const activePage = project.pages[0]
    if (!activePage) return

    iframe.contentWindow.postMessage(
      {
        type: 'RENDER',
        page: activePage,
        tokens: project.designTokens,
      },
      '*',
    )
  }, [project])

  // ─── Listen for messages from iframe ─────────────────
  useEffect(() => {
    const handleMessage = (event: MessageEvent<CanvasToShellMessage>) => {
      const msg = event.data
      if (!msg || !msg.type) return

      switch (msg.type) {
        case 'ELEMENT_SELECTED':
          if (msg.blockIndex >= 0) {
            selectElement(msg.blockIndex, msg.elementRole)
          } else {
            clearSelection()
          }
          break

        case 'BLOCK_REORDERED': {
          const { fromIndex, toIndex } = msg
          const pageId = project?.pages[0]?.id
          if (pageId) {
            useProjectStore.getState().moveBlock(pageId, fromIndex, toIndex)
            setTimeout(sendRender, 0)
          }
          break
        }

        case 'CONTENT_EDITED': {
          const { blockIndex, slotName, value } = msg as any
          const currentProject = project
          if (currentProject) {
            const pageId = currentProject.pages[0]?.id
            const block = currentProject.pages[0]?.blocks[blockIndex]
            if (pageId && block) {
              useProjectStore.getState().updateBlockContent(pageId, block.id, { [slotName]: value })
            }
          }
          break
        }
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [project, selectElement, clearSelection, sendRender])

  // ─── Re-render when project state changes ────────────
  useEffect(() => {
    sendRender()
  }, [project, sendRender])

  // ─── Send viewport width to iframe ───────────────────
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    iframe.contentWindow.postMessage({ type: 'SET_VIEWPORT_WIDTH', width: viewportWidth }, '*')
  }, [viewportWidth])

  // ─── Send selection to iframe ────────────────────────
  useEffect(() => {
    const iframe = iframeRef.current
    if (!iframe?.contentWindow) return
    iframe.contentWindow.postMessage(
      { type: 'SET_SELECTION', blockIndex: selectedBlockIndex },
      '*',
    )
  }, [selectedBlockIndex])

  // ─── Re-render when design tokens are applied ────────
  useEffect(() => {
    if (!isDirty && project) {
      sendRender()
    }
  }, [isDirty, sendRender, project])

  // ─── Handle drop from block library ──────────────────
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'copy'
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const data = e.dataTransfer.getData('text/plain')
    if (!data) return
    try {
      const { blockId, variantId } = JSON.parse(data)
      const pageId = project?.pages[0]?.id
      if (pageId) {
        useProjectStore.getState().addBlock(pageId, blockId, variantId)
      }
    } catch {
      // ignore invalid drop data
    }
  }

  // ─── Render device frame ─────────────────────────────
  const renderIframe = () => (
    <iframe
      ref={iframeRef}
      src={CANVAS_IFRAME_SRC}
      style={{ width: viewportWidth, border: 'none', background: '#fff' }}
      title="Bloxx Canvas"
    />
  )

  const renderWithDeviceFrame = () => {
    if (viewport === 'desktop') {
      return (
        <div style={{ boxShadow: '0 2px 20px rgba(0,0,0,0.15)', borderRadius: 0, overflow: 'hidden' }}>
          {renderIframe()}
        </div>
      )
    }

    if (viewport === 'tablet') {
      return (
        <div style={{
          padding: '12px 8px',
          background: '#1a1a1a',
          borderRadius: 16,
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
          margin: '24px auto',
        }}>
          {renderIframe()}
        </div>
      )
    }

    // mobile
    return (
      <div style={{
        padding: '40px 4px',
        background: '#1a1a1a',
        borderRadius: 32,
        boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        margin: '24px auto',
      }}>
        <div style={{
          height: 20,
          background: '#000',
          borderRadius: '0 0 12px 12px',
          marginTop: -40,
          marginBottom: 8,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}>
          <div style={{ width: 60, height: 4, background: '#333', borderRadius: 2 }} />
        </div>
        {renderIframe()}
        <div style={{
          height: 20,
          background: '#000',
          borderRadius: '12px 12px 0 0',
          marginBottom: -40,
          marginTop: 8,
        }} />
      </div>
    )
  }

  if (editorMode === 'preview-fullscreen') {
    return (
      <div className="bloxx-canvas-area" style={{ padding: 0, background: '#fff' }}>
        <PreviewBar />
        {renderWithDeviceFrame()}
      </div>
    )
  }

  return (
    <div
      className="bloxx-canvas-area"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      onClick={() => clearSelection()}
    >
      {project ? (
        renderWithDeviceFrame()
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
          <div style={{ textAlign: 'center' }}>
            <h2 style={{ fontWeight: 400, marginBottom: 8 }}>No project open</h2>
            <p>Create or open a project to get started</p>
          </div>
        </div>
      )}
    </div>
  )
}
