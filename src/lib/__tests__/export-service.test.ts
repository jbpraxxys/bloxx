import { describe, it, expect } from 'vitest'
import { buildExport } from '../export-service'
import type { BloxxProject, BlockDefinition } from '../../types'

const mockBlock: BlockDefinition = {
  id: 'hero',
  name: 'Hero',
  category: 'sections',
  description: 'Hero block',
  source: 'curated',
  defaultVariant: 'centered',
  schema: {
    headline: { type: 'text', default: 'Hello', label: 'Headline' },
  },
  variants: [
    { id: 'centered', name: 'Centered', template: '<h1>{{headline}}</h1>' },
  ],
}

const mockProject: BloxxProject = {
  id: 'proj-1',
  name: 'Test Project',
  createdAt: Date.now(),
  updatedAt: Date.now(),
  version: 1,
  pages: [
    {
      id: 'page-1',
      name: 'Home',
      slug: 'index',
      blocks: [
        {
          id: 'block-1',
          blockId: 'hero',
          variantId: 'centered',
          content: { headline: 'Welcome' },
          overrides: [],
        },
      ],
    },
  ],
  customBlocks: [],
  designTokens: {
    colors: { primary: { value: '#2563EB', type: 'color' } },
    typography: {},
    spacing: {},
    borders: {},
    shadows: {},
  },
  metadata: { canvasMode: 'stack', canvasWidth: 1440 },
}

describe('buildExport', () => {
  it('generates a ZIP blob', async () => {
    const blob = await buildExport(mockProject, [mockBlock])
    expect(blob).toBeInstanceOf(Blob)
    expect(blob.type).toBe('application/zip')
  })

  it('includes design-system.css in the export', async () => {
    const blob = await buildExport(mockProject, [mockBlock])
    const arrayBuffer = await blob.arrayBuffer()
    const text = new TextDecoder().decode(arrayBuffer)
    expect(text).toContain('design-system.css')
  })

  it('renders page HTML with block content and metadata', async () => {
    const blob = await buildExport(mockProject, [mockBlock])
    const arrayBuffer = await blob.arrayBuffer()
    const text = new TextDecoder().decode(arrayBuffer)
    expect(text).toContain('Welcome')
    expect(text).toContain('data-bloxx-block="hero"')
  })

  it('renders page HTML without metadata when option is false', async () => {
    const blob = await buildExport(mockProject, [mockBlock], { includeMetadata: false, inlineAssets: true })
    const arrayBuffer = await blob.arrayBuffer()
    const text = new TextDecoder().decode(arrayBuffer)
    expect(text).not.toContain('data-bloxx-block')
  })
})
