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
