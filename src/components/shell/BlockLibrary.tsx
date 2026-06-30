import React, { useMemo, memo, useState } from 'react'
import { curatedBlocks } from '../../blocks'
import type { BlockDefinition } from '../../types'
import { useCanvasStore } from '../../store/canvasStore'
import { useProjectStore } from '../../store/projectStore'
import { BlockEditor } from './BlockEditor'

const CATEGORY_ORDER = ['navigation', 'sections', 'features', 'pricing', 'cta', 'content', 'footer'] as const

const CATEGORY_LABELS: Record<string, string> = {
  navigation: 'Navigation',
  sections: 'Hero & Sections',
  features: 'Features',
  pricing: 'Pricing',
  cta: 'Call to Action',
  content: 'Content',
  footer: 'Footer',
}

const _BlockLibrary: React.FC = () => {
  const { editorMode, selectedBlockIndex, currentPageId, clearSelection } = useCanvasStore()

  const grouped = useMemo(() => {
    const map: Record<string, BlockDefinition[]> = {}
    for (const cat of CATEGORY_ORDER) {
      map[cat] = curatedBlocks.filter((b) => b.category === cat)
    }
    return map
  }, [])

  const [showEditor, setShowEditor] = useState(false)
  const { project, addBlock, removeBlock, deleteCustomBlock } = useProjectStore()

  const selectedBlock = project && currentPageId && selectedBlockIndex !== null
    ? project.pages.find((p) => p.id === currentPageId)?.blocks[selectedBlockIndex]
    : null

  const handleRemoveSelected = () => {
    if (selectedBlock && currentPageId) {
      removeBlock(currentPageId, selectedBlock.id)
      clearSelection()
    }
  }

  const handleDragStart = (e: React.DragEvent, block: BlockDefinition) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ blockId: block.id, variantId: block.defaultVariant }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  const handleClickBlock = (block: BlockDefinition) => {
    if (!project) return
    const pageId = project.pages[0]?.id
    if (pageId) {
      addBlock(pageId, block.id, block.defaultVariant)
    }
  }

  if (editorMode !== 'edit') return null

  return (
    <div className="bloxx-library">
      <div className="bloxx-library__header">🧱 Block Library</div>

      {selectedBlock && (
        <div style={{
          margin: '8px', padding: '8px 10px',
          background: '#FEF2F2', border: '1px solid #FECACA',
          borderRadius: 6, fontSize: '0.8rem',
        }}>
          <div style={{ fontWeight: 600, marginBottom: 4, color: '#991B1B' }}>
            Selected on canvas
          </div>
          <div style={{ color: '#7F1D1D', marginBottom: 6, fontSize: '0.75rem' }}>
            Block #{selectedBlockIndex! + 1}
          </div>
          <button
            onClick={handleRemoveSelected}
            style={{
              width: '100%', padding: '6px 0',
              background: '#EF4444', color: '#fff',
              border: 'none', borderRadius: 4,
              cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem',
            }}
          >
            🗑 Remove from canvas
          </button>
        </div>
      )}

      <button
            onClick={() => setShowEditor(true)}
            style={{
              margin: '8px', padding: '6px 12px', border: '1px dashed #2563EB',
              borderRadius: 6, background: 'transparent', color: '#2563EB',
              cursor: 'pointer', fontSize: '0.8rem', width: 'calc(100% - 16px)',
            }}
          >
            + Create Custom Block
          </button>
      <div className="bloxx-library__list">
        {CATEGORY_ORDER.map((cat) => {
          const blocks = grouped[cat]
          if (!blocks?.length) return null
          return (
            <div key={cat} className="bloxx-library__category">
              <div className="bloxx-library__category-title">{CATEGORY_LABELS[cat] ?? cat}</div>
              {blocks.map((block) => (
                <div
                  key={block.id}
                  className="bloxx-library__block"
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                  onClick={() => handleClickBlock(block)}
                >
                  <div className="bloxx-library__block-name">{block.name}</div>
                  <div className="bloxx-library__block-desc">{block.description}</div>
                </div>
              ))}
            </div>
          )
        })}
          {project && project.customBlocks && project.customBlocks.length > 0 && (
            <div className="bloxx-library__category">
              <div className="bloxx-library__category-title">Custom</div>
              {[...project.customBlocks].reverse().map((block) => (
                <div
                  key={block.id}
                  className="bloxx-library__block"
                  draggable
                  onDragStart={(e) => handleDragStart(e, block)}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
                >
                  <div style={{ flex: 1 }}>
                    <div className="bloxx-library__block-name">{block.name}</div>
                    <div className="bloxx-library__block-desc">{block.description || 'Custom block'}</div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteCustomBlock(block.id)
                    }}
                    style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444', fontSize: '0.8rem', padding: '2px 6px' }}
                    title="Delete custom block"
                  >✕</button>
                </div>
              ))}
            </div>
          )}
      </div>
      {showEditor && <BlockEditor onClose={() => setShowEditor(false)} />}
    </div>
  )
}

export const BlockLibrary = memo(_BlockLibrary)
