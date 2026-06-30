export interface ContentSlot {
  type: 'text' | 'image' | 'url' | 'icon' | 'richtext'
  default: string | null
  label: string
}

export interface VariantDefinition {
  id: string
  name: string
  template: string
  thumbnail?: string
}

export interface BlockDefinition {
  id: string
  name: string
  category: 'sections' | 'features' | 'pricing' | 'cta' | 'navigation' | 'footer' | 'content' | 'custom'
  description: string
  schema: Record<string, ContentSlot>
  defaultVariant: string
  variants: VariantDefinition[]
  source: 'curated' | 'custom'
}

export interface StyleOverride {
  selector: string
  properties: Record<string, string>
}

export interface BlockInstance {
  id: string
  blockId: string
  variantId: string
  content: Record<string, any>
  overrides: StyleOverride[]
  position?: { x: number; y: number; width: number; height: number }
  hidden?: boolean
}

export interface BloxxPage {
  id: string
  name: string
  slug: string
  blocks: BlockInstance[]
}

export interface DesignTokens {
  colors: Record<string, { value: string; type: 'color' | 'string' | 'size'; description?: string }>
  typography: Record<string, { value: string; type: 'color' | 'string' | 'size'; description?: string }>
  spacing: Record<string, { value: string; type: 'color' | 'string' | 'size'; description?: string }>
  borders: Record<string, { value: string; type: 'color' | 'string' | 'size'; description?: string }>
  shadows: Record<string, { value: string; type: 'color' | 'string' | 'size'; description?: string }>
  breakpoints?: { sm: number; md: number; lg: number }
}

export interface BloxxProject {
  id: string
  name: string
  createdAt: number
  updatedAt: number
  version: number
  pages: BloxxPage[]
  customBlocks: BlockDefinition[]
  designTokens: DesignTokens
  metadata: {
    canvasMode: 'stack' | 'freeform'
    canvasWidth: number
  }
}

// postMessage Protocol
export type ShellToCanvasMessage =
  | { type: 'RENDER'; page: BloxxPage; tokens: DesignTokens }
  | { type: 'UPDATE_BLOCK'; blockIndex: number; variantId?: string; content?: Record<string, any>; overrides?: StyleOverride[] }
  | { type: 'UPDATE_DESIGN_TOKENS'; tokens: DesignTokens }
  | { type: 'SWAP_VARIANT'; blockIndex: number; variantId: string }
  | { type: 'SET_SELECTION'; blockIndex: number | null }
  | { type: 'REORDER_BLOCKS'; fromIndex: number; toIndex: number }
  | { type: 'TOGGLE_MODE'; mode: 'stack' | 'freeform' }
  | { type: 'SET_VIEWPORT_WIDTH'; width: number }

export interface BoundingRect {
  top: number
  left: number
  width: number
  height: number
  bottom: number
  right: number
}

export type CanvasToShellMessage =
  | { type: 'ELEMENT_SELECTED'; blockIndex: number; elementRole: string; boundingRect: BoundingRect | null }
  | { type: 'BLOCK_REORDERED'; fromIndex: number; toIndex: number }
  | { type: 'RENDERED'; blockCount: number }
  | { type: 'SCROLL'; scrollTop: number }
  | { type: 'WIDGET_ACTION'; action: 'close' | 'escape' }

export interface UndoAction {
  type: string
  payload: any
  inverse: () => UndoAction
  execute: () => void
}

export type ViewportDevice = 'desktop' | 'tablet' | 'mobile'
export type EditorMode = 'edit' | 'preview-fullscreen' | 'preview-tab'

export const VIEWPORT_CONFIG: Record<ViewportDevice, { width: number; label: string; icon: string }> = {
  desktop: { width: 1440, label: 'Desktop', icon: '🖥️' },
  tablet:  { width: 768,  label: 'Tablet',  icon: '📱' },
  mobile:  { width: 375,  label: 'Mobile',  icon: '📱' },
}
