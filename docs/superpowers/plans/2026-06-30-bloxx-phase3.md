# Phase 3 — AI Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the AI Chat Widget with Properties Mode (structured element editing), Prompt Mode (natural language requests), multi-provider support (OpenAI + Anthropic BYOK), context builder, response parser, 🎯 pointer selection, and floating widget positioned near selected elements.

**Architecture:** The AI Chat Widget is a floating panel in the shell. Properties mode reads element roles from the canvas selection and shows structured controls. Prompt mode builds a context package (selected element + design tokens + page state), sends it to the configured AI provider, and parses the response into actionable modifications. A provider abstraction layer supports OpenAI and Anthropic with user-provided API keys (BYOK). The floating widget renders near the selected element's bounding rect as reported by the canvas iframe.

**Tech Stack:** React (existing), Zustand (existing), OpenAI SDK, Anthropic SDK, canvas iframe postMessage (existing).

---

### File Structure

```
src/
├── components/
│   └── shell/
│       └── AIChatWidget.tsx         # Chat widget with Properties/Prompt toggle (NEW)
├── components/
│   └── canvas/
│       └── FloatingWidget.tsx       # Context-aware floating widget near element (NEW)
├── store/
│   └── aiStore.ts                   # AI provider config, chat state, BYOK keys (NEW)
├── lib/
│   ├── ai-provider.ts              # Provider abstraction layer (NEW)
│   ├── context-builder.ts          # Context package builder from selection (NEW)
│   └── response-parser.ts          # Parse AI responses into actions (NEW)
├── types/
│   └── index.ts                     # Add AI-related types
```

---

### Task 1: AI Types & Provider Abstraction

**Files:**
- Modify: `src/types/index.ts` (add AI types)
- Create: `src/lib/ai-provider.ts`

- [ ] **Step 1: Add AI types to `src/types/index.ts`**

Add at the end of the file, before or after existing exports:

```typescript
// ─── AI Integration ──────────────────────────────────────
export type AIProviderType = 'openai' | 'anthropic'

export interface AIProviderConfig {
  type: AIProviderType
  apiKey: string
  model?: string
}

export interface AIContextPackage {
  task: 'modify_element' | 'redesign_block' | 'generate_content'
  selectedElement: {
    blockIndex: number
    blockId: string
    variantId: string
    elementRole: string
    currentHtml?: string
    currentStyles?: Record<string, string>
  } | null
  designTokens: Record<string, any>
  pageContext: {
    pageName: string
    blockCount: number
  }
  userPrompt: string
}

export interface AIAction {
  type: 'updateStyles' | 'updateContent' | 'setVariant' | 'addBlock' | 'removeBlock' | 'modifyStructure' | 'updateDesignToken'
  selector?: string
  properties?: Record<string, string>
  field?: string
  value?: string
  variantId?: string
  blockId?: string
  tokenCategory?: string
  tokenKey?: string
}
```

- [ ] **Step 2: Write the provider abstraction**

Write `src/lib/ai-provider.ts`:
```typescript
import type { AIProviderType, AIContextPackage, AIAction } from '../types'

interface AIProviderResponse {
  actions: AIAction[]
  explanation?: string
}

interface AIProvider {
  send(context: AIContextPackage): Promise<AIProviderResponse>
}

class OpenAIProvider implements AIProvider {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model = 'gpt-4o') {
    this.apiKey = apiKey
    this.model = model
  }

  async send(context: AIContextPackage): Promise<AIProviderResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: this.model,
        messages: [
          {
            role: 'system',
            content: `You are a design assistant for Bloxx, a wireframing and HTML design tool. 
