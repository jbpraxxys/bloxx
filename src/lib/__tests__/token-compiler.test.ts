import { describe, it, expect } from 'vitest'
import { compileTokensToCSS } from '../token-compiler'
import type { DesignTokens } from '../../types'

const mockTokens: DesignTokens = {
  colors: {
    primary: { value: '#2563EB', type: 'color' },
    background: { value: '#FFFFFF', type: 'color' },
  },
  typography: {
    baseSize: { value: '16px', type: 'size' },
  },
  spacing: {
    scale4: { value: '16px', type: 'size' },
  },
  borders: {
    radiusMd: { value: '8px', type: 'size' },
  },
  shadows: {
    sm: { value: '0 1px 2px 0 rgb(0 0 0 / 0.05)', type: 'string' },
  },
  breakpoints: { sm: 640, md: 768, lg: 1024 },
}

describe('compileTokensToCSS', () => {
  it('generates :root with CSS variable declarations', () => {
    const css = compileTokensToCSS(mockTokens)
    expect(css).toContain(':root {')
    expect(css).toContain('--bloxx-colors-primary: #2563EB;')
    expect(css).toContain('--bloxx-colors-background: #FFFFFF;')
    expect(css).toContain('--bloxx-typography-baseSize: 16px;')
    expect(css).toContain('--bloxx-spacing-scale4: 16px;')
    expect(css).toContain('--bloxx-borders-radiusMd: 8px;')
    expect(css).toContain('--bloxx-shadows-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);')
    expect(css).toContain('--bloxx-breakpoint-sm: 640px;')
    expect(css).toContain('--bloxx-breakpoint-md: 768px;')
    expect(css).toContain('--bloxx-breakpoint-lg: 1024px;')
    expect(css).toContain('}')
  })

  it('handles empty tokens gracefully', () => {
    const empty: DesignTokens = { colors: {}, typography: {}, spacing: {}, borders: {}, shadows: {} }
    const css = compileTokensToCSS(empty)
    expect(css).toBe(':root {\n}')
  })
})