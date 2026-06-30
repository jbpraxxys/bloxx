# Polish & Refinement Implementation Plan

**Goal:** Clean up technical debt, improve UX, add missing features (image upload, multi-page management, session recovery), and refactor large files.

**Architecture:** Split the monolithic `curated.ts` into category modules. Add image upload via FileReader/URL.createObjectURL. Add page tabs for multi-page management. Improve error handling and loading states throughout.

---

### Task 1: Split curated.ts into Category Files

**Problem:** `curated.ts` is 2,000+ lines, 117 kB in the build. Every change touches this one file.

**Solution:** Split into one file per category, re-export from an index.

**Files:**
- Create: `src/blocks/navigation.ts`
- Create: `src/blocks/hero.ts`
- Create: `src/blocks/features.ts`
- Create: `src/blocks/pricing.ts`
- Create: `src/blocks/cta.ts`
- Create: `src/blocks/testimonials.ts`
- Create: `src/blocks/faq.ts`
- Create: `src/blocks/footer.ts`
- Create: `src/blocks/content.ts`
- Create: `src/blocks/misc.ts`
- Create: `src/blocks/index.ts` (re-export all)
- Remove: `src/blocks/curated.ts` (or keep as backward-compat re-export)

**How:**
1. Read `curated.ts`
2. Extract each category's blocks into its own file
3. Create `index.ts` that imports and re-exports all as `curatedBlocks`
4. Update all imports from `'../../blocks/curated'` to `'../../blocks'`

- [ ] **Step 1: Create category files**

Each file follows this pattern:
```typescript
// src/blocks/navigation.ts
import type { BlockDefinition } from '../types'

export const navigationBlocks: BlockDefinition[] = [
  // ... blocks with category: 'navigation'
]
```

- [ ] **Step 2: Create index.ts**

```typescript
import { navigationBlocks } from './navigation'
import { heroBlocks } from './hero'
import { featuresBlocks } from './features'
import { pricingBlocks } from './pricing'
import { ctaBlocks } from './cta'
import { testimonialsBlocks } from './testimonials'
import { faqBlocks } from './faq'
import { footerBlocks } from './footer'
import { contentBlocks } from './content'
import { miscBlocks } from './misc'

export const curatedBlocks: BlockDefinition[] = [
  ...navigationBlocks,
  ...heroBlocks,
  ...featuresBlocks,
  ...pricingBlocks,
  ...ctaBlocks,
  ...testimonialsBlocks,
  ...faqBlocks,
  ...footerBlocks,
  ...contentBlocks,
  ...miscBlocks,
]
```

- [ ] **Step 3: Update imports**

Find all files importing from `'../../blocks/curated'` or `'../blocks/curated'` and change to `'../../blocks'` or `'../blocks'`.

Files to update:
- `src/blocks/curated.ts` — keep as re-export for backward compat: `export { curatedBlocks } from './index'`
- `src/components/shell/BlockLibrary.tsx`
- `src/canvas/canvas.ts`
- `src/components/shell/ExportDialog.tsx`

- [ ] **Step 4: Verify TypeScript + build**

