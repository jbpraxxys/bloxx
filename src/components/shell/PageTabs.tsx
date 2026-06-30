import React from 'react'
import { useProjectStore } from '../../store/projectStore'
import { useCanvasStore } from '../../store/canvasStore'

export const PageTabs: React.FC = () => {
  const { project, addPage, removePage } = useProjectStore()
  const { currentPageId, setCurrentPage, editorMode } = useCanvasStore()

  if (editorMode !== 'edit' || !project) return null

  const activeId = currentPageId ?? project.pages[0]?.id

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '4px 12px', background: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0', overflow: 'auto',
    }}>
      {project.pages.map((page) => (
        <div key={page.id} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: '6px 6px 0 0',
          background: activeId === page.id ? '#fff' : 'transparent',
          border: '1px solid',
          borderColor: activeId === page.id ? '#e0e0e0' : 'transparent',
          borderBottom: activeId === page.id ? '1px solid #fff' : 'transparent',
          cursor: 'pointer', fontSize: '0.8rem', marginBottom: -1,
          userSelect: 'none',
        }}
          onClick={() => setCurrentPage(page.id)}
        >
          <span>{page.name}</span>
          {project.pages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); removePage(page.id) }}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#999', padding: 0, fontSize: '0.8rem', lineHeight: 1 }}
            >✕</button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          const name = `Page ${project.pages.length + 1}`
          addPage(name)
          const pages = useProjectStore.getState().project?.pages
          const newPage = pages?.[pages.length - 1]
          if (newPage) setCurrentPage(newPage.id)
        }}
        style={{ padding: '4px 10px', border: '1px dashed #ccc', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
      >+ Add Page</button>
    </div>
  )
}