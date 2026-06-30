import JSZip from 'jszip'
import type { BloxxProject, DesignTokens, BlockDefinition, StyleOverride } from '../types'

interface ExportOptions {
  includeMetadata: boolean
  inlineAssets: boolean
}

export async function buildExport(
  project: BloxxProject,
  blockLibrary: BlockDefinition[],
  options: ExportOptions = { includeMetadata: true, inlineAssets: true },
): Promise<Blob> {
  const zip = new JSZip()
  const blockDefMap = new Map(blockLibrary.map((b) => [b.id, b]))

  // CSS: design-system.css
  const designTokensCSS = compileTokensToCSS(project.designTokens)
  zip.file('css/design-system.css', designTokensCSS)

  // CSS: components.css
  const componentCSS = generateComponentCSS(project.designTokens)
  zip.file('css/components.css', componentCSS)

  // Pages
  for (const page of project.pages) {
    const html = renderPageToHTML(page, blockDefMap, project.designTokens, options.includeMetadata)
    zip.file(`${page.slug || 'index'}.html`, html)
  }

  return await zip.generateAsync({ type: 'blob' })
}

function compileTokensToCSS(tokens: DesignTokens): string {
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
  lines.push('}')
  return lines.join('\n')
}

function generateComponentCSS(tokens: DesignTokens): string {
  const primary = getValue(tokens.colors?.primary) ?? '#2563EB'
  const muted = getValue(tokens.colors?.muted) ?? '#F1F5F9'
  const foreground = getValue(tokens.colors?.foreground) ?? '#0F172A'
  const background = getValue(tokens.colors?.background) ?? '#FFFFFF'
  const border = getValue(tokens.colors?.border) ?? '#E2E8F0'
  const radiusMd = getValue(tokens.borders?.radiusMd) ?? '8px'

  return `
/* ─── Buttons ───────────────────────────────────── */
.btn { display: inline-flex; align-items: center; justify-content: center; gap: 8px; font-weight: 500; cursor: pointer; text-decoration: none; border: 1px solid transparent; transition: all 0.15s; }
.btn--solid { background: ${primary}; color: #fff; }
.btn--outline { background: transparent; color: ${primary}; border-color: ${primary}; }
.btn--ghost { background: transparent; color: ${primary}; }
.btn--dull { background: ${muted}; color: ${foreground}; }

/* ─── Cards ─────────────────────────────────────── */
.card { border-radius: ${radiusMd}; overflow: hidden; }
.card--bordered { background: ${background}; border: 1px solid ${border}; }
.card--elevated { background: ${background}; box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); }
.card--flat { background: ${muted}; }

/* ─── Inputs ────────────────────────────────────── */
.input { display: block; width: 100%; padding: 12px 16px; border: 1px solid ${border}; border-radius: ${radiusMd}; background: ${background}; color: ${foreground}; }
.input:focus { border-color: ${primary}; outline: none; box-shadow: 0 0 0 3px ${primary}33; }
`.trim()
}

function getValue(entry: { value?: string } | undefined): string | undefined {
  return entry?.value
}

function renderPageToHTML(
  page: { name: string; slug: string; blocks: Array<{ blockId: string; variantId: string; content: Record<string, any>; overrides: StyleOverride[]; position?: any }> },
  blockDefMap: Map<string, BlockDefinition>,
  tokens: DesignTokens,
  includeMetadata: boolean,
): string {
  const metaAttrs = includeMetadata ? ` data-bloxx-project="true" data-bloxx-version="1.0"` : ''

  const bodyContent = page.blocks.map((instance, index) => {
    const def = blockDefMap.get(instance.blockId)
    if (!def) return `<!-- Unknown block: ${instance.blockId} -->`
    const variant = def.variants.find((v) => v.id === instance.variantId) ?? def.variants[0]
    if (!variant) return `<!-- No variant found -->`

    let html = variant.template
    for (const [key, value] of Object.entries(instance.content)) {
      html = html.replaceAll(`{{${key}}}`, String(value ?? ''))
    }
    for (const [key, slot] of Object.entries(def.schema)) {
      html = html.replaceAll(`{{${key}}}`, String((slot as any).default ?? ''))
    }
    if (instance.overrides?.length) {
      for (const override of instance.overrides) {
        const cssProps = Object.entries(override.properties).map(([k, v]) => `${k}: ${v}`).join('; ')
        html = `<div style="${cssProps}">${html}</div>`
      }
    }

    const posStyle = instance.position
      ? ` style="position:absolute;left:${instance.position.x}px;top:${instance.position.y}px;width:${instance.position.width}px;height:${instance.position.height}px;"`
      : ''

    const dataAttrs = includeMetadata
      ? ` data-bloxx-block="${def.id}" data-bloxx-instance="block-${index}" data-bloxx-variant="${instance.variantId}"`
      : ''

    return `  <section${dataAttrs}${posStyle}>\n${html}\n  </section>`
  }).join('\n\n')

  return `<!DOCTYPE html>
<html lang="en"${metaAttrs}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${escapeHtml(page.name)}</title>
  <link rel="stylesheet" href="css/design-system.css">
  <link rel="stylesheet" href="css/components.css">
</head>
<body>
${bodyContent}
</body>
</html>`
}

function escapeHtml(str: string): string {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}
