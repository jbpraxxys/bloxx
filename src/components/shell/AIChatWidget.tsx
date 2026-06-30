import React, { useState, useRef, useEffect } from 'react'
import { useAIStore } from '../../store/aiStore'
import { useCanvasStore } from '../../store/canvasStore'
import { useProjectStore } from '../../store/projectStore'
import { buildContext } from '../../lib/context-builder'
import { executeActions } from '../../lib/response-parser'

export const AIChatWidget: React.FC = () => {
  const {
    messages, isProcessing, promptMode, isConfigured, apiKey,
    providerType, providerModel, setProvider, clearApiKey,
    setPromptMode, sendPrompt, clearMessages, addMessage,
  } = useAIStore()
  const { selectedBlockIndex, selectedElementRole, editorMode } = useCanvasStore()
  const { project } = useProjectStore()
  const [prompt, setPrompt] = useState('')
  const [showConfig, setShowConfig] = useState(!isConfigured)
  const [configKey, setConfigKey] = useState(apiKey)
  const [configModel, setConfigModel] = useState(providerModel)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  if (editorMode !== 'edit') return null

  const handleSendPrompt = async () => {
    if (!prompt.trim() || !project) return
    const page = project.pages[0]
    if (!page) return

    const selectedInfo = selectedBlockIndex !== null
      ? {
          blockIndex: selectedBlockIndex,
          blockId: page.blocks[selectedBlockIndex]?.blockId ?? '',
          variantId: page.blocks[selectedBlockIndex]?.variantId ?? '',
          elementRole: selectedElementRole ?? 'section',
          currentStyles: {},
        }
      : null

    const context = buildContext({
      selectedElement: selectedInfo,
      designTokens: project.designTokens,
      page,
      userPrompt: prompt.trim(),
    })

    setPrompt('')
    const actions = await sendPrompt(context)
    if (actions.length > 0) {
      executeActions(actions)
    }
  }

  return (
    <div style={{
      width: 320,
      background: '#fff',
      borderLeft: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '10px 14px', borderBottom: '1px solid #e0e0e0',
        fontWeight: 600, fontSize: '0.85rem',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <span>🤖 AI Chat</span>
        <button onClick={() => setShowConfig(!showConfig)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
        >{showConfig ? '✕' : '⚙️'}</button>
      </div>

      {/* Provider Config */}
      {showConfig && (
        <div style={{ padding: 12, borderBottom: '1px solid #e0e0e0', fontSize: '0.8rem' }}>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#555', marginBottom: 4, fontSize: '0.75rem' }}>Provider</label>
            <select value={providerType}
              onChange={(e) => setProvider(e.target.value as any, configKey, configModel)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
            </select>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#555', marginBottom: 4, fontSize: '0.75rem' }}>API Key</label>
            <input type="password" value={configKey}
              onChange={(e) => setConfigKey(e.target.value)} placeholder="sk-..."
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#555', marginBottom: 4, fontSize: '0.75rem' }}>Model</label>
            <input type="text" value={configModel}
              onChange={(e) => setConfigModel(e.target.value)} placeholder="gpt-4o"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button onClick={() => setProvider(providerType, configKey, configModel)}
              style={{ flex: 1, padding: '6px 12px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}>Save</button>
            {isConfigured && (
              <button onClick={clearApiKey}
                style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}>Clear</button>
            )}
          </div>
        </div>
      )}

      {/* Mode Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
        <button onClick={() => setPromptMode('properties')}
          style={{
            flex: 1, padding: '8px', border: 'none',
            background: promptMode === 'properties' ? '#e8f0fe' : 'transparent',
            color: promptMode === 'properties' ? '#2563EB' : '#555',
            fontWeight: promptMode === 'properties' ? 600 : 400,
            cursor: 'pointer', fontSize: '0.8rem',
            borderBottom: promptMode === 'properties' ? '2px solid #2563EB' : '2px solid transparent',
          }}
        >🎨 Properties</button>
        <button onClick={() => setPromptMode('prompt')}
          style={{
            flex: 1, padding: '8px', border: 'none',
            background: promptMode === 'prompt' ? '#e8f0fe' : 'transparent',
            color: promptMode === 'prompt' ? '#2563EB' : '#555',
            fontWeight: promptMode === 'prompt' ? 600 : 400,
            cursor: 'pointer', fontSize: '0.8rem',
            borderBottom: promptMode === 'prompt' ? '2px solid #2563EB' : '2px solid transparent',
          }}
        >🤖 Prompt</button>
      </div>

      {/* Properties Mode */}
      {promptMode === 'properties' && (
        <div style={{ flex: 1, padding: 12, overflow: 'auto', fontSize: '0.85rem', color: '#666' }}>
          {selectedBlockIndex !== null ? (
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, color: '#333' }}>
                Block #{selectedBlockIndex + 1}{selectedElementRole && <span style={{ color: '#888', fontWeight: 400 }}> [{selectedElementRole}]</span>}
              </div>
              <p style={{ fontSize: '0.8rem' }}>Click on the canvas to select an element, or use the 🎯 button below.</p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.8rem' }}>Select an element on the canvas to see its properties here.</p>
              <button onClick={() => addMessage('system', 'Click on an element in the canvas to select it')}
                style={{ marginTop: 12, padding: '8px 16px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
              >🎯 Select Element</button>
            </div>
          )}
        </div>
      )}

      {/* Prompt Mode */}
      {promptMode === 'prompt' && (
        <>
          <div style={{ flex: 1, padding: 12, overflow: 'auto', fontSize: '0.85rem' }}>
            {messages.length === 0 ? (
              <div style={{ color: '#999', fontStyle: 'italic', fontSize: '0.8rem' }}>
                {selectedBlockIndex !== null
                  ? `Selected: Block #${selectedBlockIndex + 1}${selectedElementRole ? ` [${selectedElementRole}]` : ''}. Ask AI to modify it.`
                  : 'Select an element on the canvas, then ask AI to modify it.'}
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} style={{
                  marginBottom: 8, padding: '8px 10px', borderRadius: 8,
                  background: msg.role === 'user' ? '#e8f0fe' : msg.role === 'system' ? '#fff3cd' : '#f0fdf4',
                  fontSize: '0.8rem', lineHeight: 1.4,
                }}>
                  <div style={{ fontWeight: 600, fontSize: '0.7rem', color: '#888', marginBottom: 4, textTransform: 'uppercase' }}>{msg.role}</div>
                  {msg.content}
                </div>
              ))
            )}
            {isProcessing && <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.8rem' }}>Thinking...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '8px 12px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8 }}>
            <input value={prompt} onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendPrompt()}
              placeholder={selectedBlockIndex !== null ? 'Change this button to blue...' : 'Select an element first...'}
              disabled={isProcessing || !isConfigured || selectedBlockIndex === null}
              style={{ flex: 1, padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.8rem', outline: 'none' }}
            />
            <button onClick={handleSendPrompt}
              disabled={isProcessing || !prompt.trim() || !isConfigured || selectedBlockIndex === null}
              style={{
                padding: '8px 16px',
                background: isConfigured && prompt.trim() ? '#2563EB' : '#ccc',
                color: '#fff', border: 'none', borderRadius: 8,
                cursor: isConfigured && prompt.trim() ? 'pointer' : 'default',
                fontWeight: 600, fontSize: '0.8rem',
              }}
            >Send</button>
          </div>

          {!isConfigured && (
            <div style={{ padding: '8px 12px', background: '#fff3cd', fontSize: '0.75rem', color: '#856404' }}>
              ⚙️ Configure your API key in the settings (⚙️) above
            </div>
          )}
        </>
      )}

      {messages.length > 0 && (
        <button onClick={clearMessages}
          style={{ padding: '6px', border: 'none', borderTop: '1px solid #e0e0e0', background: '#fafafa', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
        >Clear conversation</button>
      )}
    </div>
  )
}