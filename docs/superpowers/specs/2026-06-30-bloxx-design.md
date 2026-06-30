# Bloxx — Product Specification

> **Version:** 1.0  
> **Date:** 2026-06-30  
> **Status:** Draft  
> **Target Audience:** Web & mobile designers  

---

## 1. Product Overview

Bloxx is a browser-based visual design tool that lets designers wireframe pages using pre-built and custom block components, define a design system, polish the output with AI, and export clean, developer-ready HTML. It bridges the gap between wireframing (like Relume) and production code — with AI as the styling engine.

**Tagline:** *Wireframe → Design System → AI Polish → HTML Export*

---

## 2. Key Decisions

| Decision | Choice | Rationale |
|---|---|---|
| **Platform** | Web-first (PWA), Electron wrapper in Phase 2 | Faster iteration, instant access for designers |
| **Architecture** | Sandboxed Canvas (iframe + postMessage) | Performance isolation, clean separation, natural Electron path |
| **Block Library** | Hybrid: curated starter library (30-50 blocks) + user-custom blocks | Speed of getting started + flexibility |
| **Canvas Default** | Page-builder vertical stacking | Rapid wireframing; free-form mode available |
| **Design System** | Manual token creation via visual UI panel | Designer control over brand identity |
| **AI Integration** | Hybrid: in-app chat + multi-tool support (OpenCode, Claude Code, Kilo) + BYOK | Flexibility, no vendor lock-in |
| **Element Editing** | Role-aware floating widget near element | Context-sensitive, intuitive |
| **Chat Widget** | Mode toggle: "Properties" tab (structured) / "Prompt" tab (AI) | Covers both quick edits and creative changes |
| **Variants** | Swappable HTML templates per block, preserving custom content | Quick visual exploration without data loss |
| **Project Storage** | IndexedDB local-first; optional cloud sync later | Offline-capable, no account required |
| **Export** | Structured folder (HTML + CSS + JS + assets) + Bloxx-compatible metadata | Dev-ready + re-importable |
| **Preview** | Built-in viewport switcher + fullscreen/new-tab preview mode | Distraction-free design review without leaving editor |

---

## 3. System Architecture

### 3.1 High-Level Diagram

```
┌──────────────────────────────────────────────────────────┐
│                   APP SHELL (React/Vue)                    │
│                                                           │
│  ┌──────────────┐  ┌───────────┐  ┌────────────────────┐ │
│  │  Toolbar      │  │  Panels   │  │  AI Chat Widget    │ │
│  │  (add blocks, │  │  (layers, │  │  (Props | Prompt   │ │
│  │   undo/redo,  │  │   blocks  │  │   toggle, 🎯       │ │
│  │   preview,    │  │   library)│  │   pointer, BYOK)   │ │
│  │   export)     │  │           │  │                    │ │
│  └──────────────┘  └───────────┘  └────────────────────┘ │
│                                                           │
│  ┌───────────────────────────────────────────────────┐   │
│  │         CANVAS IFRAME (same-origin)                │   │
│  │  ┌─────────────────────────────────────────────┐  │   │
│  │  │  Page Renderer (HTML/CSS block stacking)     │  │   │
│  │  │  Selection System (hover → outline, click)   │  │   │
│  │  │  Floating Widget Positioning (bounding rect) │  │   │
│  │  │  Block Reorder (drag handles)                │  │   │
│  │  └─────────────────────────────────────────────┘  │   │
│  └───────────────────────────────────────────────────┘   │
│                                                           │
│  ┌──────────────┐  ┌───────────────┐  ┌────────────────┐ │
│  │  Design Sys  │  │  Block Lib    │  │  Export        │ │
│  │  Editor      │  │  Manager      │  │  Pipeline      │ │
│  │  (tokens →   │  │  (curated +   │  │  (HTML gen +   │ │
│  │   CSS vars)  │  │   custom)     │  │   metadata)    │ │
│  └──────────────┘  └───────────────┘  └────────────────┘ │
└──────────────────────────────────────────────────────────┘
                            │ postMessage
┌──────────────────────────────────────────────────────────┐
│                   DATA LAYER                              │
│  ┌──────────────┐  ┌─────────────┐  ┌──────────────────┐ │
│  │  Project     │  │  Block      │  │  Design System   │ │
│  │  Store       │  │  Library    │  │  Token Store     │ │
│  │  (page +     │  │  (defs +    │  │  (colors, type,  │ │
│  │   blocks)    │  │   variants) │  │   spacing, etc)  │ │
│  └──────────────┘  └─────────────┘  └──────────────────┘ │
│                                                           │
│  ┌────────────────────────────────────────────────────┐  │
│  │  IndexedDB (persistence — auto-save, debounced)    │  │
│  │  Projects │ Block Library │ Design Tokens │ Config │  │
│  └────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────┘
```

