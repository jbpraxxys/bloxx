import React, { useEffect, useState, memo } from 'react'
import { useDesignTokensStore } from '../../store/designTokensStore'
import { useCanvasStore } from '../../store/canvasStore'

type TokenCategory = 'colors' | 'typography' | 'spacing' | 'borders' | 'shadows'

const CATEGORY_LABELS: Record<TokenCategory, string> = {
  colors: 'Colors',
  typography: 'Typography',
  spacing: 'Spacing',
  borders: 'Borders & Radius',
  shadows: 'Shadows',
}

const CATEGORY_ICONS: Record<TokenCategory, string> = {
  colors: '🎨',
  typography: '🔤',
  spacing: '↔️',
  borders: '⬜',
  shadows: '🌓',
}

const _DesignSystemPanel: React.FC = () => {
  const { tokens, isDirty, loadTokens, updateToken, applyTokens, resetTokens } = useDesignTokensStore()
  const { editorMode } = useCanvasStore()
  const [activeCategory, setActiveCategory] = useState<TokenCategory>('colors')

  useEffect(() => {
    loadTokens()
  }, [loadTokens])

  if (editorMode !== 'edit') return null

  const tokenEntries = tokens[activeCategory]
  if (!tokenEntries) return null

  const entries = Object.entries(tokenEntries).filter(
    ([, val]) => val && typeof val === 'object' && 'value' in val,
  )

  return (
    <div className="bloxx-library" style={{ width: 300 }}>
      <div className="bloxx-library__header">🎨 Design System</div>

      {/* Category tabs */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, padding: '8px', borderBottom: '1px solid #e0e0e0' }}>
        {(Object.keys(CATEGORY_LABELS) as TokenCategory[]).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: '4px 10px',
              border: '1px solid',
              borderColor: activeCategory === cat ? '#2563EB' : '#e0e0e0',
              borderRadius: 6,
              background: activeCategory === cat ? '#e8f0fe' : 'transparent',
              cursor: 'pointer',
              fontSize: '0.75rem',
              fontWeight: activeCategory === cat ? 600 : 400,
              color: activeCategory === cat ? '#2563EB' : '#555',
            }}
          >
            {CATEGORY_ICONS[cat]} {CATEGORY_LABELS[cat]}
          </button>
        ))}
      </div>

      {/* Token fields */}
      <div className="bloxx-library__list">
        <div style={{ marginBottom: 12, fontSize: '0.8rem', color: '#888' }}>
          {CATEGORY_ICONS[activeCategory]} {CATEGORY_LABELS[activeCategory]}
        </div>

        {entries.map(([key, entry]) => (
          <div key={key} style={{ marginBottom: 12 }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#555', marginBottom: 4, textTransform: 'capitalize' }}>
              {key.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
            </label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              {activeCategory === 'colors' && (
                <input
                  type="color"
                  value={entry.value}
                  onChange={(e) => updateToken(activeCategory, key, e.target.value)}
                  style={{ width: 32, height: 32, border: '1px solid #ddd', borderRadius: 6, padding: 0, cursor: 'pointer' }}
                />
              )}
              <input
                type="text"
                value={entry.value}
                onChange={(e) => updateToken(activeCategory, key, e.target.value)}
                style={{
                  flex: 1,
                  padding: '6px 10px',
                  border: '1px solid #ddd',
                  borderRadius: 6,
                  fontSize: '0.8rem',
                  fontFamily: 'monospace',
                }}
              />
            </div>
            {entry.description && (
              <div style={{ fontSize: '0.7rem', color: '#999', marginTop: 2 }}>{entry.description}</div>
            )}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div style={{ padding: '12px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8 }}>
        <button
          onClick={applyTokens}
          disabled={!isDirty}
          style={{
            flex: 1,
            padding: '8px 16px',
            background: isDirty ? '#2563EB' : '#ccc',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
            cursor: isDirty ? 'pointer' : 'default',
            fontWeight: 600,
            fontSize: '0.8rem',
          }}
        >
          {isDirty ? 'Apply Changes' : 'Applied'}
        </button>
        <button
          onClick={() => {
            resetTokens()
            applyTokens()
          }}
          style={{
            padding: '8px 12px',
            border: '1px solid #ddd',
            borderRadius: 6,
            background: '#fff',
            cursor: 'pointer',
            fontSize: '0.8rem',
            color: '#888',
          }}
          title="Reset to defaults"
        >
          ↺ Reset
        </button>
      </div>
    </div>
  )
}

export const DesignSystemPanel = memo(_DesignSystemPanel)