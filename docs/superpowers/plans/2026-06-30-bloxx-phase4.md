# Phase 4 — Advanced Features Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the block library to 40+ total blocks, implement free-form canvas mode with absolute positioning, and build a custom block editor UI for creating/saving user-defined blocks.

**Architecture:** New block definitions are added to `curated.ts` following the existing pattern. Free-form mode extends the canvas iframe with position/size controls and updates the `BlockInstance.position` field. Custom block editor opens a modal/panel that lets users define schema fields and write HTML templates, saved to `BloxxProject.customBlocks`.

**Tech Stack:** React, Zustand, canvas iframe (existing), IndexedDB (existing).

---

### File Structure

```
src/
├── blocks/
│   └── curated.ts                    # Add 30+ block definitions (MODIFY)
├── canvas/
│   └── canvas.ts                     # Add free-form mode rendering (MODIFY)
├── store/
│   └── projectStore.ts               # Add free-form position updates (MODIFY)
├── components/
│   └── shell/
│       └── BlockEditor.tsx           # Custom block editor modal (NEW)
└── types/
    └── index.ts                      # Already has all needed types
```

---

### Task 1: Block Library Expansion (30+ blocks)

**Files:**
- Modify: `src/blocks/curated.ts` (add 30 new block definitions)

Add blocks in these categories to reach 40+ total:

| Category | New Blocks | Variants |
|---|---|---|
| **Navigation** | Navbar with dropdown, Mobile hamburger menu, Sticky nav, Transparent nav | 2-3 each |
| **Hero** | Video hero, Gradient hero, Background image hero, Animated hero | 2-3 each |
| **Features** | Icon grid, Tabs, Accordion, Single feature highlight, Side-by-side | 2-3 each |
| **Pricing** | 4-tier, Monthly/yearly toggle, Feature comparison | 2-3 each |
| **CTA** | Banner CTA, Modal trigger, Background image CTA | 2-3 each |
| **Testimonials** | Carousel, Side-by-side, Single quote large | 2-3 each |
| **FAQ** | Two-column list, Searchable FAQ | 2-3 each |
| **Footer** | Minimal footer, Social links footer, App-style footer | 2-3 each |
| **Content** | Rich text section, Team grid, Contact form, Schedule demo | 2-3 each |
| **Misc** | Logo cloud (expand), Stats (expand), Comparison table, Timeline | 2-3 each |

Each block must follow the existing pattern:
```typescript
{
  id: 'unique-id',
  name: 'Display Name',
  category: 'sections',
  description: 'Short description',
  source: 'curated',
  defaultVariant: 'variant-id',
  schema: {
    field1: { type: 'text', default: 'Default value', label: 'Field Label' },
  },
  variants: [
    {
      id: 'variant-id',
      name: 'Variant Name',
      template: `<section>HTML with {{placeholders}}</section>`,
    },
  ],
}
```

Total target: 40+ blocks across all categories, with ~80+ total variants.

- [ ] **Step 1: Add 5+ hero section blocks**

Append to the `curatedBlocks` array in `src/blocks/curated.ts`: Gradient hero, Video hero, Background image hero, Animated hero, Product hero.

- [ ] **Step 2: Add 3+ navigation blocks**

Transparent nav, Hamburger menu, Sticky nav, Mega menu dropdown.

- [ ] **Step 3: Add 5+ features section blocks**

Icon grid, Tabs, Accordion, Single feature highlight, Side-by-side, Alternating rows.

- [ ] **Step 4: Add 3+ pricing blocks**

4-tier, Monthly/yearly toggle, Feature comparison, Enterprise tier.

- [ ] **Step 5: Add 4+ CTA blocks**

Banner, Modal trigger, Background image, Gradient banner, Inline form.

- [ ] **Step 6: Add 4+ content blocks**

Team grid, Contact form, Timeline, Comparison table, Schedule demo.

- [ ] **Step 7: Add remaining blocks**

Expanded testimonials (3 variants), FAQ (2 variants), Footer (2 variants), Logo cloud (2 variants), Stats (2 variants).

- [ ] **Step 8: Verify TypeScript and build**

```bash
npx tsc -b --noEmit && npx vite build 2>&1 | tail -3
```

- [ ] **Step 9: Commit**

```bash
git add -A && git commit -m "feat: expand block library to 40+ blocks with 80+ variants"
```

---

### Task 2: Free-Form Canvas Mode

