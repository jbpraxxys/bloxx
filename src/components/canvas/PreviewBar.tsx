import React from 'react'
import { useCanvasStore } from '../../store/canvasStore'
import { VIEWPORT_CONFIG, type ViewportDevice } from '../../types'

export const PreviewBar: React.FC = () => {
  const { viewport, setViewport, setEditorMode } = useCanvasStore()

  return (
    <div className="bloxx-preview-bar">
      {(Object.entries(VIEWPORT_CONFIG) as [ViewportDevice, typeof VIEWPORT_CONFIG.desktop][]).map(
        ([key, config]) => (
          <button
            key={key}
            onClick={() => setViewport(key)}
            style={viewport === key ? { background: 'rgba(255,255,255,0.2)', fontWeight: 600 } : {}}
          >
            {config.icon}
          </button>
        ),
      )}

      <div style={{ width: 1, height: 20, background: 'rgba(255,255,255,0.3)' }} />

      <button onClick={() => setEditorMode('edit')}>
        ✕ Exit Preview
      </button>
    </div>
  )
}