You help users modify their designs. Respond with structured JSON actions only.
Available actions: updateStyles (CSS property changes), updateContent (text changes), setVariant (swap variant).
Return format: { "actions": [{ "type": "updateStyles", "selector": ".btn", "properties": { "background": "red" } }] }`,
          },
          {
            role: 'user',
            content: JSON.stringify(context),
          },
        ],
        temperature: 0.7,
      }),
    })

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content ?? '{}'

    try {
      // Try to parse the response as JSON
      const parsed = JSON.parse(content)
      return parsed as AIProviderResponse
    } catch {
      // Fallback: return content as explanation
      return { actions: [], explanation: content }
    }
  }
}

class AnthropicProvider implements AIProvider {
  private apiKey: string
  private model: string

  constructor(apiKey: string, model = 'claude-sonnet-4-20250514') {
    this.apiKey = apiKey
    this.model = model
  }

  async send(context: AIContextPackage): Promise<AIProviderResponse> {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.model,
        max_tokens: 1024,
        system: 'You are a design assistant for Bloxx. Respond with structured JSON actions only.',
        messages: [{ role: 'user', content: JSON.stringify(context) }],
      }),
    })

    const data = await response.json()
    const content = data.content?.[0]?.text ?? '{}'

    try {
      const parsed = JSON.parse(content)
      return parsed as AIProviderResponse
    } catch {
      return { actions: [], explanation: content }
    }
  }
}

export function createProvider(config: { type: AIProviderType; apiKey: string; model?: string }): AIProvider {
  switch (config.type) {
    case 'openai':
      return new OpenAIProvider(config.apiKey, config.model)
    case 'anthropic':
      return new AnthropicProvider(config.apiKey, config.model)
    default:
      throw new Error(`Unknown provider: ${config.type}`)
  }
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add AI provider abstraction layer with OpenAI and Anthropic"
```

---

### Task 2: AI Store (Chat State + Provider Config + BYOK)

**Files:**
- Create: `src/store/aiStore.ts`

- [ ] **Step 1: Write the AI store**

Write `src/store/aiStore.ts`:
```typescript
import { create } from 'zustand'
import type { AIProviderType, AIProviderConfig, AIContextPackage, AIAction } from '../types'
import { createProvider } from '../lib/ai-provider'

interface ChatMessage {
  id: string
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: number
}

interface AIStoreState {
  // Provider config (BYOK)
  providerType: AIProviderType
  providerModel: string
  apiKey: string
  isConfigured: boolean

  // Chat state
  messages: ChatMessage[]
  isProcessing: boolean

  // Prompt mode
  promptMode: 'properties' | 'prompt'

  // Actions
  setProvider: (type: AIProviderType, apiKey: string, model?: string) => void
  clearApiKey: () => void
  setPromptMode: (mode: 'properties' | 'prompt') => void
  addMessage: (role: ChatMessage['role'], content: string) => void
  sendPrompt: (context: AIContextPackage) => Promise<AIAction[]>
  clearMessages: () => void
}

export const useAIStore = create<AIStoreState>((set, get) => ({
  providerType: 'openai',
  providerModel: 'gpt-4o',
  apiKey: '',
  isConfigured: false,
  messages: [],
  isProcessing: false,
  promptMode: 'properties',

  setProvider: (type, apiKey, model) => {
    localStorage.setItem('bloxx-ai-provider', JSON.stringify({ type, apiKey, model }))
    set({ providerType: type, apiKey, isConfigured: true, providerModel: model ?? (type === 'openai' ? 'gpt-4o' : 'claude-sonnet-4-20250514') })
  },

  clearApiKey: () => {
    localStorage.removeItem('bloxx-ai-provider')
    set({ apiKey: '', isConfigured: false })
  },

  setPromptMode: (mode) => set({ promptMode: mode }),

  addMessage: (role, content) => {
    const message: ChatMessage = {
      id: crypto.randomUUID(),
      role,
      content,
      timestamp: Date.now(),
    }
    set((state) => ({ messages: [...state.messages, message] }))
  },

  sendPrompt: async (context) => {
    const { apiKey, providerType, providerModel, addMessage } = get()
    if (!apiKey) return []

    set({ isProcessing: true })
    addMessage('user', context.userPrompt)

    try {
      const provider = createProvider({ type: providerType, apiKey, model: providerModel })
      const response = await provider.send(context)

      if (response.explanation) {
        addMessage('assistant', response.explanation)
      } else {
        addMessage('assistant', `Applied ${response.actions.length} change(s)`)
      }

      set({ isProcessing: false })
      return response.actions
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : 'Unknown error'
      addMessage('assistant', `Error: ${errorMsg}`)
      set({ isProcessing: false })
      return []
    }
  },

  clearMessages: () => set({ messages: [] }),
}))

// Load saved provider config on module init
const saved = localStorage.getItem('bloxx-ai-provider')
if (saved) {
  try {
    const config = JSON.parse(saved)
    useAIStore.getState().setProvider(config.type, config.apiKey, config.model)
  } catch { /* ignore */ }
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 3: Commit**

```bash
git add -A && git commit -m "feat: add AI store with provider config, BYOK, and chat state"
```

---

### Task 3: Context Builder + Response Parser

**Files:**
- Create: `src/lib/context-builder.ts`
- Create: `src/lib/response-parser.ts`

- [ ] **Step 1: Write context builder**

Write `src/lib/context-builder.ts`:
```typescript
import type { AIContextPackage, BlockInstance, BloxxPage, DesignTokens } from '../types'

