import { create } from 'zustand'
import type { AIProviderType, AIContextPackage, AIAction } from '../types'
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