### 3.2 Communication Protocol

All shell ↔ canvas communication uses a typed `postMessage` protocol:

| Direction | Message Type | Payload |
|---|---|---|
| Shell → Canvas | `RENDER` | `{ page, tokens }` — Full page render |
| Shell → Canvas | `UPDATE_BLOCK` | `{ blockIndex, variantId?, content?, overrides? }` |
| Shell → Canvas | `UPDATE_DESIGN_TOKENS` | `{ tokens }` — Re-inject CSS variables |
| Shell → Canvas | `SWAP_VARIANT` | `{ blockIndex, variantId }` |
| Shell → Canvas | `SET_SELECTION` | `{ blockIndex, elementPath? }` |
| Shell → Canvas | `REORDER_BLOCKS` | `{ fromIndex, toIndex }` |
| Shell → Canvas | `TOGGLE_MODE` | `{ mode: "stack" | "freeform" }` |
| Canvas → Shell | `ELEMENT_SELECTED` | `{ blockIndex, elementRole, elementPath, boundingRect, variantId, blockId }` |
| Canvas → Shell | `ELEMENT_HOVERED` | `{ blockIndex, elementRole, boundingRect }` |
| Canvas → Shell | `BLOCK_REORDERED` | `{ fromIndex, toIndex }` |
| Canvas → Shell | `RENDERED` | `{ blockCount }` |
| Canvas → Shell | `SCROLL` | `{ scrollTop, scrollLeft }` |
| Canvas → Shell | `WIDGET_ACTION` | `{ action: "close" | "escape" }` |

### 3.3 Architecture Rules

- **Canvas is stateless** — it only renders what it's told. All state lives in the shell's data layer.
- **Design system flows forward** — tokens → CSS variables → component styles. Changes cascade automatically.
- **Export is a derivation** — the pipeline reads project state and generates HTML. It never modifies the project.
- **AI is a plugin** — the AI Engine is provider-agnostic. All providers implement the same interface.

---

## 4. Component Block System

### 4.1 Block Definition

```typescript
interface BlockDefinition {
  id: string;                        // unique semantic ID (e.g., "hero")
  name: string;                      // display name (e.g., "Hero Section")
  category: "sections" | "features" | "pricing" | "cta" | "navigation" | "footer" | "content" | "custom";
  description: string;
  schema: Record<string, ContentSlot>; // editable content slots
  defaultVariant: string;
  variants: VariantDefinition[];
  source: "curated" | "custom";
}

interface ContentSlot {
  type: "text" | "image" | "url" | "icon" | "richtext";
  default: string | null;
  label: string;
}

interface VariantDefinition {
  id: string;
  name: string;
  template: string;                  // HTML template with {{placeholder}} slots
  thumbnail?: string;                // base64 preview
}
```

### 4.2 Content Slots

Content slots are the fields the user can edit within a block. They map to `{{placeholder}}` markers in the variant template:

```html
<section class="hero hero--centered">
  <h1>{{headline}}</h1>
  <p>{{subtitle}}</p>
  <a href="{{cta_url}}" class="btn btn--solid">{{cta_text}}</a>
</section>
```

When the user switches variant, the system re-renders the template with the same content field values.

### 4.3 Variant System

- Each block has 1-10 variants (different layout arrangements of the same semantic content)
- Switching a variant replaces the block's HTML template but preserves content
- Variants are pre-authored HTML templates with `{{placeholder}}` interpolation
- Each variant has a thumbnail for visual browsing in the block library panel

### 4.4 Curated Starter Library

Initial blocks (target: 30-50), organized by category:

| Category | Block Examples | Variants per Block |
|---|---|---|
| **Navigation** | Navbar (logo + links), Hamburger nav, Sticky nav, Transparent nav, Mega menu | 3-5 |
| **Hero** | Left-aligned, Centered, Split screen, Full-screen overlay, Video hero, Gradient hero | 5-8 |
| **Features** | 3-column grid, 2-column alternating, Single feature highlight, Icon grid, Tabs, Accordion | 4-6 |
| **Pricing** | 3-tier, 4-tier, Tier with toggle (monthly/yearly), Feature comparison table | 3-5 |
| **CTA** | Simple CTA, Split CTA, Newsletter signup, Banner CTA, Modal trigger | 4-6 |
| **Testimonials** | Single quote, Carousel, Grid of cards, Side-by-side (photo + quote) | 3-5 |
| **FAQ** | Accordion, Two-column list, Searchable FAQ | 2-3 |
| **Footer** | Simple links, Multi-column, Newsletter + links, Minimal | 3-4 |
| **Content** | Rich text, Two-column text, Image + text, Stats/counter | 3-4 |
| **Misc** | Logo cloud, Team grid, Contact form, Schedule/demo | 2-3 |

