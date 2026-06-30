import React, { useMemo, useState } from 'react'
import { curatedBlocks } from '../../blocks/curated'
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

export const BlockLibrary: React.FC = () => {
  const { editorMode } = useCanvasStore()

  const grouped = useMemo(() => {
    const map: Record<string, BlockDefinition[]> = {}
    for (const cat of CATEGORY_ORDER) {
      map[cat] = curatedBlocks.filter((b) => b.category === cat)
    }
    return map
  }, [])

  const [showEditor, setShowEditor] = useState(false)
  const { project } = useProjectStore()

  const handleDragStart = (e: React.DragEvent, block: BlockDefinition) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({ blockId: block.id, variantId: block.defaultVariant }))
    e.dataTransfer.effectAllowed = 'copy'
  }

  if (editorMode !== 'edit') return null

  return (
    <div className="bloxx-library">
      <div className="bloxx-library__header">🧱 Block Library</div>
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
                >
                  <div className="bloxx-library__block-name">{block.name}</div>
                  <div className="bloxx-library__block-desc">{block.description || 'Custom block'}</div>
                </div>
              ))}
            </div>
          )}
      </div>
      {showEditor && <BlockEditor onClose={() => setShowEditor(false)} />}
    </div>
  )
}