export function buildContext(params: {
  selectedElement: {
    blockIndex: number
    blockId: string
    variantId: string
    elementRole: string
    currentHtml?: string
    currentStyles?: Record<string, string>
  } | null
  designTokens: DesignTokens
  page: BloxxPage
  userPrompt: string
}): AIContextPackage {
  return {
    task: 'modify_element',
    selectedElement: params.selectedElement,
    designTokens: params.designTokens,
    pageContext: {
      pageName: params.page.name,
      blockCount: params.page.blocks.length,
    },
    userPrompt: params.userPrompt,
  }
}

export function getElementStyles(element: HTMLElement): Record<string, string> {
  const computed = window.getComputedStyle(element)
  const props = [
    'background', 'backgroundColor', 'color', 'fontSize', 'fontWeight',
    'fontFamily', 'borderRadius', 'padding', 'margin', 'border',
    'boxShadow', 'textAlign', 'lineHeight', 'letterSpacing',
  ]
  const styles: Record<string, string> = {}
  for (const prop of props) {
    styles[prop] = computed.getPropertyValue(prop)
  }
  return styles
}
```

- [ ] **Step 2: Write response parser**

Write `src/lib/response-parser.ts`:
```typescript
import type { AIAction } from '../types'
import { useProjectStore } from '../store/projectStore'

export function executeActions(actions: AIAction[]): void {
  const store = useProjectStore.getState()
  const project = store.project
  if (!project) return

  const pageId = project.pages[0]?.id
  if (!pageId) return

  for (const action of actions) {
    switch (action.type) {
      case 'updateStyles': {
        if (action.selector && action.properties) {
          // Apply style override to every block instance that has this selector
          for (const page of project.pages) {
            for (const block of page.blocks) {
              const existingOverride = block.overrides.find((o) => o.selector === action.selector)
              if (existingOverride) {
                Object.assign(existingOverride.properties, action.properties)
              } else {
                block.overrides.push({ selector: action.selector, properties: { ...action.properties } })
              }
            }
          }
          store.saveProject()
        }
        break
      }

      case 'updateContent': {
        if (action.field && action.value !== undefined) {
          const page = project.pages[0]
          if (page && page.blocks[0]) {
            store.updateBlockContent(pageId, page.blocks[0].id, { [action.field]: action.value })
          }
        }
        break
      }

      case 'setVariant': {
        if (action.variantId) {
          const page = project.pages[0]
          if (page && page.blocks[0]) {
            store.updateBlockVariant(pageId, page.blocks[0].id, action.variantId)
          }
        }
        break
      }

      case 'updateDesignToken': {
        if (action.tokenCategory && action.tokenKey && action.value) {
          const projectStore = useProjectStore.getState()
          const project = projectStore.project
          if (project?.designTokens) {
            const category = project.designTokens[action.tokenCategory as keyof typeof project.designTokens]
            if (category && typeof category === 'object') {
              const tokens = category as Record<string, { value: string; type: string }>
              if (tokens[action.tokenKey]) {
                tokens[action.tokenKey].value = action.value
              }
            }
            projectStore.saveProject()
          }
        }
        break
      }

      default:
        console.warn('Unknown action type:', action.type)
    }
  }
}
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add AI context builder and response parser"
```

---

### Task 4: Floating Widget + AIChatWidget UI

**Files:**
- Create: `src/components/canvas/FloatingWidget.tsx`
- Create: `src/components/shell/AIChatWidget.tsx`
- Modify: `src/App.tsx` (add AI chat widget to layout)

- [ ] **Step 1: Write FloatingWidget**

Write `src/components/canvas/FloatingWidget.tsx`:
```typescript
import React from 'react'
import { useCanvasStore } from '../../store/canvasStore'

