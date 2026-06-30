import type { ShellToCanvasMessage, BoundingRect } from '../types'

const canvasEl = document.getElementById('bloxx-canvas')!

// ─── Render ──────────────────────────────────────────────
function renderBlocks(html: string) {
  canvasEl.innerHTML = html
}

function buildPageHtml(page: any, blockDefs: Record<string, any>): string {
  return (page.blocks ?? [])
    .map((instance: any, index: number) => {
      const def = blockDefs[instance.blockId]
      if (!def) return '<div class="bloxx-block">Unknown block</div>'
      const variant = def.variants.find((v: any) => v.id === instance.variantId) ?? def.variants[0]
      if (!variant) return '<div class="bloxx-block">No variant</div>'

      // Interpolate content into template
      let html = variant.template
      for (const [key, value] of Object.entries(instance.content ?? {})) {
        html = html.replaceAll(`{{${key}}}`, String(value ?? ''))
      }
      // Replace any remaining placeholders with defaults from schema
      for (const [key, slot] of Object.entries(def.schema ?? {})) {
        html = html.replaceAll(`{{${key}}}`, String((slot as any).default ?? ''))
      }

      // Apply style overrides
      for (const override of instance.overrides ?? []) {
        const cssProps = Object.entries(override.properties)
          .map(([k, v]) => `${k}: ${v}`)
          .join('; ')
        html = `<div style="${cssProps}">${html}</div>`
      }

      return `<div class="bloxx-block" data-block-index="${index}" data-block-id="${instance.blockId}">
        <span class="bloxx-block__label">${def.name}</span>
        ${html}
      </div>`
    })
    .join('\n')
}

// ─── Message Handler ────────────────────────────────────
window.addEventListener('message', (event: MessageEvent<ShellToCanvasMessage>) => {
  const msg = event.data

  switch (msg.type) {
    case 'RENDER': {
      // Load block definitions dynamically
      import('../blocks/curated').then(({ curatedBlocks }) => {
        const blockDefs: Record<string, any> = {}
        for (const block of curatedBlocks) {
          blockDefs[block.id] = block
        }
        const pageHtml = buildPageHtml(msg.page, blockDefs)
        renderBlocks(pageHtml)

        window.parent.postMessage(
          { type: 'RENDERED', blockCount: msg.page.blocks.length },
          '*',
        )
      })
      break
    }

    case 'SET_SELECTION': {
      document.querySelectorAll('.bloxx-block--selected').forEach((el) => {
        el.classList.remove('bloxx-block--selected')
      })
      if (msg.blockIndex !== null) {
        const blockEl = document.querySelector(`[data-block-index="${msg.blockIndex}"]`)
        blockEl?.classList.add('bloxx-block--selected')
      }
      break
    }

    case 'SET_VIEWPORT_WIDTH':
      document.body.style.width = `${msg.width}px`
      document.body.style.margin = '0 auto'
      break

    default:
      // Other message types handled by shell re-rendering
      break
  }
})

// ─── Click Handler ──────────────────────────────────────
canvasEl.addEventListener('click', (e) => {
  const blockEl = (e.target as HTMLElement).closest('.bloxx-block') as HTMLElement | null
  if (!blockEl) {
    // Clicked empty space — deselect
    document.querySelectorAll('.bloxx-block--selected').forEach((el) => {
      el.classList.remove('bloxx-block--selected')
    })
    window.parent.postMessage({
      type: 'ELEMENT_SELECTED',
      blockIndex: -1,
      elementRole: '',
      boundingRect: null,
    }, '*')
    return
  }

  const index = parseInt(blockEl.dataset.blockIndex ?? '-1', 10)
  const rect = blockEl.getBoundingClientRect()

  // Determine element role (what was clicked inside the block)
  const target = e.target as HTMLElement
  const tag = target.tagName.toLowerCase()
  let role = 'section'
  if (['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)) role = 'heading'
  else if (tag === 'p' || tag === 'span') role = 'text'
  else if (tag === 'a' || tag === 'button') role = 'button'
  else if (tag === 'img') role = 'image'
  else if (tag === 'input' || tag === 'textarea' || tag === 'select') role = 'input'

  // Update selection visual
  document.querySelectorAll('.bloxx-block--selected').forEach((el) => {
    el.classList.remove('bloxx-block--selected')
  })
  blockEl.classList.add('bloxx-block--selected')

  const boundingRect: BoundingRect = {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
    bottom: rect.bottom,
    right: rect.right,
  }

  window.parent.postMessage({
    type: 'ELEMENT_SELECTED',
    blockIndex: index,
    elementRole: role,
    boundingRect,
  }, '*')
})

// Notify parent that canvas is ready
window.parent.postMessage({ type: 'RENDERED', blockCount: 0 }, '*')