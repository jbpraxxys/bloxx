import React, { useState } from 'react'
import { useCanvasStore } from '../../store/canvasStore'
import { useProjectStore } from '../../store/projectStore'
import { ExportDialog } from './ExportDialog'
import { undoRedo } from '../../lib/undo-redo'
import { VIEWPORT_CONFIG, type ViewportDevice } from '../../types'

export const Toolbar: React.FC = () => {
  const { viewport, setViewport, editorMode, setEditorMode, canvasMode, setCanvasMode } = useCanvasStore()
  const { project } = useProjectStore()
  const [showExport, setShowExport] = useState(false)

  const handlePreview = () => {
    if (editorMode === 'edit') {
      setEditorMode('preview-fullscreen')
    } else {
      setEditorMode('edit')
    }
  }

  const handlePreviewTab = () => {
    const canvasIframe = document.querySelector('.bloxx-canvas-area iframe') as HTMLIFrameElement | null
    if (!canvasIframe?.contentDocument) return
    const previewContent = canvasIframe.contentDocument.documentElement.outerHTML
    const blob = new Blob(['<!DOCTYPE html>\n' + previewContent], { type: 'text/html' })
    const url = URL.createObjectURL(blob)
    window.open(url, '_blank')
  }

  return (
    <div className="bloxx-toolbar">
      <div className="bloxx-toolbar__group">
        <strong style={{ fontSize: '1.1rem', marginRight: 8 }}>Bloxx</strong>
      </div>

      <div className="bloxx-toolbar__separator" />

      {editorMode === 'edit' ? (
        <>
          <div className="bloxx-viewport-toggle">
            {(Object.entries(VIEWPORT_CONFIG) as [ViewportDevice, typeof VIEWPORT_CONFIG.desktop][]).map(
              ([key, config]) => (
                <button
                  key={key}
                  className={viewport === key ? 'active' : ''}
                  onClick={() => setViewport(key)}
                  title={config.label}
                >
                  {config.icon} {config.label}
                </button>
              ),
            )}
          </div>

          <div className="bloxx-toolbar__separator" />

          <button
            className={`bloxx-toolbar__btn ${canvasMode === 'freeform' ? 'bloxx-toolbar__btn--active' : ''}`}
            onClick={() => setCanvasMode(canvasMode === 'stack' ? 'freeform' : 'stack')}
            title={canvasMode === 'freeform' ? 'Switch to Stack mode' : 'Switch to Free-Form mode'}
          >
            {canvasMode === 'freeform' ? '📐 Stack' : '✂️ Free-Form'}
          </button>

          <div className="bloxx-toolbar__separator" />

          <button
            className="bloxx-toolbar__btn"
            onClick={() => undoRedo.undo()}
            disabled={!undoRedo.canUndo}
            title="Undo (Ctrl+Z)"
          >
            ↩ Undo
          </button>
          <button
            className="bloxx-toolbar__btn"
            onClick={() => undoRedo.redo()}
            disabled={!undoRedo.canRedo}
            title="Redo (Ctrl+Shift+Z)"
          >
            ↪ Redo
          </button>

          <div style={{ flex: 1 }} />

          <button className="bloxx-toolbar__btn" onClick={handlePreview}>👁 Preview</button>
          <button className="bloxx-toolbar__btn" onClick={handlePreviewTab}>↗ New Tab</button>
          <button className="bloxx-toolbar__btn" onClick={() => setShowExport(true)}>📦 Export</button>
        </>
      ) : (
        <>
          <span style={{ color: '#555', fontSize: '0.875rem' }}>🔍 Preview Mode</span>
          <div className="bloxx-toolbar__separator" />
          <div className="bloxx-viewport-toggle">
            {(Object.entries(VIEWPORT_CONFIG) as [ViewportDevice, typeof VIEWPORT_CONFIG.desktop][]).map(
              ([key, config]) => (
                <button
                  key={key}
                  className={viewport === key ? 'active' : ''}
                  onClick={() => setViewport(key)}
                >
                  {config.icon}
                </button>
              ),
            )}
          </div>
          <div style={{ flex: 1 }} />
          <button className="bloxx-toolbar__btn" onClick={handlePreview}>
            ✕ Exit Preview
          </button>
        </>
      )}

      {project && (
        <span style={{ fontSize: '0.8rem', color: '#888', marginLeft: 8 }}>
          {project.name}
        </span>
      )}

      {showExport && <ExportDialog onClose={() => setShowExport(false)} />}
    </div>
  )
}