### 4.5 Custom Blocks

- Users create blocks through a block editor: define schema fields, write HTML template with `{{placeholder}}` markers, set variant(s)
- Custom blocks are saved to IndexedDB and appear alongside curated blocks in the library panel
- Users can duplicate curated blocks and modify them as custom

### 4.6 Page Assembly

A page is an ordered array of block instances:

```typescript
interface BlockInstance {
  id: string;
  blockId: string;
  variantId: string;
  content: Record<string, any>;
  overrides: StyleOverride[];
  position?: { x: number; y: number; width: number; height: number };  // free-form mode
}
```

Building a page: drag blocks from the library panel into the canvas. They stack vertically. Drag to reorder. Each block's content is edited via the floating widget or inline.

---

## 5. Canvas Engine

### 5.1 Architecture

The canvas runs in a **same-origin sandboxed iframe**. It has a single responsibility: render the page and report user interactions. It does not store state, manage the design system, or handle AI.

### 5.2 Iframe Setup

- Injected with: CSS reset, design system CSS variables on `:root`, page HTML in `<div id="bloxx-canvas">`
- Configurable viewport widths: 1440px (desktop), 768px (tablet), 375px (mobile)
- `overflow: auto` for scrolling long pages

### 5.3 Rendering Pipeline

```
Project state changes in shell
  → Shell serializes page + design tokens into RENDER message
  → Canvas receives message
  → Canvas applies design tokens as CSS variables on :root
  → Canvas renders each block's variant template with content interpolated
  → Canvas injects overrides as inline styles
  → Canvas sends RENDERED confirmation to shell
```

### 5.4 Selection System

- **Hover**: Light blue outline appears on block boundaries. Block name tooltip shown at top edge.
- **Click**: Block gets a 2px blue selection border. Canvas sends `ELEMENT_SELECTED` with element path, role, and bounding rect.
- **Deep selection**: If user clicks inside a block (e.g., a button), the canvas identifies the sub-element and sends a deeper path (e.g., `page.blocks[2].button[0]`).
- **Deselection**: Click on empty canvas area or press Escape.

### 5.5 Block Reordering

- Each block has a drag handle on its left edge (visible on hover)
- Drag up/down to reorder within the stack
- On drop, canvas sends `BLOCK_REORDERED` message; shell updates the data layer and re-renders

### 5.6 Floating Widget Positioning

- When an element is selected, the iframe sends its bounding rect (relative to iframe viewport)
- Shell positions the floating widget at a fixed offset (top-right of selection)
- Widget position updates on scroll/resize via `SCROLL` messages + IntersectionObserver
- Widget is rendered by the **shell**, not the iframe — z-index above the canvas

### 5.7 Free-Form Mode

- Toggle in the toolbar switches between "Stack" (default) and "Free-Form" mode
- In free-form mode:
  - Blocks lose vertical stacking constraint
  - Each block gets position (x, y) and size (width, height) controls
  - Blocks use absolute positioning
  - Blocks can overlap and be layered (z-index management)
  - Grid snap alignment available

### 5.8 Responsive Preview

The responsive preview is built into the editor — the canvas iframe itself changes width to simulate different devices. This lets users edit and see responsiveness in real-time without switching modes.

#### Viewport Switcher (Toolbar)

A device toggle group in the toolbar with visual icons:

```
[ 🖥️ Desktop ] [ 📱 Tablet ] [ 📱 Mobile ]
```

| Device | Width | Notes |
|---|---|---|
| **Desktop** | 1440px | Default. Shows full page width with centered canvas. Gray background outside canvas. |
| **Tablet** | 768px | iPad portrait width. Canvas centers with gutters. |
| **Mobile** | 375px | iPhone width. Canvas centers with gutters. Stack mode blocks may reflow. |

#### Device Frame Visual

Each viewport mode wraps the canvas iframe in a subtle device frame:
- **Desktop**: No frame, full-width preview with a drop shadow
- **Tablet**: Rounded corners on the iframe container, subtle device bezel (thin gray border)
- **Mobile**: Taller rounded bezel, status bar simulated at top (thin black bar with time/battery dots)

The frame is purely visual — it doesn't affect the rendered page.

#### Interaction