**Files:**
- Modify: `src/canvas/canvas.ts`
- Modify: `src/store/canvasStore.ts`
- Modify: `src/store/projectStore.ts`
- Modify: `src/components/canvas/CanvasContainer.tsx`

- [ ] **Step 1: Add free-form mode state to canvasStore**

Add to `src/store/canvasStore.ts`:
```typescript
  canvasMode: 'stack' | 'freeform',
  setCanvasMode: (mode: 'stack' | 'freeform') => void
```

Initialize `canvasMode` to `'stack'`.

Add:
```typescript
  setCanvasMode: (mode) => set({ canvasMode: mode }),
```

- [ ] **Step 2: Add block position update to projectStore**

Add to `src/store/projectStore.ts`:
```typescript
  updateBlockPosition: (pageId: string, blockInstanceId: string, position: { x: number; y: number; width: number; height: number }) => void
```

Implementation:
```typescript
  updateBlockPosition: (pageId, blockInstanceId, position) => {
    const { project, saveProject } = get()
    if (!project) return
    const page = project.pages.find((p) => p.id === pageId)
    if (!page) return
    const block = page.blocks.find((b) => b.id === blockInstanceId)
    if (!block) return
    block.position = position
    saveProject()
  },
```

- [ ] **Step 3: Add free-form rendering to canvas.ts**

In the `buildPageHtml` function in `src/canvas/canvas.ts`, when a block has a `position`, render it with absolute positioning:

```typescript
// Inside buildPageHtml, after creating the block HTML:
let blockStyle = ''
if (instance.position) {
  blockStyle = `position:absolute;left:${instance.position.x}px;top:${instance.position.y}px;width:${instance.position.width}px;height:${instance.position.height}px;`
}

// Apply to the wrapper div:
return `<div class="bloxx-block" data-block-index="${index}" data-block-id="${instance.blockId}" style="${blockStyle}">
  ...
</div>`
```

When the canvas mode is `'freeform'`, also add resizable/draggable handles via CSS:
```css
.bloxx-block--freeform { position: absolute; cursor: move; }
.bloxx-block__resize-handle { position: absolute; bottom: 0; right: 0; width: 12px; height: 12px; background: #3b82f6; cursor: se-resize; border-radius: 2px; }
```

- [ ] **Step 4: Add free-form mode toggle to toolbar**

In `src/components/shell/Toolbar.tsx`, add a mode toggle button next to the viewport switcher:

```typescript
const { canvasMode, setCanvasMode } = useCanvasStore()

// In the toolbar JSX, after viewport switcher:
<button
  className={`bloxx-toolbar__btn ${canvasMode === 'freeform' ? 'bloxx-toolbar__btn--active' : ''}`}
  onClick={() => setCanvasMode(canvasMode === 'stack' ? 'freeform' : 'stack')}
  title={canvasMode === 'freeform' ? 'Switch to Stack mode' : 'Switch to Free-Form mode'}
>
  {canvasMode === 'freeform' ? '📐 Stack' : '✂️ Free-Form'}
</button>
```

- [ ] **Step 5: Add free-form message handling in CanvasContainer**

In `src/components/canvas/CanvasContainer.tsx`, send the canvas mode to the iframe whenever it changes:

```typescript
// Add after the viewport useEffect:
useEffect(() => {
  const iframe = iframeRef.current
  if (!iframe?.contentWindow) return
  iframe.contentWindow.postMessage({ type: 'TOGGLE_MODE', mode: canvasMode }, '*')
}, [canvasMode])
```

Also listen for position updates from the iframe (mouseup after drag/resize):
```typescript
// Add to message handler:
case 'BLOCK_POSITION_UPDATED': {
  const { blockIndex, position } = msg as any
  const pageId = project?.pages[0]?.id
  const block = project?.pages[0]?.blocks[blockIndex]
  if (pageId && block) {
    useProjectStore.getState().updateBlockPosition(pageId, block.id, position)
  }
  break
}
```

- [ ] **Step 6: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 7: Build check**

```bash
npx vite build 2>&1 | tail -5
```

- [ ] **Step 8: Commit**

```bash
git add -A && git commit -m "feat: add free-form canvas mode with absolute positioning"
```

---

### Task 3: Custom Block Editor

**Files:**
- Create: `src/components/shell/BlockEditor.tsx`
- Modify: `src/components/shell/BlockLibrary.tsx` (add "Create Block" button)
- Modify: `src/store/projectStore.ts` (add custom block save)

- [ ] **Step 1: Add custom block save to projectStore**

