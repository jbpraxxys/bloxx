import type { DesignTokens } from '../types'

export interface GeneratedComponentStyles {
  button: string
  input: string
  card: string
}

function getValue(entry: { value?: string } | undefined): string | undefined {
  return entry?.value
}

/**
 * Derives component variant CSS classes from design tokens.
 */
export function generateComponentStyles(tokens: DesignTokens): GeneratedComponentStyles {
  const primary = getValue(tokens.colors?.primary) ?? '#2563EB'
  const background = getValue(tokens.colors?.background) ?? '#FFFFFF'
  const foreground = getValue(tokens.colors?.foreground) ?? '#0F172A'
  const muted = getValue(tokens.colors?.muted) ?? '#F1F5F9'
  const border = getValue(tokens.colors?.border) ?? '#E2E8F0'
  const radiusMd = getValue(tokens.borders?.radiusMd) ?? '8px'
  const radiusSm = getValue(tokens.borders?.radiusSm) ?? '4px'
  const radiusLg = getValue(tokens.borders?.radiusLg) ?? '12px'
  const spacing3 = getValue(tokens.spacing?.scale3) ?? '12px'
  const spacing4 = getValue(tokens.spacing?.scale4) ?? '16px'
  const spacing5 = getValue(tokens.spacing?.scale5) ?? '24px'
  const spacing6 = getValue(tokens.spacing?.scale6) ?? '32px'
  const shadowMd = getValue(tokens.shadows?.md) ?? '0 4px 6px -1px rgb(0 0 0 / 0.1)'

  return {
    button: `
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 500; cursor: pointer; transition: all 0.15s; text-decoration: none; border: 1px solid transparent; }
.btn--sm { padding: ${spacing3} ${spacing4}; font-size: 0.875rem; border-radius: ${radiusSm}; }
.btn--md { padding: ${spacing3} ${spacing5}; font-size: 1rem; border-radius: ${radiusMd}; }
.btn--lg { padding: ${spacing4} ${spacing6}; font-size: 1.125rem; border-radius: ${radiusLg}; }
.btn--solid { background: ${primary}; color: #fff; border-color: transparent; }
.btn--solid:hover { filter: brightness(1.1); }
.btn--outline { background: transparent; color: ${primary}; border-color: ${primary}; }
.btn--outline:hover { background: ${primary}; color: #fff; }
.btn--ghost { background: transparent; color: ${primary}; border-color: transparent; }
.btn--ghost:hover { background: ${muted}; }
.btn--dull { background: ${muted}; color: ${foreground}; border-color: transparent; }
`.trim(),

    input: `
.input { display: block; width: 100%; padding: ${spacing3} ${spacing4}; font-size: 1rem; border: 1px solid ${border}; border-radius: ${radiusMd}; background: ${background}; color: ${foreground}; transition: border-color 0.15s, box-shadow 0.15s; outline: none; }
.input:focus { border-color: ${primary}; box-shadow: 0 0 0 3px ${primary}33; }
.input--sm { padding: 6px ${spacing3}; font-size: 0.875rem; }
.input--lg { padding: ${spacing4} ${spacing5}; font-size: 1.125rem; }
.input--error { border-color: #EF4444; }
.input--error:focus { box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.2); }
`.trim(),

    card: `
.card { border-radius: ${radiusMd}; overflow: hidden; }
.card--bordered { background: ${background}; border: 1px solid ${border}; }
.card--elevated { background: ${background}; box-shadow: ${shadowMd}; border: none; }
.card--flat { background: ${muted}; border: none; }
`.trim(),
  }
}