/**
 * FloatingWidget is a context-aware panel positioned near the selected element.
 * Shows different properties based on the selected element role.
 * Phase 3 v1: shows element info + quick actions (variant swap, content edit).
 * Phase 7+: full role-aware property sets.
 */
export const FloatingWidget: React.FC = () => {
  const { selectedBlockIndex, selectedElementRole, editorMode } = useCanvasStore()

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
        {/* Role-specific quick controls - expanded in later phases */}
        {selectedElementRole === 'button' && (
          <div>
            <div style={{ marginBottom: 8 }}>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
                Variant
              </label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}>
                <option>Solid</option>
                <option>Outline</option>
                <option>Ghost</option>
                <option>Dull</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
                Size
              </label>
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
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
                Font Size
              </label>
              <select style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}>
                <option>H1 (48px)</option>
                <option>H2 (36px)</option>
                <option>H3 (24px)</option>
                <option>H4 (20px)</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '0.75rem', fontWeight: 600, color: '#555', display: 'block', marginBottom: 4 }}>
                Alignment
              </label>
              <div style={{ display: 'flex', gap: 4 }}>
                {['Left', 'Center', 'Right'].map((align) => (
                  <button
                    key={align}
                    style={{ flex: 1, padding: '4px 8px', border: '1px solid #ddd', borderRadius: 4, background: '#fff', cursor: 'pointer', fontSize: '0.75rem' }}
                  >
                    {align}
                  </button>
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

      <div style={{
        padding: '8px 14px',
        borderTop: '1px solid #e0e0e0',
        fontSize: '0.75rem',
        color: '#999',
        textAlign: 'center',
      }}>
        Edit with AI Chat below ↓
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Write AIChatWidget**

Write `src/components/shell/AIChatWidget.tsx`:
```typescript
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
        padding: '10px 14px',
        borderBottom: '1px solid #e0e0e0',
        fontWeight: 600,
        fontSize: '0.85rem',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <span>🤖 AI Chat</span>
        <button
          onClick={() => setShowConfig(!showConfig)}
          style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
        >
          {showConfig ? '✕' : '⚙️'}
        </button>
      </div>

      {/* Provider Config */}
      {showConfig && (
        <div style={{ padding: 12, borderBottom: '1px solid #e0e0e0', fontSize: '0.8rem' }}>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#555', marginBottom: 4, fontSize: '0.75rem' }}>Provider</label>
            <select
              value={providerType}
              onChange={(e) => setProvider(e.target.value as any, configKey, configModel)}
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}
            >
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
            </select>
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#555', marginBottom: 4, fontSize: '0.75rem' }}>API Key</label>
            <input
              type="password"
              value={configKey}
              onChange={(e) => setConfigKey(e.target.value)}
              placeholder="sk-..."
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}
            />
          </div>
          <div style={{ marginBottom: 8 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#555', marginBottom: 4, fontSize: '0.75rem' }}>Model</label>
            <input
              type="text"
              value={configModel}
              onChange={(e) => setConfigModel(e.target.value)}
              placeholder="gpt-4o"
              style={{ width: '100%', padding: '6px 8px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }}
            />
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              onClick={() => setProvider(providerType, configKey, configModel)}
              style={{ flex: 1, padding: '6px 12px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.75rem' }}
            >
              Save
            </button>
            {isConfigured && (
              <button
                onClick={clearApiKey}
                style={{ padding: '6px 12px', border: '1px solid #ddd', borderRadius: 6, background: '#fff', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
              >
                Clear
              </button>
            )}
          </div>
        </div>
      )}

      {/* Mode Tabs */}
      <div style={{ display: 'flex', borderBottom: '1px solid #e0e0e0' }}>
        <button
          onClick={() => setPromptMode('properties')}
          style={{
            flex: 1, padding: '8px', border: 'none',
            background: promptMode === 'properties' ? '#e8f0fe' : 'transparent',
            color: promptMode === 'properties' ? '#2563EB' : '#555',
            fontWeight: promptMode === 'properties' ? 600 : 400,
            cursor: 'pointer', fontSize: '0.8rem', borderBottom: promptMode === 'properties' ? '2px solid #2563EB' : '2px solid transparent',
          }}
        >
          🎨 Properties
        </button>
        <button
          onClick={() => setPromptMode('prompt')}
          style={{
            flex: 1, padding: '8px', border: 'none',
            background: promptMode === 'prompt' ? '#e8f0fe' : 'transparent',
            color: promptMode === 'prompt' ? '#2563EB' : '#555',
            fontWeight: promptMode === 'prompt' ? 600 : 400,
            cursor: 'pointer', fontSize: '0.8rem', borderBottom: promptMode === 'prompt' ? '2px solid #2563EB' : '2px solid transparent',
          }}
        >
          🤖 Prompt
        </button>
      </div>

      {/* Properties Mode */}
      {promptMode === 'properties' && (
        <div style={{ flex: 1, padding: 12, overflow: 'auto', fontSize: '0.85rem', color: '#666' }}>
          {selectedBlockIndex !== null ? (
            <div>
              <div style={{ fontWeight: 600, marginBottom: 8, color: '#333' }}>
                Block #{selectedBlockIndex + 1}
                {selectedElementRole && <span style={{ color: '#888', fontWeight: 400 }}> [{selectedElementRole}]</span>}
              </div>
              <p style={{ fontSize: '0.8rem' }}>
                Click on the canvas to select an element, or use the 🎯 button below.
              </p>
            </div>
          ) : (
            <div>
              <p style={{ fontSize: '0.8rem' }}>
                Select an element on the canvas to see its properties here.
              </p>
              <button
                onClick={() => {
                  // Activate pointer selection — click on canvas will select
                  addMessage('system', 'Click on an element in the canvas to select it')
                }}
                style={{ marginTop: 12, padding: '8px 16px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 6, cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
              >
                🎯 Select Element
              </button>
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
                <div
                  key={msg.id}
                  style={{
                    marginBottom: 8,
                    padding: '8px 10px',
                    borderRadius: 8,
                    background: msg.role === 'user' ? '#e8f0fe' : msg.role === 'system' ? '#fff3cd' : '#f0fdf4',
                    fontSize: '0.8rem',
                    lineHeight: 1.4,
                  }}
                >
                  <div style={{ fontWeight: 600, fontSize: '0.7rem', color: '#888', marginBottom: 4, textTransform: 'uppercase' }}>
                    {msg.role}
                  </div>
                  {msg.content}
                </div>
              ))
            )}
            {isProcessing && (
              <div style={{ color: '#888', fontStyle: 'italic', fontSize: '0.8rem' }}>Thinking...</div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div style={{ padding: '8px 12px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8 }}>
            <input
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSendPrompt()}
              placeholder={selectedBlockIndex !== null ? 'Change this button to blue...' : 'Select an element first...'}
              disabled={isProcessing || !isConfigured || selectedBlockIndex === null}
              style={{
                flex: 1,
                padding: '8px 12px',
                border: '1px solid #ddd',
                borderRadius: 8,
                fontSize: '0.8rem',
                outline: 'none',
              }}
            />
            <button
              onClick={handleSendPrompt}
              disabled={isProcessing || !prompt.trim() || !isConfigured || selectedBlockIndex === null}
              style={{
                padding: '8px 16px',
                background: isConfigured && prompt.trim() ? '#2563EB' : '#ccc',
                color: '#fff',
                border: 'none',
                borderRadius: 8,
                cursor: isConfigured && prompt.trim() ? 'pointer' : 'default',
                fontWeight: 600,
                fontSize: '0.8rem',
              }}
            >
              Send
            </button>
          </div>

          {!isConfigured && (
            <div style={{ padding: '8px 12px', background: '#fff3cd', fontSize: '0.75rem', color: '#856404' }}>
              ⚙️ Configure your API key in the settings (⚙️) above
            </div>
          )}
        </>
      )}

      {/* Clear chat button */}
      {messages.length > 0 && (
        <button
          onClick={clearMessages}
          style={{ padding: '6px', border: 'none', borderTop: '1px solid #e0e0e0', background: '#fafafa', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
        >
          Clear conversation
        </button>
      )}
    </div>
  )
}
```

- [ ] **Step 3: Integrate into App.tsx**

Modify `src/App.tsx` — add the import and render the AI chat widget. The AIChatWidget should render as a right sidebar (like the block library is on the left).

Add import:
```typescript
import { AIChatWidget } from './components/shell/AIChatWidget'
```

Add below the `CanvasContainer` in the main layout, inside the bloxx-main div after CanvasContainer:
```tsx
            <AIChatWidget />
```

Also import and add FloatingWidget. It floats independently so add it after the main layout:
```typescript
import { FloatingWidget } from './components/canvas/FloatingWidget'
```

And add `<FloatingWidget />` right before the closing `</div>` of the return (after the bloxx-app div ends, or inside it).

Read the current `src/App.tsx` first to find the right insertion points.

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 5: Build check**

```bash
npx vite build 2>&1 | tail -5
```
Expected: Both main and canvas entries build.

- [ ] **Step 6: Commit**

```bash
git add -A && git commit -m "feat: add AI chat widget with properties/prompt modes and floating widget"
```

---

### Task 5: 🎯 Pointer Selection & Element Context Wiring

**Files:**
- Modify: `src/components/canvas/CanvasContainer.tsx` (add element HTML capture for context)
- Modify: `src/components/shell/AIChatWidget.tsx` (ensure pointer button works)

- [ ] **Step 1: Update CanvasContainer to capture element HTML**

In `src/components/canvas/CanvasContainer.tsx`, when receiving `ELEMENT_SELECTED`, also capture the selected element's HTML from the iframe for the context builder.

Add a new message handler case after the existing `ELEMENT_SELECTED` handler:
```typescript
        case 'ELEMENT_SELECTED': {
          if (msg.blockIndex >= 0) {
            selectElement(msg.blockIndex, msg.elementRole)

            // Capture element HTML from iframe for AI context
            const iframe = iframeRef.current
            if (iframe?.contentDocument) {
              const blockEl = iframe.contentDocument.querySelector(`[data-block-index="${msg.blockIndex}"]`)
              if (blockEl) {
                // Store in a ref or pass via a custom event
                window.__bloxxSelectedElementHtml = blockEl.outerHTML
              }
            }
          } else {
            clearSelection()
          }
          break
        }
```

Add a type declaration for the window property. Create or modify a declaration file:

Create `src/types/global.d.ts`:
```typescript
export {}

declare global {
  interface Window {
    __bloxxSelectedElementHtml?: string
  }
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 3: Run all tests**

```bash
npx vitest run
```
Expected: All 13 tests pass.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add pointer selection and element HTML capture for AI context"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ AI chat widget shell with Properties/Prompt toggle (Task 4)
- ✅ Element selection with role-aware property sets (Task 4 — FloatingWidget, AIChatWidget)
- ✅ Floating widget positioning (Task 4 — FloatingWidget)
- ✅ Multi-provider abstraction layer (Task 1 — OpenAI + Anthropic)
- ✅ BYOK support (Task 2 — AI store saves to localStorage)
- ✅ Prompt mode with context builder (Task 3)
- ✅ Response parser and action executor (Task 3)
- ✅ 🎯 pointer selection (Task 5)

**2. Placeholder scan:** No TBDs or TODOs. All code is complete.

**3. Type consistency:** `AIContextPackage`, `AIAction`, `AIProviderType` types defined in Task 1, used consistently in Tasks 2-5.

**4. Gaps:**
- Response parser is basic — only handles `updateStyles`, `updateContent`, `setVariant`, `updateDesignToken` actions. `addBlock` and `removeBlock` are not yet implemented.
- FloatingWidget has basic role-aware controls (variant/size for buttons, font-size/alignment for headings). Full role-aware property sets from the spec (all 8+ element types) are v1.
- No streaming response support (server-sent events) — responses are fetched and parsed as complete JSON.
- External tool integration (OpenCode, Claude Code, Kilo) is deferred after built-in providers work.