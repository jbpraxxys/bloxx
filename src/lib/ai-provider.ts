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
            content: `You are a design assistant for Bloxx, a wireframing and HTML design tool. You help users modify their designs. Respond with structured JSON actions only. Available actions: updateStyles (CSS property changes), updateContent (text changes), setVariant (swap variant). Return format: { "actions": [{ "type": "updateStyles", "selector": ".btn", "properties": { "background": "red" } }] }`,
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
      const parsed = JSON.parse(content)
      return parsed as AIProviderResponse
    } catch {
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