```bash
npx tsc -b --noEmit && npx vite build 2>&1 | tail -3
```

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "refactor: split curated.ts into 10 category files"
```

---

### Task 2: Image Upload for Content Slots

**Problem:** Content slots support `type: 'image'` but there's no way to upload images.

**Solution:** Add image upload to the double-click content editing flow and a simple image picker.

**Files:**
- Modify: `src/canvas/canvas.ts` (add image upload handling)
- Modify: `src/store/projectStore.ts` (add image management)

**How:**
1. When a user clicks an image element in the canvas, show a file picker
2. On file select, read the image as data URL and update the content slot
3. Store images as `content.image_{slotName}` data URLs in the block instance

- [ ] **Step 1: Add image click handler to canvas.ts**

After the double-click handler, add an image click handler:
```typescript
// ─── Image click → upload ────────────────────────────
canvasEl.addEventListener('click', (e) => {
  const img = (e.target as HTMLElement).closest('[data-bloxx-slot][data-bloxx-type="image"]') as HTMLElement | null
  if (!img) return

  // Create a hidden file input
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = 'image/*'
  input.onchange = () => {
    const file = input.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = reader.result as string
      const blockEl = img.closest('.bloxx-block') as HTMLElement
      const blockIndex = parseInt(blockEl.dataset.blockIndex ?? '-1', 10)
      const slotName = img.dataset.bloxxSlot

      if (slotName) {
        // Update the image src
        const imgEl = img as HTMLImageElement
        imgEl.src = dataUrl

        // Notify shell
        window.parent.postMessage({
          type: 'CONTENT_EDITED',
          blockIndex,
          slotName,
          value: dataUrl,
        }, '*')
      }
    }
    reader.readAsDataURL(file)
  }
  input.click()
})
```

- [ ] **Step 2: Commit**

```bash
git add -A && git commit -m "feat: add image upload for content slot images"
```

---

### Task 3: Multi-Page Management

**Problem:** Only one page is visible at a time. Users can't add/switch/rename pages.

**Solution:** Add a page tabs bar above the canvas area for managing multiple pages.

**Files:**
- Create: `src/components/shell/PageTabs.tsx`
- Modify: `src/store/projectStore.ts` (add currentPageId)
- Modify: `src/store/canvasStore.ts` (add currentPageId)
- Modify: `src/App.tsx` (add page tabs)

- [ ] **Step 1: Add currentPageId to canvasStore**

Add to state:
```typescript
  currentPageId: string | null
  setCurrentPage: (pageId: string) => void
```

Initialize `currentPageId` to `null`.

Add:
```typescript
  setCurrentPage: (pageId) => set({ currentPageId: pageId }),
```

- [ ] **Step 2: Create PageTabs component**

Write `src/components/shell/PageTabs.tsx`:
```typescript
import React from 'react'
import { useProjectStore } from '../../store/projectStore'
import { useCanvasStore } from '../../store/canvasStore'

export const PageTabs: React.FC = () => {
  const { project, addPage, removePage, saveProject } = useProjectStore()
  const { currentPageId, setCurrentPage, editorMode } = useCanvasStore()

  if (editorMode !== 'edit' || !project) return null

  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 4,
      padding: '4px 12px', background: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0', overflow: 'auto',
    }}>
      {project.pages.map((page) => (
        <div key={page.id} style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '4px 12px', borderRadius: '6px 6px 0 0',
          background: (currentPageId ?? project.pages[0]?.id) === page.id ? '#fff' : 'transparent',
          border: '1px solid',
          borderColor: (currentPageId ?? project.pages[0]?.id) === page.id ? '#e0e0e0' : 'transparent',
          borderBottom: (currentPageId ?? project.pages[0]?.id) === page.id ? '1px solid #fff' : 'transparent',
          cursor: 'pointer', fontSize: '0.8rem', marginBottom: -1,
        }}
          onClick={() => setCurrentPage(page.id)}
        >
          <span>{page.name}</span>
          {project.pages.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); removePage(page.id) }}
              style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: '#999', padding: 0, fontSize: '0.8rem' }}
            >✕</button>
          )}
        </div>
      ))}
      <button
        onClick={() => {
          const name = `Page ${project.pages.length + 1}`
          addPage(name)
          // Set the new page as current
          const newPage = project.pages[project.pages.length - 1]
          if (newPage) setCurrentPage(newPage.id)
        }}
        style={{ padding: '4px 10px', border: '1px dashed #ccc', borderRadius: 4, background: 'transparent', cursor: 'pointer', fontSize: '0.75rem', color: '#888' }}
      >+</button>
    </div>
  )
}
```

- [ ] **Step 3: Integrate PageTabs in App.tsx**

Add import and render `<PageTabs />` between `<Toolbar />` and `<div className="bloxx-main">`.

- [ ] **Step 4: Update CanvasContainer to use currentPage**

In `CanvasContainer.tsx`, use `currentPageId` from canvasStore to select which page to render.

- [ ] **Step 5: Commit**

```bash
git add -A && git commit -m "feat: add multi-page management with page tabs"
```

---

### Task 4: Session Recovery + UI Polish

**Problem:** No auto-restore of last project. Empty/loading/error states are minimal.

**Solution:** Add session recovery (save last project ID to localStorage), improve empty states, add loading spinners, and add error boundaries.

**Files:**
- Create: `src/components/common/ErrorBoundary.tsx`
- Modify: `src/App.tsx` (add session recovery)
- Modify: Various components (loading states)

- [ ] **Step 1: Add session recovery**

In `src/App.tsx`, add on project load:
```typescript
  // Session recovery: auto-load last project
  useEffect(() => {
    const lastProjectId = localStorage.getItem('bloxx-last-project')
    if (lastProjectId && projects.length > 0) {
      const exists = projects.find((p) => p.id === lastProjectId)
      if (exists) {
        loadProject(lastProjectId)
      }
    }
  }, [projects, loadProject])
