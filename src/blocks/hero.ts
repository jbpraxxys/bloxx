import type { BlockDefinition } from '../types'

export const heroBlocks: BlockDefinition[] = [
{
    id: 'hero',
    name: 'Hero Section',
    category: 'sections',
    description: 'Headline, subtitle, CTA, and optional image',
    source: 'curated',
    defaultVariant: 'centered',
    schema: {
      headline: { type: 'text', default: 'Build Something Amazing', label: 'Headline' },
      subtitle: { type: 'text', default: 'A powerful tool that helps you create beautiful designs faster than ever.', label: 'Subtitle' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
      secondary_text: { type: 'text', default: 'Learn more →', label: 'Secondary text' },
    },
    variants: [
      {
        id: 'centered',
        name: 'Centered',
        template: `<section style="text-align:center;padding:96px 24px;max-width:800px;margin:0 auto;">
          <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
          <p style="font-size:1.125rem;color:#666;max-width:600px;margin:0 auto 32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
          <div style="display:flex;gap:16px;justify-content:center;">
            <a href="#" style="background:#2563EB;color:#fff;padding:12px 28px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
            <a href="#" style="padding:12px 28px;border-radius:8px;border:1px solid #ddd;">{{secondary_text}}</a>
          </div>
        </section>`,
      },
      {
        id: 'left-align',
        name: 'Left Aligned',
        template: `<section style="display:flex;align-items:center;gap:48px;padding:96px 24px;max-width:1200px;margin:0 auto;">
          <div style="flex:1;">
            <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="font-size:1.125rem;color:#666;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <div style="display:flex;gap:16px;">
              <a href="#" style="background:#2563EB;color:#fff;padding:12px 28px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
              <a href="#" style="padding:12px 28px;border-radius:8px;border:1px solid #ddd;">{{secondary_text}}</a>
            </div>
          </div>
          <div style="flex:1;background:#f0f0f0;border-radius:12px;height:400px;display:flex;align-items:center;justify-content:center;color:#999;">Image placeholder</div>
        </section>`,
      },
      {
        id: 'split',
        name: 'Split Screen',
        template: `<section style="display:flex;min-height:80vh;">
          <div style="flex:1;display:flex;align-items:center;padding:48px;background:#2563EB;color:#fff;">
            <div style="max-width:480px;">
              <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
              <p style="font-size:1.125rem;opacity:0.9;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
              <a href="#" style="background:#fff;color:#2563EB;padding:12px 28px;border-radius:8px;font-weight:600;display:inline-block;">{{cta_text}}</a>
            </div>
          </div>
          <div style="flex:1;background:#f0f0f0;display:flex;align-items:center;justify-content:center;">Image</div>
        </section>`,
      },
    ],
  },

{
    id: 'hero-gradient',
    name: 'Gradient Hero',
    category: 'sections',
    description: 'Hero with gradient background',
    source: 'curated',
    defaultVariant: 'left-text',
    schema: {
      headline: { type: 'text', default: 'Build Something Amazing', label: 'Headline' },
      subtitle: { type: 'text', default: 'A powerful tool that helps you create beautiful designs faster than ever.', label: 'Subtitle' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
      secondary_text: { type: 'text', default: 'Learn more →', label: 'Secondary text' },
    },
    variants: [
      {
        id: 'left-text',
        name: 'Left Text',
        template: `<section style="display:flex;align-items:center;gap:48px;padding:96px 24px;max-width:1200px;margin:0 auto;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);color:#fff;border-radius:0;">
          <div style="flex:1;">
            <h1 style="font-size:clamp(2rem,4vw,3rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="font-size:1.125rem;opacity:0.9;margin-bottom:32px;max-width:480px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <div style="display:flex;gap:16px;">
              <a href="#" style="background:#fff;color:#764ba2;padding:12px 28px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
              <a href="#" style="padding:12px 28px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);color:#fff;">{{secondary_text}}</a>
            </div>
          </div>
          <div style="flex:1;background:rgba(255,255,255,0.1);border-radius:12px;height:350px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">Hero visual</div>
        </section>`,
      },
      {
        id: 'centered',
        name: 'Centered',
        template: `<section style="text-align:center;padding:120px 24px;background:linear-gradient(135deg,#f093fb 0%,#f5576c 100%);color:#fff;">
          <div style="max-width:700px;margin:0 auto;">
            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="font-size:1.125rem;opacity:0.9;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <div style="display:flex;gap:16px;justify-content:center;">
              <a href="#" style="background:#fff;color:#f5576c;padding:12px 28px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
              <a href="#" style="padding:12px 28px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);color:#fff;">{{secondary_text}}</a>
            </div>
          </div>
        </section>`,
      },
    ],
  },

{
    id: 'hero-bg-image',
    name: 'Background Image Hero',
    category: 'sections',
    description: 'Hero with full-bleed background image and overlay',
    source: 'curated',
    defaultVariant: 'dark-overlay',
    schema: {
      headline: { type: 'text', default: 'Your Vision, Built Fast', label: 'Headline' },
      subtitle: { type: 'text', default: 'Create professional wireframes and export clean HTML in minutes.', label: 'Subtitle' },
      cta_text: { type: 'text', default: 'Get Started', label: 'CTA text' },
    },
    variants: [
      {
        id: 'dark-overlay',
        name: 'Dark Overlay',
        template: `<section style="text-align:center;padding:120px 24px;background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),#1a1a2e;color:#fff;background-size:cover;background-position:center;">
          <div style="max-width:700px;margin:0 auto;">
            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="font-size:1.125rem;opacity:0.85;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <a href="#" style="display:inline-block;background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
          </div>
        </section>`,
      },
      {
        id: 'gradient-overlay',
        name: 'Gradient Overlay',
        template: `<section style="text-align:center;padding:120px 24px;background:linear-gradient(135deg,rgba(37,99,235,0.85),rgba(124,58,237,0.85)),#1a1a2e;color:#fff;background-size:cover;background-position:center;">
          <div style="max-width:700px;margin:0 auto;">
            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="font-size:1.125rem;opacity:0.9;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <a href="#" style="display:inline-block;background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
          </div>
        </section>`,
      },
    ],
  },

{
    id: 'hero-video',
    name: 'Video Hero',
    category: 'sections',
    description: 'Hero with video background',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      headline: { type: 'text', default: 'See Bloxx in Action', label: 'Headline' },
      subtitle: { type: 'text', default: 'Watch how teams build faster with our platform.', label: 'Subtitle' },
      cta_text: { type: 'text', default: 'Watch Video', label: 'CTA text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="position:relative;overflow:hidden;text-align:center;padding:120px 24px;color:#fff;">
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:#1a1a2e;z-index:0;"></div>
          <div style="position:absolute;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.5);z-index:1;"></div>
          <div style="position:relative;z-index:2;max-width:700px;margin:0 auto;">
            <h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:16px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="font-size:1.125rem;opacity:0.85;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <a href="#" style="display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);color:#fff;padding:14px 28px;border-radius:999px;border:1px solid rgba(255,255,255,0.3);font-weight:600;">▶ {{cta_text}}</a>
          </div>
        </section>`,
      },
      {
        id: 'minimal',
        name: 'Minimal',
        template: `<section style="text-align:center;padding:96px 24px;background:#f8fafc;">
          <div style="max-width:600px;margin:0 auto;">
            <span style="display:inline-block;padding:6px 16px;background:#e0e7ff;color:#2563EB;border-radius:999px;font-size:0.875rem;font-weight:500;margin-bottom:16px;">Watch</span>
            <h1 style="font-size:clamp(1.75rem,4vw,3rem);font-weight:700;line-height:1.1;margin-bottom:12px;" data-bloxx-slot="headline">{{headline}}</h1>
            <p style="color:#666;margin-bottom:32px;" data-bloxx-slot="subtitle">{{subtitle}}</p>
            <a href="#" style="display:inline-flex;align-items:center;gap:8px;color:#2563EB;font-weight:600;padding:12px 24px;border:2px solid #2563EB;border-radius:8px;">▶ {{cta_text}}</a>
          </div>
        </section>`,
      },
    ],
  }
]
