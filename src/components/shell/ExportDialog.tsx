import React, { useState } from 'react'
import { useProjectStore } from '../../store/projectStore'
import { curatedBlocks } from '../../blocks/curated'
import { buildExport } from '../../lib/export-service'

interface ExportDialogProps {
  onClose: () => void
}

export const ExportDialog: React.FC<ExportDialogProps> = ({ onClose }) => {
  const { project } = useProjectStore()
  const [includeMetadata, setIncludeMetadata] = useState(true)
  const [isExporting, setIsExporting] = useState(false)

  const handleExport = async () => {
    if (!project) return
    setIsExporting(true)

    try {
      const allBlocks = [...curatedBlocks, ...(project.customBlocks ?? [])]
      const blob = await buildExport(project, allBlocks, { includeMetadata, inlineAssets: true })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `${project.name.toLowerCase().replace(/\s+/g, '-')}-export.zip`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      onClose()
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  if (!project) return null

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000,
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 460,
        boxShadow: '0 8px 40px rgba(0,0,0,0.2)', overflow: 'hidden',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>📦 Export Project</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: '#888' }}>✕</button>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: 4 }}>Project</div>
            <div style={{ fontSize: '0.9rem' }}>{project.name}</div>
            <div style={{ fontSize: '0.8rem', color: '#888' }}>{project.pages.length} page(s), {project.pages.reduce((s, p) => s + p.blocks.length, 0)} block(s)</div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#333', marginBottom: 8 }}>Options</div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8, cursor: 'pointer' }}>
              <input type="checkbox" checked={includeMetadata} onChange={(e) => setIncludeMetadata(e.target.checked)} />
              <span style={{ fontSize: '0.85rem' }}>
                Include Bloxx metadata <span style={{ color: '#888' }}>(for re-import)</span>
              </span>
            </label>
          </div>

          <div style={{ background: '#f8fafc', borderRadius: 8, padding: 12, marginBottom: 16, fontSize: '0.8rem', color: '#666', lineHeight: 1.5 }}>
            <strong>Export structure:</strong><br/>
            <code style={{ color: '#333' }}>
              {project.name}/<br/>
              ├── index.html (or page name)<br/>
              ├── css/design-system.css<br/>
              ├── css/components.css<br/>
              └── assets/
            </code>
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 20px', border: '1px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>Cancel</button>
          <button
            onClick={handleExport}
            disabled={isExporting}
            style={{
              padding: '8px 24px', border: 'none', borderRadius: 8,
              background: isExporting ? '#ccc' : '#2563EB',
              color: '#fff', cursor: isExporting ? 'default' : 'pointer',
              fontWeight: 600, fontSize: '0.85rem',
            }}
          >
            {isExporting ? 'Exporting...' : '📦 Export ZIP'}
          </button>
        </div>
      </div>
    </div>
  )
}