- Switching viewport does **not** reload the page — the iframe simply gets a new width, and CSS media queries / fluid layouts reflow naturally
- Design system tokens include breakpoint definitions (sm, md, lg) for future media-query-aware overrides
- Users can edit in any viewport — changes apply across all breakpoints

### 5.9 Preview Mode (Fullscreen / New Tab)

The Preview Mode provides a clean, editing-free view of the page — no toolbars, no panels, no floating widgets. It's how the page will look when exported.

#### Activation

Preview can be activated in two ways:

1. **In-editor fullscreen**: A "Preview" button in the toolbar toggles the editor into fullscreen preview mode. The canvas iframe expands to fill the entire browser viewport. Toolbar collapses to a small floating bar with: `[ Exit Preview ] [ Desktop | Tablet | Mobile ]`.
2. **New tab**: A "Open in new tab" option in the Preview menu (or Ctrl/Cmd+Shift+P) opens the rendered page in a new browser tab. This tab contains a standalone HTML document with all current design tokens and blocks rendered — no Bloxx UI whatsoever. It's identical to what the exported HTML will look like.

#### What Preview Shows

- The page as it currently exists in the editor (all blocks, current variants, current content)
- Design tokens applied as CSS variables
- All style overrides applied
- No selection outlines, no drag handles, no floating widgets
- No Bloxx chrome/UI

#### Preview Interaction

- In fullscreen preview: click anywhere to exit, or use the floating bar to switch viewports
- In new tab preview: it's a completely normal HTML page — inspect with DevTools, share the URL (temporary), screenshot it, etc.
- Closing the new tab returns to the editor unchanged

#### Use Cases

- **Client demo**: Show the page cleanly without editing chrome
- **Design review**: Spot visual issues before export
- **Responsive check**: Switch viewports quickly in a distraction-free view
- **Export preview**: See exactly what the exported HTML will look like

---

## 6. Design System

### 6.1 Token Categories

The design system is defined through a visual editor with these categories:

**Colors:**
- Core: primary, secondary, accent
- Neutral: background, foreground, muted, border, card
- Semantic: success, warning, error, info
- Surface variants: nav, footer, hero-overlay
- Each color auto-generates hover/active/light/dark variants

**Typography:**
- Font families (body + headings)
- Font size scale (base, h1-h6, small, caption)
- Font weight scale (regular, medium, semibold, bold)
- Line height scale (tight, normal, relaxed)
- Letter spacing

**Spacing:**
- Numeric scale: 0, 4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px
- Semantic: section-padding, container-max-width, gap-default, content-max-width

**Borders:**
- Radius scale: none, sm, md, lg, xl, full
- Width scale: none, thin, medium, thick

**Shadows:**
- Scale: sm, md, lg, xl
- Each with configurable offset, blur, spread, color + opacity

### 6.2 Token → CSS Variable Generation

Tokens compile to CSS custom properties:

```css
:root {
  --color-primary: #2563EB;
  --color-primary-hover: #1D4ED8;
  --color-primary-light: #DBEAFE;
  --color-secondary: #7C3AED;
  --color-background: #FFFFFF;
  --color-foreground: #0F172A;
  --color-muted: #F1F5F9;
  --color-border: #E2E8F0;
  --color-card: #FFFFFF;
  --color-success: #10B981;
  --color-warning: #F59E0B;
  --color-error: #EF4444;

  --font-sans: 'Inter', sans-serif;
  --font-heading: 'Inter', sans-serif;
  --font-size-base: 16px;
  --font-size-h1: 48px;
  --font-size-h2: 36px;
  --font-size-h3: 24px;
  --font-size-h4: 20px;
  --font-size-h5: 16px;
  --font-size-h6: 14px;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;

  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-2: 8px;
  --spacing-3: 12px;
  --spacing-4: 16px;
  --spacing-5: 24px;
  --spacing-6: 32px;
  --spacing-7: 48px;
  --spacing-8: 64px;
  --spacing-9: 96px;
  --spacing-section: var(--spacing-9);
  --container-max-width: 1200px;

  --radius-none: 0;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;

  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
}
```

### 6.3 Component Variant Styles

From design system tokens, common components get auto-generated style classes:

**Buttons:**
| Variant | Background | Text | Border |
|---|---|---|---|
| `solid` | var(--color-primary) | white | transparent |
| `outline` | transparent | var(--color-primary) | var(--color-primary) |
| `ghost` | transparent | var(--color-primary) | transparent |
| `dull` | var(--color-muted) | var(--color-foreground) | transparent |

Sizes: `sm` (8px 16px), `md` (12px 24px), `lg` (16px 32px)

