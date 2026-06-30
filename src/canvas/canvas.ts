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

      return `<div class="bloxx-block${instance.position ? ' bloxx-block--freeform' : ''}" data-block-index="${index}" data-block-id="${instance.blockId}" style="${instance.position ? `position:absolute;left:${instance.position.x}px;top:${instance.position.y}px;width:${instance.position.width}px;height:${instance.position.height}px;` : ''}">
        <span class="bloxx-block__label">${def.name}</span>
        ${html}
        ${instance.position ? '<div class="bloxx-block__resize-handle"></div>' : ''}
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

        // Set canvas positioning for freeform mode
        canvasEl.style.position = 'relative'

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

    case 'TOGGLE_MODE':
      canvasEl.classList.toggle('bloxx-canvas--freeform', msg.mode === 'freeform')
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

// ─── Double-click to edit content ──────────────────────
canvasEl.addEventListener('dblclick', (e) => {
  const target = e.target as HTMLElement
  const slotEl = target.closest('[data-bloxx-slot]') as HTMLElement | null
  if (!slotEl) return

  // Get parent block info before making editable
  const blockEl = slotEl.closest('.bloxx-block') as HTMLElement | null
  if (!blockEl) return
  const blockIndex = parseInt(blockEl.dataset.blockIndex ?? '-1', 10)
  const slotName = slotEl.dataset.bloxxSlot

  // Make editable
  slotEl.contentEditable = 'true'
  slotEl.focus()

  // Select all text
  const range = document.createRange()
  range.selectNodeContents(slotEl)
  const selection = window.getSelection()
  selection?.removeAllRanges()
  selection?.addRange(range)

  const finishEditing = () => {
    slotEl.contentEditable = 'false'
    const newContent = slotEl.innerText

    if (slotName && newContent) {
      window.parent.postMessage({
        type: 'CONTENT_EDITED',
        blockIndex,
        slotName,
        value: newContent,
      }, '*')
    }

    slotEl.removeEventListener('blur', finishEditing)
    document.removeEventListener('keydown', handleEscape)
  }

  const handleEscape = (ev: KeyboardEvent) => {
    if (ev.key === 'Escape') {
      slotEl.contentEditable = 'false'
      slotEl.removeEventListener('blur', finishEditing)
      document.removeEventListener('keydown', handleEscape)
    }
  }

  slotEl.addEventListener('blur', finishEditing)
  document.addEventListener('keydown', handleEscape)
})

// ─── Free-form drag/resize ─────────────────────────────
document.addEventListener('mousedown', (e) => {
  const handle = (e.target as HTMLElement).closest('.bloxx-block__resize-handle') as HTMLElement | null
  if (!handle) return

  e.preventDefault()
  const block = handle.closest('.bloxx-block') as HTMLElement
  const startX = e.clientX
  const startY = e.clientY
  const startW = block.offsetWidth
  const startH = block.offsetHeight

  const onMouseMove = (ev: MouseEvent) => {
    const w = Math.max(200, startW + (ev.clientX - startX))
    const h = Math.max(100, startH + (ev.clientY - startY))
    block.style.width = `${w}px`
    block.style.height = `${h}px`
  }

  const onMouseUp = (_ev: MouseEvent) => {
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    const index = parseInt(block.dataset.blockIndex ?? '-1', 10)
    window.parent.postMessage({
      type: 'BLOCK_POSITION_UPDATED',
      blockIndex: index,
      position: {
        x: block.offsetLeft,
        y: block.offsetTop,
        width: block.offsetWidth,
        height: block.offsetHeight,
      },
    }, '*')
  }

  document.addEventListener('mousemove', onMouseMove)
  document.addEventListener('mouseup', onMouseUp)
})

// Notify parent that canvas is ready
window.parent.postMessage({ type: 'RENDERED', blockCount: 0 }, '*')