import type { DesignTokens } from '../types'

/**
 * Compiles DesignTokens into a CSS `:root` stylesheet string.
 * Maps: category.key --> --bloxx-{category}-{key}: {value}
 */
export function compileTokensToCSS(tokens: DesignTokens): string {
  const lines: string[] = [':root {']

  const categories = ['colors', 'typography', 'spacing', 'borders', 'shadows'] as const
  for (const category of categories) {
    const values = tokens[category]
    if (!values) continue
    for (const [key, entry] of Object.entries(values)) {
      if (entry && typeof entry === 'object' && 'value' in entry) {
        lines.push(`  --bloxx-${category}-${key}: ${entry.value};`)
      }
    }
  }

  // Breakpoints as CSS variables
  if (tokens.breakpoints) {
    for (const [key, val] of Object.entries(tokens.breakpoints)) {
      lines.push(`  --bloxx-breakpoint-${key}: ${val}px;`)
    }
  }

  lines.push('}')
  return lines.join('\n')
}