**Input Fields:**
| Variant | Background | Border | Text |
|---|---|---|---|
| `default` | var(--color-background) | var(--color-border) | var(--color-foreground) |
| `focused` | var(--color-background) | var(--color-primary) + ring | var(--color-foreground) |
| `error` | var(--color-error)/5 | var(--color-error) | var(--color-foreground) |

**Cards:**
| Variant | Background | Border | Shadow |
|---|---|---|---|
| `bordered` | var(--color-card) | var(--color-border) | none |
| `elevated` | var(--color-card) | none | var(--shadow-md) |
| `flat` | var(--color-muted) | none | none |

### 6.4 Style Overrides (Per-Instance)

Users can override design system values on individual block instances via the floating widget. Overrides are stored as CSS property → value pairs scoped to a selector within the block:

```typescript
interface StyleOverride {
  selector: string;              // e.g., ".hero" or ".btn"
  properties: Record<string, string>; // e.g., { "background": "linear-gradient(...)", "padding": "var(--spacing-8)" }
}
```

Overrides don't modify design system tokens — they apply on top. Users can "reset to design system" to clear all overrides on a block.

---

## 7. AI Integration

### 7.1 AI Chat Widget

The chat widget has two modes, toggled by tabs:

| Properties Tab | Prompt Tab |
|---|---|
| Structured controls per element role | Free text input |
| Color pickers, variant selectors, spacing sliders | Element context shown ("Editing: Hero [Button #2]") |
| Changes apply instantly | AI processes request and applies modifications |
| No AI call needed | Provider configurable |

### 7.2 Element Context for Prompting

When a user selects an element and switches to Prompt mode, the system builds a structured context:

```json
{
  "task": "modify_element",
  "selectedElement": {
    "blockIndex": 2,
    "blockId": "hero",
    "variantId": "centered",
    "elementRole": "button",
    "elementIndex": 0,
    "currentHtml": "<a href='#' class='btn btn--solid'>Get Started</a>",
    "currentStyles": {
      "backgroundColor": "var(--color-primary)",
      "color": "white",
      "borderRadius": "var(--radius-md)"
    }
  },
  "designTokens": {
    "primary": "#2563EB",
    "secondary": "#7C3AED",
    "fontSans": "'Inter', sans-serif",
    "radiusMd": "8px"
  },
  "pageContext": {
    "pageName": "Landing Page",
    "blockCount": 12
  },
  "userPrompt": "Make this button more prominent"
}
```

### 7.3 🎯 Pointer Selection

A "pointer" button (🎯) in the chat widget activates canvas selection mode:
1. User clicks 🎯 → cursor changes to crosshair on canvas
2. User hovers/click an element → it gets selected
3. Chat widget displays selected element info
4. User can now use Properties or Prompt to edit

This allows the chat to initiate selection even when the canvas isn't the active focus.

### 7.4 AI Provider Architecture

```
┌───────────────────────────────┐
│       AI Engine (abstraction) │
│                               │
│  ┌─────────────────────────┐  │
│  │  Context Builder        │  │
│  │  (element + page +      │  │
│  │   design system data)   │  │
│  └─────────────────────────┘  │
│           │                   │
│           ▼                   │
│  ┌─────────────────────────┐  │
│  │  Provider Router        │  │
│  └─────────────────────────┘  │
│           │                   │
│     ┌─────┼─────┬─────┐      │
│     ▼     ▼     ▼     ▼      │
│  OpenAI  Anthr. OpenCode Kilo │
│  (BYOK)  (BYOK) (ext.) (ext.)│
└───────────────────────────────┘
```

**Built-in providers (BYOK):**
- User provides their own API key
- Keys stored in localStorage
- Supports OpenAI, Anthropic, and any OpenAI-compatible endpoint

**External tool integration:**
- User exports structured context (JSON) to their preferred AI agent tool (OpenCode, Claude Code, Kilo)
- Tool processes and returns modifications
- Bloxx watches a configured output directory/file for the response

### 7.5 AI Response Format

The AI returns structured actions that the system can parse:

```json
{
  "actions": [
    {
      "type": "updateStyles",
      "selector": ".btn",
      "properties": {
        "background": "linear-gradient(135deg, var(--color-primary), var(--color-secondary))",
        "color": "#FFFFFF",
        "padding": "var(--spacing-4) var(--spacing-6)"
      }
    },
    {
      "type": "updateContent",
      "field": "cta_text",
      "value": "Try It Free →"
    }
  ]
}
```

Supported action types:
- `updateStyles` — Modify CSS properties on a selector
- `updateContent` — Change a content slot value
- `setVariant` — Switch to a different variant
- `addBlock` — Insert a new block
- `removeBlock` — Remove a block
- `modifyStructure` — Free-form HTML modification within a block
- `updateDesignToken` — Modify a design system token value