```

When a project is created/loaded, save its ID:
```typescript
  // After creating or loading a project:
  localStorage.setItem('bloxx-last-project', project.id)
```

Add this to both `handleCreateProject` and `handleSelectProject`.

- [ ] **Step 2: Create ErrorBoundary**

Write `src/components/common/ErrorBoundary.tsx`:
```typescript
import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, ErrorBoundaryState> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24, textAlign: 'center' }}>
          <h3>Something went wrong</h3>
          <p style={{ color: '#888', fontSize: '0.85rem' }}>{this.state.error?.message}</p>
          <button
            onClick={() => this.setState({ hasError: false, error: null })}
            style={{ marginTop: 12, padding: '8px 20px', background: '#2563EB', color: '#fff', border: 'none', borderRadius: 8, cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
```

Wrap the main app content in `ErrorBoundary` in `src/main.tsx`.

- [ ] **Step 3: Add loading spinner component**

Create `src/components/common/LoadingSpinner.tsx`:
```typescript
import React from 'react'

export const LoadingSpinner: React.FC<{ size?: number; message?: string }> = ({ size = 32, message }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 48 }}>
    <div style={{
      width: size, height: size,
      border: '3px solid #e0e0e0', borderTopColor: '#2563EB',
      borderRadius: '50%', animation: 'bloxx-spin 0.8s linear infinite',
    }} />
    {message && <p style={{ marginTop: 16, color: '#888', fontSize: '0.85rem' }}>{message}</p>}
    <style>{`@keyframes bloxx-spin { to { transform: rotate(360deg); } }`}</style>
  </div>
)
```

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "feat: add session recovery, error boundary, and loading spinner"
```

---

### Task 5: Performance Optimizations

**Problem:** No component memoization, everything re-renders on any state change.

**Solution:** Add React.memo to heavy components, use selectors to prevent unnecessary re-renders.

- [ ] **Step 1: Memoize CanvasContainer**

Wrap `CanvasContainer` export with `React.memo`.

- [ ] **Step 2: Memoize BlockLibrary**

Wrap `BlockLibrary` export with `React.memo`.

- [ ] **Step 3: Use granular Zustand selectors**

In components that use `useProjectStore` without selectors, change to granular selectors:
```typescript
// Instead of:
const { project } = useProjectStore()

// Use:
const project = useProjectStore((s) => s.project)
```

This prevents re-renders when unrelated state changes.

- [ ] **Step 4: Commit**

```bash
git add -A && git commit -m "perf: add React.memo and granular Zustand selectors"
```

---

## Self-Review

- ✅ curated.ts split into 10 category files (Task 1)
- ✅ Image upload for content slots (Task 2)
- ✅ Multi-page management with tabs (Task 3)
- ✅ Session recovery (Task 4)
- ✅ Error boundary (Task 4)
- ✅ Loading spinner (Task 4)
- ✅ Performance optimizations (Task 5)