Add to `src/store/projectStore.ts`:
```typescript
  saveCustomBlock: (block: BlockDefinition) => void
```

Implementation:
```typescript
  saveCustomBlock: (block) => {
    const { project, saveProject } = get()
    if (!project) return
    const existing = project.customBlocks.findIndex((b) => b.id === block.id)
    if (existing >= 0) {
      project.customBlocks[existing] = block
    } else {
      project.customBlocks.push(block)
    }
    saveProject()
  },
```

Also add `deleteCustomBlock`:
```typescript
  deleteCustomBlock: (blockId: string) => {
    const { project, saveProject } = get()
    if (!project) return
    project.customBlocks = project.customBlocks.filter((b) => b.id !== blockId)
    saveProject()
  },
```

- [ ] **Step 2: Write BlockEditor component**

Write `src/components/shell/BlockEditor.tsx`:
```typescript
import React, { useState } from 'react'
import type { BlockDefinition, ContentSlot } from '../../types'
import { curatedBlocks } from '../../blocks/curated'
import { useProjectStore } from '../../store/projectStore'

interface BlockEditorProps {
  onClose: () => void
}

export const BlockEditor: React.FC<BlockEditorProps> = ({ onClose }) => {
  const { project, saveCustomBlock } = useProjectStore()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [template, setTemplate] = useState('<section>\n  <h2>{{heading}}</h2>\n  <p>{{description}}</p>\n</section>')
  const [fields, setFields] = useState<{ name: string; label: string; defaultVal: string }[]>([
    { name: 'heading', label: 'Heading', defaultVal: 'Heading' },
    { name: 'description', label: 'Description', defaultVal: 'Description here' },
  ])

  const addField = () => {
    setFields([...fields, { name: '', label: '', defaultVal: '' }])
  }

  const removeField = (index: number) => {
    setFields(fields.filter((_, i) => i !== index))
  }

  const updateField = (index: number, key: 'name' | 'label' | 'defaultVal', value: string) => {
    const updated = [...fields]
    updated[index] = { ...updated[index], [key]: value }
    setFields(updated)
  }

  const handleSave = () => {
    if (!name.trim() || !template.trim() || !project) return

    const schema: Record<string, ContentSlot> = {}
    for (const field of fields) {
      if (field.name.trim()) {
        schema[field.name.trim()] = {
          type: 'text',
          default: field.defaultVal || '',
          label: field.label || field.name,
        }
      }
    }

    const block: BlockDefinition = {
      id: `custom-${Date.now()}`,
      name: name.trim(),
      category: 'custom',
      description: description.trim(),
      source: 'custom',
      defaultVariant: 'default',
      schema,
      variants: [
        {
          id: 'default',
          name: 'Default',
          template: template.trim(),
        },
      ],
    }

    saveCustomBlock(block)
    onClose()
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      zIndex: 2000,
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: 640, maxHeight: '90vh',
        overflow: 'auto', boxShadow: '0 8px 40px rgba(0,0,0,0.2)',
      }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #e0e0e0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: 700 }}>✏️ Create Custom Block</h2>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', color: '#888' }}>✕</button>
        </div>

        <div style={{ padding: 20 }}>
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 4, fontSize: '0.85rem' }}>Block Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g., Team Section" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem' }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 4, fontSize: '0.85rem' }}>Description</label>
            <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Brief description" style={{ width: '100%', padding: '8px 12px', border: '1px solid #ddd', borderRadius: 8, fontSize: '0.9rem' }} />
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
              <label style={{ fontWeight: 600, color: '#333', fontSize: '0.85rem' }}>Content Fields</label>
              <button onClick={addField} style={{ padding: '4px 12px', border: '1px solid #2563EB', borderRadius: 6, background: 'transparent', color: '#2563EB', cursor: 'pointer', fontSize: '0.8rem' }}>+ Add Field</button>
            </div>
            {fields.map((field, i) => (
              <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8, alignItems: 'center' }}>
                <input value={field.name} onChange={(e) => updateField(i, 'name', e.target.value)} placeholder="Field name (e.g., heading)" style={{ flex: 1, padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem', fontFamily: 'monospace' }} />
                <input value={field.label} onChange={(e) => updateField(i, 'label', e.target.value)} placeholder="Label" style={{ flex: 1, padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }} />
                <input value={field.defaultVal} onChange={(e) => updateField(i, 'defaultVal', e.target.value)} placeholder="Default" style={{ flex: 1, padding: '6px 10px', border: '1px solid #ddd', borderRadius: 6, fontSize: '0.8rem' }} />
                <button onClick={() => removeField(i)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#EF4444', fontSize: '1rem' }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontWeight: 600, color: '#333', marginBottom: 4, fontSize: '0.85rem' }}>HTML Template</label>
            <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: 4 }}>Use <code>{'{{fieldName}}'}</code> placeholders for content fields.</p>
            <textarea
              value={template}
              onChange={(e) => setTemplate(e.target.value)}
              rows={12}
              style={{
                width: '100%', padding: '10px 12px', border: '1px solid #ddd', borderRadius: 8,
                fontSize: '0.8rem', fontFamily: 'monospace', lineHeight: 1.5, resize: 'vertical',
              }}
            />
          </div>
        </div>

        <div style={{ padding: '12px 20px', borderTop: '1px solid #e0e0e0', display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
          <button onClick={onClose} style={{ padding: '8px 20px', border: '1px solid #ddd', borderRadius: 8, background: '#fff', cursor: 'pointer', fontSize: '0.85rem' }}>Cancel</button>
          <button onClick={handleSave} disabled={!name.trim() || !template.trim()} style={{
            padding: '8px 20px', border: 'none', borderRadius: 8,
            background: name.trim() && template.trim() ? '#2563EB' : '#ccc',
            color: '#fff', cursor: name.trim() && template.trim() ? 'pointer' : 'default',
            fontWeight: 600, fontSize: '0.85rem',
          }}>Save Block</button>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 3: Integrate into BlockLibrary**

In `src/components/shell/BlockLibrary.tsx`, add a "Create Block" button at the top of the library panel and a "Custom" category showing user-created blocks:

Add state:
```typescript
const [showEditor, setShowEditor] = useState(false)
const { project, saveCustomBlock } = useProjectStore()
```

Add import:
```typescript
import { BlockEditor } from './BlockEditor'
```

Add to the JSX, after the header:
```typescript
<button
  onClick={() => setShowEditor(true)}
  style={{ margin: '8px', padding: '6px 12px', border: '1px dashed #2563EB', borderRadius: 6, background: 'transparent', color: '#2563EB', cursor: 'pointer', fontSize: '0.8rem', width: 'calc(100% - 16px)' }}
