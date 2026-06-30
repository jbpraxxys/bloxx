import type { BloxxProject, BlockInstance, StyleOverride } from '../types'
import { useProjectStore } from '../store/projectStore'

/**
 * Scans an exported Bloxx HTML file for data-bloxx-* attributes
 * and reconstructs a project structure.
 */
export function importBloxxHTML(html: string, fileName: string): BloxxProject | null {
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  const root = doc.documentElement
  const isBloxx = root.getAttribute('data-bloxx-project') === 'true'
  if (!isBloxx) return null

  const blocks: BlockInstance[] = []
  const sections = doc.querySelectorAll('[data-bloxx-block]')

  sections.forEach((section) => {
    const blockId = section.getAttribute('data-bloxx-block') ?? 'unknown'
    const variantId = section.getAttribute('data-bloxx-variant') ?? 'default'

    let content: Record<string, any> = {}
    // Try to extract content from data-bloxx-content attribute
    const contentStr = section.getAttribute('data-bloxx-content')
    if (contentStr) {
      try { content = JSON.parse(contentStr) } catch { /* ignore */ }
    }

    let overrides: StyleOverride[] = []
    const overridesStr = section.getAttribute('data-bloxx-overrides')
    if (overridesStr) {
      try { overrides = JSON.parse(overridesStr) } catch { /* ignore */ }
    }

    blocks.push({
      id: `imported-${Date.now()}-${blocks.length}`,
      blockId,
      variantId,
      content,
      overrides,
    })
  })

  if (blocks.length === 0) return null

  const pageName = fileName.replace(/\.html$/i, '') || 'Imported Page'

  const project: BloxxProject = {
    id: crypto.randomUUID(),
    name: `Imported: ${pageName}`,
    createdAt: Date.now(),
    updatedAt: Date.now(),
    version: 1,
    pages: [
      {
        id: crypto.randomUUID(),
        name: pageName,
        slug: pageName.toLowerCase().replace(/\s+/g, '-'),
        blocks,
      },
    ],
    customBlocks: [],
    designTokens: {
      colors: {},
      typography: {},
      spacing: {},
      borders: {},
      shadows: {},
    },
    metadata: { canvasMode: 'stack', canvasWidth: 1440 },
  }

  return project
}

/**
 * Loads an imported project into the store.
 */
export function loadImportedProject(project: BloxxProject): void {
  const store = useProjectStore.getState()
  store.createProject(project.name).then(() => {
    const currentProject = useProjectStore.getState().project
    if (currentProject) {
      currentProject.pages = project.pages
      store.saveProject()
    }
  })
}
