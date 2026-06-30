# 🧱 Bloxx

**Wireframe → Design System → AI Polish → HTML Export**

Bloxx is a browser-based visual design tool for web and mobile designers. Drag blocks onto a canvas, define your design system, polish with AI, and export clean developer-ready HTML.

---

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:5173
```

---

## How to Use

### 1. Create or Open a Project

When you first open Bloxx, you'll see the **project selector** screen:

- **+ New Project** — Enter a name and click Create
- **Recent projects** — Click any project to resume editing
- **Import HTML** — Re-import a previously exported Bloxx HTML file

Your last project is automatically restored when you return.

### 2. Build Pages with Blocks

The **Block Library** (left sidebar) contains 37 pre-built blocks organized by category:

| Category | Blocks |
|---|---|
| Navigation | Simple navbar, Dropdown, Hamburger menu, Transparent |
| Hero & Sections | Centered, Left-aligned, Split, Gradient, Background image, Video |
| Features | 3-column grid, 2-column alternating, Tabs, Accordion, Icon grid, Side-by-side |
| Pricing | 3-tier, 4-tier, Monthly/yearly toggle, Enterprise |
| Call to Action | Simple, Split, Newsletter, Banner, Modal trigger |
| Content | Testimonials, FAQ, Team grid, Contact form, Timeline, Stats, Logo cloud |
| Footer | Simple, Multi-column, Social links, Minimal |

**To add a block:**
1. Browse or search the block library
2. Drag a block onto the canvas
3. It appears at the bottom of your page stack

**To change a block's variant:**
- Each block has 2-3 layout variants (e.g., Hero → Centered, Left-aligned, Split)
- Variants are swappable via the block's controls

**To reorder blocks:**
- Drag the block up or down in the stack

### 3. Edit Content

**Text:** Double-click any text element with a blue highlight to edit it inline. Press Enter to save or Escape to cancel.

**Images:** Click on an image placeholder to upload an image from your computer. Images are stored as data URLs.

### 4. Design System

Switch to the **Design** panel (left sidebar toggle: 🧱 Blocks / 🎨 Design) to edit design tokens:

| Category | What You Can Edit |
|---|---|
| Colors | Primary, secondary, accent, background, text, borders, semantic colors |
| Typography | Font families, heading sizes, body size, font weights |
| Spacing | Section padding, container width, gap, spacing scale |
| Borders | Border radius scale (none → full rounded) |
| Shadows | Small, medium, large shadow values |

**To apply changes:** Click the "Apply Changes" button. Tokens cascade to the canvas in real-time.

### 5. AI Chat

The **AI Chat** panel (right sidebar) has two modes:

**🎨 Properties Mode:**
- Select an element on the canvas
- See its editable properties (variant, size, alignment, etc.)
- Changes apply instantly — no AI needed

**🤖 Prompt Mode:**
1. Configure your API key (⚙️ button) — supports OpenAI and Anthropic
2. Select an element on the canvas
3. Type a prompt like "Make this button blue" or "Change the heading to be larger and bolder"
4. Press Enter or click Send
5. The AI returns structured changes and applies them

**BYOK (Bring Your Own Key):** Your API key is stored in your browser's localStorage. It's never sent anywhere except directly to your chosen AI provider.

### 6. Preview

- **👁 Preview** — Fullscreen preview with no editing chrome. Switch between Desktop, Tablet, and Mobile.
- **↗ New Tab** — Opens the current page as a standalone HTML file in a new tab. Inspect with DevTools, screenshot, or share the URL.
- **📱 Viewport Switcher** (in toolbar) — Desktop (1440px), Tablet (768px), Mobile (375px) with device frame visuals.

### 7. Free-Form Mode

Toggle **✂️ Free-Form** in the toolbar to switch from stacked layout to absolute positioning. In free-form mode:
- Blocks can be dragged anywhere on the canvas
- Resize handles appear on selected blocks
- Use for custom layouts that don't follow the vertical stack

### 8. Custom Blocks

Click **+ Create Custom Block** in the Block Library to define your own:
1. **Name** — What to call your block
2. **Content Fields** — Define placeholders (e.g., heading, description)
3. **HTML Template** — Write HTML with `{{fieldName}}` placeholders
4. **Save** — Your custom block appears in the "Custom" category and is draggable like any other block

Custom blocks are saved with your project.

### 9. Multi-Page

Use the **page tabs** bar (below the toolbar) to manage multiple pages:
- **Click a tab** to switch pages
- **✕** to delete a page (only when multiple pages exist)
- **+ Add Page** to create a new blank page

### 10. Export

Click **📦 Export** in the toolbar to download your project as a ZIP file:

```
project-name/
├── index.html           # Your page (or page name)
├── about.html           # Additional pages
├── css/
│   ├── design-system.css   # All design tokens as CSS variables
│   └── components.css      # Button, card, input component styles
└── assets/
```

**With "Include Bloxx metadata" checked**, the HTML includes `data-bloxx-*` attributes so you can re-import the file later for further editing.

### 11. Import

On the project selector screen, click **📂 Import HTML** and select a previously exported `.html` file. Bloxx scans the metadata attributes and reconstructs the project.

### 12. Undo/Redo

- **↩ Undo** (Ctrl+Z) — Undo the last action (up to 50 steps)
- **↪ Redo** (Ctrl+Shift+Z) — Redo a previously undone action

---

## Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Escape` | Deselect element / Exit edit mode |
| `Enter` | Save inline text edit |
| `Ctrl/Cmd+Shift+P` | Open preview in new tab |