>
  + Create Custom Block
</button>
```

Add after the curated category listings, a "Custom" section:
```typescript
{project && project.customBlocks.length > 0 && (
  <div className="bloxx-library__category">
    <div className="bloxx-library__category-title">Custom</div>
    {[...project.customBlocks].reverse().map((block) => (
      <div key={block.id} className="bloxx-library__block"
        draggable
        onDragStart={(e) => handleDragStart(e, block)}
      >
        <div className="bloxx-library__block-name">{block.name}</div>
        <div className="bloxx-library__block-desc">{block.description || 'Custom block'}</div>
      </div>
    ))}
  </div>
)}
```

And at the bottom of the return:
```typescriptx
{showEditor && <BlockEditor onClose={() => setShowEditor(false)} />}
```

- [ ] **Step 4: Verify TypeScript**

```bash
npx tsc -b --noEmit
```
Expected: Zero errors.

- [ ] **Step 5: Run tests**

```bash
npx vitest run
```
Expected: All 13 tests pass.

- [ ] **Step 6: Build check**

```bash
npx vite build 2>&1 | tail -5
```

- [ ] **Step 7: Commit**

```bash
git add -A && git commit -m "feat: add custom block editor with modal UI"
```

---

## Self-Review

**1. Spec coverage:**
- ✅ Block library expansion to 40+ blocks (Task 1)
- ✅ Free-form canvas mode with absolute positioning (Task 2)
- ✅ Custom block editor with schema fields and HTML template (Task 3)
- ✅ Custom blocks saved to project and draggable from library (Task 3)
- Δ External AI tool integration — deferred (more complex, needs structured context export format)
- Δ Undo/redo full coverage — already 50 ops from Phase 1
- Δ Block-level responsive overrides — deferred (needs breakpoint-aware UI)

**2. Placeholder scan:** No TBDs or TODOs.

**3. Type consistency:** All types from `src/types/index.ts` used consistently. `BlockDefinition`, `ContentSlot`, `BlockInstance` all match existing definitions.

**4. Gaps:**
- External AI tool integration deferred — requires designing a structured file export format for OpenCode/Claude Code/Kilo
- Block-level responsive overrides deferred — needs per-breakpoint style UI in the design system panel