### 7.6 Quick vs Deep Prompts

| Quick Prompt | Deep Prompt |
|---|---|
| Single element modification | Multi-element or structural changes |
| No HTML structure change | Can add/remove elements or modify HTML |
| Returns within seconds | May take longer, stream response |
| Lower token usage | Higher token usage |
| E.g., "Make this blue" | E.g., "Redesign this hero to be dark with animated text" |

---

## 8. Context-Aware Editing & Floating Widgets

### 8.1 Floating Widget Anatomy

The widget is a compact floating panel rendered by the shell, positioned near the selected element:

```
┌───────────────────────────────────────┐
│ Hero Section                          │ ← element type + breadcrumb
│ ───────────────────────────────────── │
│ [🎨 Properties]  [🤖 Prompt]         │ ← mode tabs
│ ───────────────────────────────────── │
│                                       │
│ Background:  [🟦 Primary    ▾]       │ ← design system color picker
│ Padding Y:   [96px        ▼]         │ ← spacing scale selector
│ Max Width:   [1200px     ]           │
│                                       │
│ Variant:     [Centered      ▾]       │ ← variant dropdown
│                                       │
│ [Reset to Design System]              │ ← clear overrides
└───────────────────────────────────────┘
```

### 8.2 Role-Aware Property Sets

Each element role exposes only relevant properties:

| Element Role | Properties Shown |
|---|---|
| **Section/Block** | Background (color/image/gradient), Padding (top/bottom/left/right), Margin, Max-width, Border radius, Shadow, Overlay color & opacity |
| **Heading (h1-h6)** | Font family, Font size, Font weight, Color, Alignment, Line height, Letter spacing, Transform (uppercase/capitalize), Margin bottom |
| **Paragraph/Text** | Font family, Font size, Font weight, Color, Alignment, Line height, Max-width |
| **Button** | Variant (solid/outline/ghost/dull), Size (sm/md/lg), Border radius, Label text, Icon (pick + position), Link URL, Full-width toggle |
| **Image** | Source (upload / URL), Alt text, Object-fit (cover/contain/fill), Border radius, Shadow, Aspect ratio |
| **Input** | Variant, Size, Placeholder, Label text, Helper text, Error state toggle, Required toggle |
| **Icon** | Icon picker (searchable), Size, Color |
| **Container/Wrapper** | Gap, Direction (row/column), Alignment (start/center/end/stretch), Wrap |
| **Link** | URL, Target (self/blank), Variant (text link / button style) |

### 8.3 Hierarchy Awareness

The floating widget shows a breadcrumb: `Page > Hero Section > Button #2`

Properties are context-sensitive:
- A button in a Hero section offers "Light text on dark" or "Dark text on light" presets
- A button in Pricing shows compact sizing suitable for pricing cards
- A heading in Features grid has width constrained to grid column

### 8.4 Widget Behavior

- **Appears on**: Click element on canvas
- **Disappears on**: Escape key, click outside, click 🎯 pointer again
- **Position**: 12px offset from top-right of selected element's bounding box
- **Repositions on**: Scroll, resize, element change
- **Z-index**: Always above canvas iframe

---

## 9. Data Model & Persistence

### 9.1 Core Schema

```typescript
interface BloxxProject {
  id: string;
  name: string;
  createdAt: number;
  updatedAt: number;
  version: number;
  pages: BloxxPage[];
  customBlocks: BlockDefinition[];
  designTokens: DesignTokens;
  componentOverrides: ComponentStyleOverrides;
  metadata: {
    canvasMode: "stack" | "freeform";
    canvasWidth: number;
    defaultExportFormat: "structured";
  };
}

interface BloxxPage {
  id: string;
  name: string;
  slug: string;
  blocks: BlockInstance[];
  seo?: { title: string; description: string; ogImage?: string };
}

interface BlockInstance {
  id: string;
  blockId: string;
  variantId: string;
  content: Record<string, any>;
  overrides: StyleOverride[];
  position?: { x: number; y: number; width: number; height: number };
  hidden?: boolean;
}

interface StyleOverride {
  selector: string;
  properties: Record<string, string>;
}

interface DesignTokens {
  colors: Record<string, TokenValue>;
  typography: Record<string, TokenValue>;
  spacing: Record<string, TokenValue>;
  borders: Record<string, TokenValue>;
  shadows: Record<string, TokenValue>;
  breakpoints?: { sm: number; md: number; lg: number };
}

interface TokenValue {
  value: string;
  type: "color" | "string" | "size" | "number";
  description?: string;
}
```

