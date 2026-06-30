import type { AIContextPackage, BloxxPage, DesignTokens } from '../types'

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