---

## Architecture

Bloxx uses a **sandboxed canvas architecture**:

```
App Shell (React + Zustand)
    │
    ├── Toolbar, Panels, AI Chat Widget
    │
    ├── Canvas Iframe (same-origin)
    │   └── Stateless renderer via postMessage
    │
    └── Data Layer (IndexedDB via Dexie.js)
```

- The **shell** manages all state, AI, and UI
- The **canvas iframe** is a lightweight (6 kB) renderer that receives instructions via postMessage
- All data persists locally in **IndexedDB** — no account required

---

## Project Structure

```
src/
├── blocks/              # 37 block definitions by category
├── canvas/              # Canvas iframe renderer
│   ├── index.html       # Iframe entry point
│   ├── canvas.ts        # Message handler + renderer
│   └── canvas.css       # Reset + block styles
├── components/
│   ├── canvas/          # CanvasContainer, FloatingWidget, PreviewBar
│   ├── common/          # ErrorBoundary, Icon, LoadingSpinner
│   └── shell/           # Toolbar, BlockLibrary, DesignSystemPanel,
│                        # AIChatWidget, BlockEditor, ExportDialog, PageTabs
├── data/                # IndexedDB database + project CRUD
├── lib/                 # Utilities: token compiler, component styles,
│                       # AI providers, context builder, response parser,
│                       # undo/redo, export service, import service
├── store/               # Zustand stores
│   ├── projectStore.ts       # Project state + block operations
│   ├── canvasStore.ts        # UI state (viewport, mode, selection)
│   ├── designTokensStore.ts  # Design tokens editing
│   └── aiStore.ts           # AI provider config + chat state
└── types/               # All TypeScript interfaces
```

---

## Technology

| Layer | Tech |
|---|---|
| Framework | React 18+ |
| Build | Vite + TypeScript |
| State | Zustand |
| Persistence | Dexie.js (IndexedDB) |
| Canvas | Same-origin iframe + postMessage |
| AI | OpenAI / Anthropic (BYOK) |
| Export | JSZip |
| Testing | Vitest |

---

## Development

```bash
# Install
npm install

# Dev server
npm run dev

# Run tests
npm test

# TypeScript check
npx tsc -b --noEmit

# Production build
npm run build

# Preview production build
npm run preview
```