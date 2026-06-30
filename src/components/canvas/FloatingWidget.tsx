import React from 'react'
import { useCanvasStore } from '../../store/canvasStore'
import { useProjectStore } from '../../store/projectStore'

export const FloatingWidget: React.FC = () => {
  const { selectedBlockIndex, selectedElementRole, editorMode, clearSelection } = useCanvasStore()
  const { project, removeBlock } = useProjectStore()

  if (editorMode !== 'edit' || selectedBlockIndex === null) return null

  const handleRemove = () => {
    if (!project) return
    const page = project.pages[0]
    const block = page?.blocks[selectedBlockIndex]
    if (page && block) {
      removeBlock(page.id, block.id)
      clearSelection()
    }
  }

  if (editorMode !== 'edit' || selectedBlockIndex === null) return null

  const roleLabel = selectedElementRole ?? 'element'
  const title = selectedElementRole
    ? `Selected: Block #${selectedBlockIndex + 1} [${roleLabel}]`
    : `Selected: Block #${selectedBlockIndex + 1}`

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 24,
        right: 24,
        width: 280,
        background: '#fff',
        border: '1px solid #e0e0e0',
        borderRadius: 12,
        boxShadow: '0 4px 24px rgba(0,0,0,0.15)',
        zIndex: 1000,
        overflow: 'hidden',
      }}
    >
      <div style={{
        padding: '10px 14px',
        background: '#f8fafc',
        borderBottom: '1px solid #e0e0e0',
        fontSize: '0.8rem',
        fontWeight: 600,
        color: '#333',
      }}>
        {title}
      </div>

      <div style={{ padding: 14, fontSize: '0.85rem', color: '#666' }}>
        {selectedElementRole === 'button' && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Variant</label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}>
                <option>Solid</option>
                <option>Outline</option>
                <option>Ghost</option>
                <option>Dull</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Size</label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}>
                <option>Small</option>
                <option>Medium</option>
                <option>Large</option>
              </select>
            </div>
          </div>
        )}

        {selectedElementRole === 'heading' && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Font Size</label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}>
                <option>H1 (48px)</option>
                <option>H2 (36px)</option>
                <option>H3 (24px)</option>
                <option>H4 (20px)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>Alignment</label>
              <div style={{ display: 'flex', gap: 4 }}>
                {['Left', 'Center', 'Right'].map((align) => (
                  <button key={align} style={{ flex: 1, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}>{align}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {(['section', 'text', 'image', 'input', '']).includes(selectedElementRole ?? '') && (
          <div style={{ color: '#999', fontStyle: 'italic', fontSize: '0.8rem' }}>
            Properties for {selectedElementRole || 'this element'} coming soon
          </div>
        )}
      </div>

      <div style={{ padding: '8px 14px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8 }}>
        <div style={{ flex: 1, fontSize: '0.75rem', color: '#999' }}>
          Edit with AI Chat ↓
        </div>
        <button
          onClick={handleRemove}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444', fontSize: '0.75rem', fontWeight: 600 }}
        >
          🗑 Remove
        </button>
      </div>
    </div>
  )
}