### 9.2 Storage Strategy

| Data | Store | Persistence |
|---|---|---|
| Active project | Zustand (memory) + IndexedDB (disk) | Auto-save debounced 500ms |
| Block library (curated) | Bundled app code + IndexedDB cache | Refreshed on app version |
| Block library (custom) | IndexedDB | User export/import |
| Design tokens | Part of project (IndexedDB) | Auto-save with project |
| User config (API keys, prefs) | localStorage | On change |
| Export output | Browser download / File System API | User-initiated |

### 9.3 Auto-Save & Recovery

- **Auto-save**: Debounced 500ms after last change. Canvas interactions (reorder, variant swap) trigger immediate save.
- **Undo/Redo**: Command stack in Zustand with inverse actions. Stack limit: 50 operations. Covers: block add/remove/reorder, variant switch, content edit, style override, design token change.
- **Session recovery**: On app load, check IndexedDB for most recent project. Auto-restore with "Last saved: X minutes ago" indicator.

### 9.4 Project Import/Export

- **Export**: Single `.bloxx` file (JSON) containing full project state. For transfer between Bloxx instances.
- **Import**: Drag-and-drop `.bloxx` file onto the app. Restores full project including custom blocks and overrides.
- **HTML Export**: Separate from `.bloxx` export. HTML export is one-way (though it includes re-importable metadata).

---

## 10. Export Pipeline

### 10.1 Output Structure

```
project-name/
├── index.html                     # First page
├── about.html                     # Additional pages
├── pricing.html
│
├── css/
│   ├── design-system.css          # CSS variables + reset + base styles
│   └── components.css             # Component variant classes
│
├── js/
│   └── interactions.js            # Scroll behaviors, hover effects, etc.
│
└── assets/
    ├── images/                    # Project images (copied or inlined)
    └── icons/                     # Used icons
```

### 10.2 Bloxx-Compatible Metadata (Re-import)

Each exported HTML file includes structured data attributes for round-tripping:

```html
<html data-bloxx-project-id="abc123" data-bloxx-version="1.0">
<head>...</head>
<body>
  <section data-bloxx-block="hero"
           data-bloxx-instance="block-2"
           data-bloxx-variant="centered"
           data-bloxx-content='{"headline":"Build Faster","subtitle":"...","cta_text":"Get Started"}'
           data-bloxx-overrides='[{"selector":".hero","properties":{"background":"linear-gradient(...)"}}]'>

    <h1 data-bloxx-slot="headline">Build Faster</h1>
    <p data-bloxx-slot="subtitle">...</p>
    <a href="#" class="btn btn--solid">Get Started</a>
  </section>
</body>
</html>
```

On re-import:
1. Scan `data-bloxx-*` attributes
2. Reconstruct project structure (pages, blocks, instances)
3. Match `data-bloxx-block` IDs to block library
4. Restore content, variants, and overrides
5. Unrecognized HTML preserved as "custom block"

### 10.3 Export Flow

```
User clicks "Export"
  → Collect all pages + design tokens + component styles
  → Compile design-system.css (CSS variables + reset + base typography)
  → Compile components.css (component variant classes using var() references)
  → For each page:
    → Render blocks sequentially
    → Interpolate content into variant templates
    → Apply style overrides as inline styles
    → Inject Bloxx metadata attributes
    → Wrap in HTML document with <head> references
  → Collect assets (images from content slots)
  → Generate folder structure in memory
  → Create ZIP file (JSZip)
  → Trigger browser download
```

### 10.4 Output Quality Standards

- Semantic HTML5: `<header>`, `<section>`, `<nav>`, `<main>`, `<footer>`, `<article>`
- BEM-like class naming: `hero`, `hero__title`, `hero--centered`, `btn`, `btn--solid`
- Design system references use `var(--token-name)` in CSS
- Responsive viewport meta tag included
- No Bloxx-specific JavaScript in the output
- All images either inlined (data URI) or copied to assets/
- Clean, indented, readable HTML

---

## 11. User Flows

### 11.1 New Project Flow

```
1. Open Bloxx → "New Project" screen
2. Enter project name
3. Choose starting point:
   a. Blank project (empty canvas)
   b. Template (pre-built page with blocks)
4. Canvas loads in "Stack" mode
5. Block library panel visible on left
6. Design system panel available on right
```

### 11.2 Wireframing Flow

```
1. Browse block library (categories + search)
2. Drag block onto canvas → appears at bottom of stack
3. Select a variant from the dropdown
4. Edit content: click on text/image → type/upload
5. Reorder blocks: drag handle up/down
6. Add more blocks → page takes shape
```

