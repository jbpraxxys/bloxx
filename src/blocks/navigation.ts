import type { BlockDefinition } from '../types'

export const navigationBlocks: BlockDefinition[] = [
{
    id: 'nav-simple',
    name: 'Simple Navbar',
    category: 'navigation',
    description: 'Logo + inline navigation links + CTA button',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      logo: { type: 'text', default: 'Logo', label: 'Site name' },
      link1: { type: 'text', default: 'Features', label: 'Link 1' },
      link2: { type: 'text', default: 'Pricing', label: 'Link 2' },
      link3: { type: 'text', default: 'About', label: 'Link 3' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1200px;margin:0 auto;">
          <div style="font-weight:700;font-size:1.25rem;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:24px;align-items:center;">
            <span data-bloxx-slot="link1">{{link1}}</span>
            <span data-bloxx-slot="link2">{{link2}}</span>
            <span data-bloxx-slot="link3">{{link3}}</span>
            <span style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</span>
          </div>
        </nav>`,
      },
      {
        id: 'centered',
        name: 'Centered',
        template: `<nav style="text-align:center;padding:20px;">
          <div style="font-weight:700;font-size:1.25rem;margin-bottom:12px;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:24px;justify-content:center;align-items:center;">
            <span data-bloxx-slot="link1">{{link1}}</span>
            <span data-bloxx-slot="link2">{{link2}}</span>
            <span data-bloxx-slot="link3">{{link3}}</span>
            <span style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</span>
          </div>
        </nav>`,
      },
    ],
  },

{
    id: 'nav-dropdown',
    name: 'Navbar with Dropdown',
    category: 'navigation',
    description: 'Navbar with dropdown menu items',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      logo: { type: 'text', default: 'Bloxx', label: 'Logo text' },
      link1: { type: 'text', default: 'Products', label: 'Dropdown 1 trigger' },
      link1_item1: { type: 'text', default: 'Overview', label: 'Dropdown 1 item 1' },
      link1_item2: { type: 'text', default: 'Features', label: 'Dropdown 1 item 2' },
      link2: { type: 'text', default: 'Resources', label: 'Dropdown 2 trigger' },
      link2_item1: { type: 'text', default: 'Blog', label: 'Dropdown 2 item 1' },
      link2_item2: { type: 'text', default: 'Docs', label: 'Dropdown 2 item 2' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1200px;margin:0 auto;position:relative;">
          <div style="font-weight:700;font-size:1.25rem;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:24px;align-items:center;">
            <div style="position:relative;cursor:pointer;">
              <span data-bloxx-slot="link1">{{link1}} ▾</span>
              <div style="position:absolute;top:100%;left:0;background:#fff;border:1px solid #eee;border-radius:8px;padding:8px;min-width:160px;box-shadow:0 4px 12px rgba(0,0,0,0.1);display:flex;flex-direction:column;gap:4px;">
                <span style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link1_item1">{{link1_item1}}</span>
                <span style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link1_item2">{{link1_item2}}</span>
              </div>
            </div>
            <div style="position:relative;cursor:pointer;">
              <span data-bloxx-slot="link2">{{link2}} ▾</span>
              <div style="position:absolute;top:100%;left:0;background:#fff;border:1px solid #eee;border-radius:8px;padding:8px;min-width:160px;box-shadow:0 4px 12px rgba(0,0,0,0.1);display:flex;flex-direction:column;gap:4px;">
                <span style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link2_item1">{{link2_item1}}</span>
                <span style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link2_item2">{{link2_item2}}</span>
              </div>
            </div>
            <span style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</span>
          </div>
        </nav>`,
      },
      {
        id: 'mega-menu',
        name: 'Mega Menu',
        template: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1200px;margin:0 auto;">
          <div style="font-weight:700;font-size:1.25rem;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:24px;align-items:center;">
            <div style="position:relative;cursor:pointer;">
              <span data-bloxx-slot="link1">{{link1}} ▾</span>
              <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #eee;border-radius:12px;padding:16px;min-width:400px;box-shadow:0 8px 24px rgba(0,0,0,0.1);display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <span style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link1_item1">{{link1_item1}}</span>
                <span style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link1_item2">{{link1_item2}}</span>
              </div>
            </div>
            <div style="position:relative;cursor:pointer;">
              <span data-bloxx-slot="link2">{{link2}} ▾</span>
              <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #eee;border-radius:12px;padding:16px;min-width:400px;box-shadow:0 8px 24px rgba(0,0,0,0.1);display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <span style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link2_item1">{{link2_item1}}</span>
                <span style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link2_item2">{{link2_item2}}</span>
              </div>
            </div>
            <span style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</span>
          </div>
        </nav>`,
      },
    ],
  },

{
    id: 'nav-hamburger',
    name: 'Hamburger Navbar',
    category: 'navigation',
    description: 'Mobile-friendly hamburger menu navigation',
    source: 'curated',
    defaultVariant: 'left-slide',
    schema: {
      logo: { type: 'text', default: 'Bloxx', label: 'Logo text' },
      link1: { type: 'text', default: 'Features', label: 'Link 1' },
      link2: { type: 'text', default: 'Pricing', label: 'Link 2' },
      link3: { type: 'text', default: 'About', label: 'Link 3' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
    },
    variants: [
      {
        id: 'left-slide',
        name: 'Left Slide',
        template: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1200px;margin:0 auto;position:relative;">
          <div style="font-weight:700;font-size:1.25rem;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:16px;align-items:center;">
            <div style="width:28px;height:20px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;">
              <span style="display:block;height:3px;background:#333;border-radius:2px;"></span>
              <span style="display:block;height:3px;background:#333;border-radius:2px;"></span>
              <span style="display:block;height:3px;background:#333;border-radius:2px;"></span>
            </div>
            <span style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</span>
          </div>
          <div style="position:fixed;top:0;left:-280px;width:280px;height:100vh;background:#fff;border-right:1px solid #eee;padding:48px 24px;display:flex;flex-direction:column;gap:16px;transition:left 0.3s;z-index:100;">
            <div style="font-weight:700;font-size:1.25rem;margin-bottom:24px;" data-bloxx-slot="logo">{{logo}}</div>
            <span style="font-size:1.125rem;color:#333;" data-bloxx-slot="link1">{{link1}}</span>
            <span style="font-size:1.125rem;color:#333;" data-bloxx-slot="link2">{{link2}}</span>
            <span style="font-size:1.125rem;color:#333;" data-bloxx-slot="link3">{{link3}}</span>
            <span style="background:#2563EB;color:#fff;padding:12px 20px;border-radius:8px;text-align:center;margin-top:16px;">{{cta_text}}</span>
          </div>
        </nav>`,
      },
      {
        id: 'overlay',
        name: 'Overlay',
        template: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:16px 24px;max-width:1200px;margin:0 auto;position:relative;">
          <div style="font-weight:700;font-size:1.25rem;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:16px;align-items:center;">
            <div style="width:28px;height:20px;display:flex;flex-direction:column;justify-content:space-between;cursor:pointer;">
              <span style="display:block;height:3px;background:#333;border-radius:2px;"></span>
              <span style="display:block;height:3px;background:#333;border-radius:2px;"></span>
              <span style="display:block;height:3px;background:#333;border-radius:2px;"></span>
            </div>
            <span style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</span>
          </div>
          <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:100;">
            <div style="font-weight:700;font-size:1.5rem;color:#fff;margin-bottom:12px;" data-bloxx-slot="logo">{{logo}}</div>
            <span style="font-size:1.25rem;color:#fff;" data-bloxx-slot="link1">{{link1}}</span>
            <span style="font-size:1.25rem;color:#fff;" data-bloxx-slot="link2">{{link2}}</span>
            <span style="font-size:1.25rem;color:#fff;" data-bloxx-slot="link3">{{link3}}</span>
            <span style="background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-size:1.125rem;margin-top:16px;">{{cta_text}}</span>
          </div>
        </nav>`,
      },
    ],
  },

{
    id: 'nav-transparent',
    name: 'Transparent Navbar',
    category: 'navigation',
    description: 'Transparent navbar overlay on hero',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      logo: { type: 'text', default: 'Bloxx', label: 'Logo text' },
      link1: { type: 'text', default: 'Products', label: 'Link 1' },
      link2: { type: 'text', default: 'Pricing', label: 'Link 2' },
      link3: { type: 'text', default: 'About', label: 'Link 3' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<nav style="position:absolute;top:0;left:0;right:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:20px 24px;max-width:1200px;margin:0 auto;color:#fff;">
          <div style="font-weight:700;font-size:1.25rem;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:24px;align-items:center;">
            <span style="opacity:0.85;" data-bloxx-slot="link1">{{link1}}</span>
            <span style="opacity:0.85;" data-bloxx-slot="link2">{{link2}}</span>
            <span style="opacity:0.85;" data-bloxx-slot="link3">{{link3}}</span>
            <span style="background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);color:#fff;padding:8px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.3);">{{cta_text}}</span>
          </div>
        </nav>`,
      },
    ],
  }
]
