import { describe, it, expect } from 'vitest'
import { generateComponentStyles } from '../component-styles'
import type { DesignTokens } from '../../types'

const mockTokens: DesignTokens = {
  colors: {
    primary: { value: '#2563EB', type: 'color' },
    background: { value: '#FFFFFF', type: 'color' },
    foreground: { value: '#0F172A', type: 'color' },
    muted: { value: '#F1F5F9', type: 'color' },
    border: { value: '#E2E8F0', type: 'color' },
  },
  typography: {},
  spacing: {},
  borders: {},
  shadows: {},
}

describe('generateComponentStyles', () => {
  it('generates button styles with all variants and sizes', () => {
    const styles = generateComponentStyles(mockTokens)
    expect(styles.button).toContain('.btn--solid')
    expect(styles.button).toContain('.btn--outline')
    expect(styles.button).toContain('.btn--ghost')
    expect(styles.button).toContain('.btn--dull')
    expect(styles.button).toContain('.btn--sm')
    expect(styles.button).toContain('.btn--md')
    expect(styles.button).toContain('.btn--lg')
    expect(styles.button).toContain('#2563EB')
  })

  it('generates input styles with states', () => {
    const styles = generateComponentStyles(mockTokens)
    expect(styles.input).toContain('.input')
    expect(styles.input).toContain('.input:focus')
    expect(styles.input).toContain('.input--error')
    expect(styles.input).toContain('.input--sm')
    expect(styles.input).toContain('.input--lg')
  })

  it('generates card styles with 3 variants', () => {
    const styles = generateComponentStyles(mockTokens)
    expect(styles.card).toContain('.card--bordered')
    expect(styles.card).toContain('.card--elevated')
    expect(styles.card).toContain('.card--flat')
  })
})