### 11.3 Design System Setup Flow

```
1. Open Design System panel
2. Edit Colors: pick primary, secondary, accent, neutrals
3. Edit Typography: choose fonts, set scale
4. Edit Spacing: adjust spacing scale
5. Preview changes live on canvas
6. Component variants auto-update
7. Design system saved as CSS variables
```

### 11.4 Preview Flow

```
1. Click "Preview" in toolbar (or Ctrl/Cmd+Shift+P for new tab)
2. Viewport switcher in preview bar: Desktop | Tablet | Mobile
3. Scroll through page — no editing chrome visible
4. Switch viewports to check responsiveness
5. For new tab: inspect with DevTools, share URL, or screenshot
6. Click "Exit Preview" (or close tab) to return to editor
```

### 11.5 AI Polish Flow

```
1. Switch chat widget to "Prompt" mode
2. Use 🎯 pointer to select element on canvas
3. Type prompt: "Make this hero section feel more premium"
4. AI returns modifications → preview on canvas
5. Accept, reject, or refine prompt
6. Or: use Properties tab for direct control
```

### 11.6 Export Flow

```
1. Click "Export" in toolbar
2. Choose options: page selection, asset handling
3. Click "Export" → download ZIP
4. Unzip → open index.html in browser
5. Or hand off to developer
```

---

## 12. Phased Implementation Plan

### Phase 1: Core Foundation
- App shell + iframe canvas architecture
- Project CRUD + IndexedDB persistence
- Basic block system: 10 curated blocks, 2-3 variants each
- Stack mode canvas with drag-and-drop blocks
- Content slot editing (text, images)
- Block reordering
- Viewport switcher (Desktop / Tablet / Mobile) with device frames
- Preview mode (in-editor fullscreen + new tab)
- Undo/redo (basic)

### Phase 2: Design System
- Design token editor UI (colors, typography, spacing)
- Token → CSS variable compilation
- Component variant auto-generation (buttons, inputs, cards)
- Style override system (per-instance)
- Design tokens cascade to canvas in real-time

### Phase 3: AI Integration
- AI chat widget shell (Properties mode first)
- Element selection with role-aware property sets
- Floating widget positioning
- Multi-provider abstraction layer (OpenAI + Anthropic BYOK)
- Prompt mode with context builder
- Response parser and action executor
- 🎯 pointer selection in chat

### Phase 4: Advanced Features
- Block library expansion (30-50 blocks)
- Free-form canvas mode
- Custom block editor
- External tool integration (OpenCode, Claude Code, Kilo)
- Undo/redo expansion (full coverage)
- Block-level responsive overrides (per-breakpoint style adjustments)

### Phase 5: Export & Polish
- Export pipeline (structured folder + ZIP)
- Bloxx-compatible metadata for re-import
- Asset management (upload, images, icons)
- Multi-page management
- Session recovery
- Performance optimization

### Phase 6: Electron & Cloud
- Electron wrapper
- File system access (native save/open)
- Optional cloud sync
- Team collaboration (future)

---

## 13. Non-Goals (v1)

- Real-time collaboration / multi-user editing
- Version history / branching
- Plugin ecosystem for third-party block creators
- CMS / headless content management integration
- Custom domain preview hosting
- Mobile app (iOS/Android) — PWA is sufficient
- CSS animation timeline editor
- Design token import from Figma/Tailwind config (future)

---

## 14. Technical Stack Recommendations

| Layer | Recommended | Alternative |
|---|---|---|
| Framework | React 18+ or Vue 3 | Svelte |
| State management | Zustand | Jotai, Pinia |
| Canvas rendering | DOM (in iframe) | Canvas2D/WebGL (future) |
| Persistence | Dexie.js (IndexedDB wrapper) | idb |
| Build tool | Vite | Turbopack |
| CSS approach | Design token → CSS variables + vanilla CSS | Tailwind (for exported output) |
| AI providers | OpenAI SDK, Anthropic SDK | LangChain (abstraction) |
| ZIP export | JSZip | Streamsaver |
| Icons | Lucide | Phosphor |
| Testing | Vitest + Playwright | Jest + Cypress |

---

## 15. Open Questions (Deferred)

1. Should the curated block library be versioned and updatable remotely?
2. What's the exact pricing model? (Free tier with limited blocks? BYOK with no AI markup?)
3. Should exported HTML include Tailwind classes as an alternative output option?
4. How should images be handled for export — data URIs or separate files in the ZIP?
5. Should the new-tab preview auto-update when the editor changes (hot reload)? Or is it a one-time snapshot?