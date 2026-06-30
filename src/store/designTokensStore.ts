import { create } from 'zustand'
import type { DesignTokens } from '../types'
import { useProjectStore } from './projectStore'

const DEFAULT_TOKENS: DesignTokens = {
  colors: {
    primary: { value: '#2563EB', type: 'color', description: 'Primary brand color' },
    secondary: { value: '#7C3AED', type: 'color', description: 'Secondary brand color' },
    accent: { value: '#F59E0B', type: 'color', description: 'Accent color' },
    background: { value: '#FFFFFF', type: 'color', description: 'Page background' },
    foreground: { value: '#0F172A', type: 'color', description: 'Text color' },
    muted: { value: '#F1F5F9', type: 'color', description: 'Muted background' },
    border: { value: '#E2E8F0', type: 'color', description: 'Border color' },
    card: { value: '#FFFFFF', type: 'color', description: 'Card background' },
    success: { value: '#10B981', type: 'color', description: 'Success state' },
    warning: { value: '#F59E0B', type: 'color', description: 'Warning state' },
    error: { value: '#EF4444', type: 'color', description: 'Error state' },
  },
  typography: {
    fontBody: { value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', type: 'string', description: 'Body font' },
    fontHeading: { value: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', type: 'string', description: 'Heading font' },
    baseSize: { value: '16px', type: 'size', description: 'Base font size' },
    h1Size: { value: '48px', type: 'size', description: 'H1 font size' },
    h2Size: { value: '36px', type: 'size', description: 'H2 font size' },
    h3Size: { value: '24px', type: 'size', description: 'H3 font size' },
    h4Size: { value: '20px', type: 'size', description: 'H4 font size' },
    leadWeight: { value: '400', type: 'string', description: 'Regular font weight' },
    mediumWeight: { value: '500', type: 'string', description: 'Medium font weight' },
    boldWeight: { value: '700', type: 'string', description: 'Bold font weight' },
  },
  spacing: {
    sectionPadding: { value: '96px', type: 'size', description: 'Section vertical padding' },
    containerMaxWidth: { value: '1200px', type: 'size', description: 'Max content width' },
    gapDefault: { value: '24px', type: 'size', description: 'Default gap between elements' },
    scale0: { value: '0px', type: 'size' },
    scale1: { value: '4px', type: 'size' },
    scale2: { value: '8px', type: 'size' },
    scale3: { value: '12px', type: 'size' },
    scale4: { value: '16px', type: 'size' },
    scale5: { value: '24px', type: 'size' },
    scale6: { value: '32px', type: 'size' },
    scale7: { value: '48px', type: 'size' },
    scale8: { value: '64px', type: 'size' },
    scale9: { value: '96px', type: 'size' },
  },
  borders: {
    radiusNone: { value: '0', type: 'size', description: 'No border radius' },
    radiusSm: { value: '4px', type: 'size', description: 'Small radius' },
    radiusMd: { value: '8px', type: 'size', description: 'Medium radius' },
    radiusLg: { value: '12px', type: 'size', description: 'Large radius' },
    radiusXl: { value: '16px', type: 'size', description: 'Extra large radius' },
    radiusFull: { value: '9999px', type: 'size', description: 'Fully rounded' },
  },
  shadows: {
    sm: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', type: 'string', description: 'Small shadow' },
    md: { value: '0 4px 6px -1px rgb(0 0 0 / 0.1)', type: 'string', description: 'Medium shadow' },
    lg: { value: '0 10px 15px -3px rgb(0 0 0 / 0.1)', type: 'string', description: 'Large shadow' },
  },
  breakpoints: { sm: 640, md: 768, lg: 1024 },
}

interface DesignTokensState {
  tokens: DesignTokens
  isDirty: boolean

  loadTokens: () => void
  updateToken: (category: keyof DesignTokens, key: string, value: string) => void
  resetTokens: () => void
  applyTokens: () => void
}

export const useDesignTokensStore = create<DesignTokensState>((set, get) => ({
  tokens: { ...DEFAULT_TOKENS },
  isDirty: false,

  loadTokens: () => {
    const project = useProjectStore.getState().project
    if (project?.designTokens) {
      const merged: DesignTokens = {
        colors: { ...DEFAULT_TOKENS.colors, ...project.designTokens.colors },
        typography: { ...DEFAULT_TOKENS.typography, ...project.designTokens.typography },
        spacing: { ...DEFAULT_TOKENS.spacing, ...project.designTokens.spacing },
        borders: { ...DEFAULT_TOKENS.borders, ...project.designTokens.borders },
        shadows: { ...DEFAULT_TOKENS.shadows, ...project.designTokens.shadows },
        breakpoints: project.designTokens.breakpoints ?? DEFAULT_TOKENS.breakpoints,
      }
      set({ tokens: merged, isDirty: false })
    } else {
      set({ tokens: { ...DEFAULT_TOKENS }, isDirty: false })
    }
  },

  updateToken: (category, key, value) => {
    const { tokens } = get()
    const categoryTokens = { ...(tokens[category] as Record<string, any>) }
    if (categoryTokens[key]) {
      categoryTokens[key] = { ...categoryTokens[key], value }
    }
    set({
      tokens: { ...tokens, [category]: categoryTokens },
      isDirty: true,
    })
  },

  resetTokens: () => {
    set({ tokens: { ...DEFAULT_TOKENS }, isDirty: true })
  },

  applyTokens: () => {
    const { tokens } = get()
    const project = useProjectStore.getState().project
    if (!project) return
    project.designTokens = JSON.parse(JSON.stringify(tokens))
    useProjectStore.getState().saveProject()

    // Send to canvas iframe
    const canvasIframe = document.querySelector('.bloxx-canvas-area iframe') as HTMLIFrameElement | null
    if (canvasIframe?.contentWindow) {
      canvasIframe.contentWindow.postMessage({ type: 'UPDATE_DESIGN_TOKENS', tokens }, '*')
    }

    set({ isDirty: false })
  },
}))
