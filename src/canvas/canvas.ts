import type { ShellToCanvasMessage, BoundingRect } from '../types'

const canvasEl = document.getElementById('bloxx-canvas')!

// ─── Render ──────────────────────────────────────────────
function renderBlocks(html: string, blockCount: number) {
  if (blockCount === 0) {
    canvasEl.innerHTML = `
      <div class="bloxx-empty-state">
        <div class="bloxx-empty-state__icon">🧱</div>
        <div class="bloxx-empty-state__title">Your page is empty</div>
        <div class="bloxx-empty-state__desc">
          Drag blocks from the Block Library on the left, or click a block to add it to the page.
        </div>
      </div>`
  } else {
    canvasEl.innerHTML = html
    // Attach direct click handlers to each block (bypasses bubbling issues)
    canvasEl.querySelectorAll('.bloxx-block').forEach((blockEl) => {
      const el = blockEl as HTMLElement
      const catcher = el.querySelector('.bloxx-block__click-catcher') as HTMLElement | null
      if (!catcher) return
      
      catcher.onclick = (e) => {
        e.stopPropagation()
        const index = parseInt(el.dataset.blockIndex ?? '-1', 10)
        
        // Update visual selection
        canvasEl.querySelectorAll('.bloxx-block--selected').forEach((b) => b.classList.remove('bloxx-block--selected'))
        el.classList.add('bloxx-block--selected')
        
        window.parent.postMessage({
          type: 'ELEMENT_SELECTED',
          blockIndex: index,
          elementRole: 'section',
          boundingRect: el.getBoundingClientRect(),
        }, '*')
      }
    })
  }
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
        if (value !== null && value !== undefined && value !== '') {
          html = html.replaceAll(`{{${key}}}`, String(value))
        }
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
        <div class="bloxx-block__toolbar">
          <span class="bloxx-block__toolbar-name">${def.name}</span>
          <div class="bloxx-block__toolbar-actions">
            <button class="bloxx-block__toolbar-btn" data-action="move-up" data-block-index="${index}" title="Move up">↑</button>
            <button class="bloxx-block__toolbar-btn" data-action="move-down" data-block-index="${index}" title="Move down">↓</button>
            <button class="bloxx-block__toolbar-btn bloxx-block__toolbar-btn--danger" data-action="remove" data-block-index="${index}" title="Remove block">🗑 Remove</button>
          </div>
        </div>
        ${html}
        <div class="bloxx-block__click-catcher" data-block-index="${index}"></div>
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
      import('../blocks').then(({ curatedBlocks }) => {
        const blockDefs: Record<string, any> = {}
        for (const block of curatedBlocks) {
          blockDefs[block.id] = block
        }
        const pageHtml = buildPageHtml(msg.page, blockDefs)
        renderBlocks(pageHtml, msg.page.blocks.length)

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
// Debug: log ALL clicks at document level first
document.addEventListener('click', (e) => {
  console.log('IFRAME CLICK:', e.target.tagName, e.target.className, 'trusted:', e.isTrusted)
  const flash = document.getElementById('click-debug')
  if (flash) {
    flash.style.opacity = '1'
    setTimeout(() => { flash.style.opacity = '0' }, 300)
  }
}, true)

canvasEl.addEventListener('click', (e) => {
  // Prevent links from navigating — we want selection, not navigation
  e.preventDefault()
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

// ─── Toolbar button handler ────────────────────────────
canvasEl.addEventListener('click', (e) => {
  const toolbarBtn = (e.target as HTMLElement).closest('.bloxx-block__toolbar-btn') as HTMLElement | null
  if (!toolbarBtn) return

  const action = toolbarBtn.dataset.action
  const blockIndex = parseInt(toolbarBtn.dataset.blockIndex ?? '-1', 10)
  if (blockIndex < 0 || !action) return

  if (action === 'remove') {
    const blockEl = toolbarBtn.closest('.bloxx-block') as HTMLElement | null
    if (blockEl) blockEl.remove()
    window.parent.postMessage({ type: 'REMOVE_BLOCK', blockIndex }, '*')
  } else if (action === 'move-up') {
    window.parent.postMessage({ type: 'BLOCK_REORDERED', fromIndex: blockIndex, toIndex: blockIndex - 1 }, '*')
  } else if (action === 'move-down') {
    window.parent.postMessage({ type: 'BLOCK_REORDERED', fromIndex: blockIndex, toIndex: blockIndex + 1 }, '*')
  }
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

// ─── Image click → upload ────────────────────────────
// When clicking an image slot, open a file picker instead of making it contentEditable
canvasEl.addEventListener('click', (e) => {
  const img = (e.target as HTMLElement).closest('[data-bloxx-slot][data-bloxx-type="image"]') as HTMLImageElement | null
  if (!img) return

  // Only trigger for actual image elements with data-bloxx-type="image"
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.style.display = 'none'
  document.body.appendChild(input)

  input.onchange = () => {
    const file = input.files?.[0]
    if (!file) {
      document.body.removeChild(input)
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const blockEl = img.closest('.bloxx-block') as HTMLElement
      const blockIndex = parseInt(blockEl.dataset.blockIndex ?? '-1', 10)
      const slotName = img.dataset.bloxxSlot

      if (slotName) {
        // Update the image src in the iframe
        img.src = dataUrl

        // Notify shell of the content change
        window.parent.postMessage({
          type: 'CONTENT_EDITED',
          blockIndex,
          slotName,
          value: dataUrl,
        }, '*')
      }
    }
    reader.readAsDataURL(file)
    document.body.removeChild(input)
  }

  input.click()
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