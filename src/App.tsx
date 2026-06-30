import React, { useEffect, useState } from 'react'
import { Toolbar } from './components/shell/Toolbar'
import { CanvasContainer } from './components/canvas/CanvasContainer'
import { BlockLibrary } from './components/shell/BlockLibrary'
import { useProjectStore } from './store/projectStore'

const App: React.FC = () => {
  const { projects, loadProjects, createProject, project, loadProject } = useProjectStore()
  const [showProjectDialog, setShowProjectDialog] = useState(false)
  const [projectName, setProjectName] = useState('')

  useEffect(() => {
    loadProjects()
  }, [loadProjects])

  const handleCreateProject = async () => {
    if (!projectName.trim()) return
    await createProject(projectName.trim())
    setProjectName('')
    setShowProjectDialog(false)
  }

  const handleSelectProject = (id: string) => {
    loadProject(id)
  }

  // Show project selector if no project is loaded
  if (!project) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', background: '#f5f5f5' }}>
        <div style={{ textAlign: 'center', maxWidth: 400 }}>
          <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: 8 }}>🧱 Bloxx</h1>
          <p style={{ color: '#666', marginBottom: 32 }}>Wireframe → Design System → AI Polish → HTML Export</p>

          <div style={{ marginBottom: 24 }}>
            <button
              onClick={() => setShowProjectDialog(true)}
              style={{ padding: '12px 32px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 8, fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
            >
              + New Project
            </button>
          </div>

          {showProjectDialog && (
            <div style={{ marginBottom: 24, display: 'flex', gap: 8, justifyContent: 'center' }}>
              <input
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                placeholder="Project name"
                onKeyDown={(e) => e.key === 'Enter' && handleCreateProject()}
                style={{ padding: '10px 16px', border: '1px solid #ddd', borderRadius: 8, fontSize: '1rem', flex: 1 }}
                autoFocus
              />
              <button
                onClick={handleCreateProject}
                style={{ padding: '10px 20px', background: '#1a73e8', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
              >
                Create
              </button>
            </div>
          )}

          {projects.length > 0 && (
            <div>
              <p style={{ fontWeight: 600, marginBottom: 12, color: '#555' }}>Recent projects</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {projects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelectProject(p.id)}
                    style={{ padding: '12px 16px', background: '#fff', border: '1px solid #e0e0e0', borderRadius: 8, cursor: 'pointer', textAlign: 'left' }}
                  >
                    <div style={{ fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#888' }}>
                      {new Date(p.updatedAt).toLocaleDateString()} · {p.pages.length} page{p.pages.length !== 1 ? 's' : ''}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="bloxx-app">
      <Toolbar />
      <div className="bloxx-main">
        <BlockLibrary />
        <CanvasContainer />
      </div>
    </div>
  )
}

export default App
