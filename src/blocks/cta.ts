import type { BlockDefinition } from '../types'

export const ctaBlocks: BlockDefinition[] = [
{
    id: 'cta',
    name: 'CTA Section',
    category: 'cta',
    description: 'Call-to-action banner',
    source: 'curated',
    defaultVariant: 'simple',
    schema: {
      heading: { type: 'text', default: 'Ready to Get Started?', label: 'Heading' },
      description: { type: 'text', default: 'Join thousands of designers already using Bloxx.', label: 'Description' },
      button_text: { type: 'text', default: 'Start Free Trial', label: 'Button text' },
    },
    variants: [
      {
        id: 'simple',
        name: 'Simple',
        template: `<section style="text-align:center;padding:96px 24px;background:#2563EB;color:#fff;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="opacity:0.9;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;" data-bloxx-slot="description">{{description}}</p>
          <span style="display:inline-block;background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</span>
        </section>`,
      },
      {
        id: 'split',
        name: 'Split CTA',
        template: `<section style="display:flex;align-items:center;justify-content:space-between;padding:64px 48px;max-width:1200px;margin:0 auto;background:#f8fafc;border-radius:16px;">
          <div>
            <h2 style="font-size:1.75rem;font-weight:700;margin-bottom:8px;" data-bloxx-slot="heading">{{heading}}</h2>
            <p style="color:#666;" data-bloxx-slot="description">{{description}}</p>
          </div>
          <span style="background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-weight:600;white-space:nowrap;">{{button_text}}</span>
        </section>`,
      },
      {
        id: 'newsletter',
        name: 'Newsletter',
        template: `<section style="text-align:center;padding:96px 24px;">
          <h2 style="font-size:1.75rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="color:#666;margin-bottom:24px;" data-bloxx-slot="description">{{description}}</p>
          <div style="display:flex;gap:12px;max-width:400px;margin:0 auto;">
            <input type="email" placeholder="your@email.com" style="flex:1;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;" />
            <span style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;">{{button_text}}</span>
          </div>
        </section>`,
      },
    ],
  },

{
    id: 'cta-banner',
    name: 'CTA Banner',
    category: 'cta',
    description: 'Full-width banner call to action',
    source: 'curated',
    defaultVariant: 'simple',
    schema: {
      heading: { type: 'text', default: 'Ready to Transform Your Workflow?', label: 'Heading' },
      description: { type: 'text', default: 'Join thousands of designers already using Bloxx to build faster.', label: 'Description' },
      button_text: { type: 'text', default: 'Start Free Trial', label: 'Button text' },
      button2_text: { type: 'text', default: 'Book a Demo', label: 'Button 2 text' },
    },
    variants: [
      {
        id: 'simple',
        name: 'Simple',
        template: `<section style="text-align:center;padding:96px 24px;background:linear-gradient(135deg,#1e3a5f 0%,#2563EB 100%);color:#fff;">
          <h2 style="font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="opacity:0.9;margin-bottom:32px;max-width:550px;margin-left:auto;margin-right:auto;" data-bloxx-slot="description">{{description}}</p>
          <div style="display:flex;gap:16px;justify-content:center;">
            <span style="background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</span>
            <span style="padding:14px 32px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);color:#fff;">{{button2_text}}</span>
          </div>
        </section>`,
      },
      {
        id: 'with-image',
        name: 'With Image',
        template: `<section style="display:flex;align-items:center;gap:48px;padding:64px 48px;max-width:1200px;margin:48px auto;background:linear-gradient(135deg,#1e3a5f 0%,#2563EB 100%);border-radius:16px;color:#fff;">
          <div style="flex:1;">
            <h2 style="font-size:1.75rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
            <p style="opacity:0.9;margin-bottom:24px;" data-bloxx-slot="description">{{description}}</p>
            <span style="display:inline-block;background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</span>
          </div>
          <div style="flex:1;background:rgba(255,255,255,0.1);border-radius:12px;height:200px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">Dashboard preview</div>
        </section>`,
      },
    ],
  },

{
    id: 'cta-modal',
    name: 'CTA with Modal',
    category: 'cta',
    description: 'Call to action that opens a modal overlay',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Get Early Access', label: 'Heading' },
      description: { type: 'text', default: 'Be the first to try Bloxx and shape the future of design.', label: 'Description' },
      button_text: { type: 'text', default: 'Join Waitlist', label: 'Button text' },
      modal_title: { type: 'text', default: 'Join the Waitlist', label: 'Modal title' },
      modal_desc: { type: 'text', default: 'Enter your email and we\'ll notify you when we launch.', label: 'Modal description' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="text-align:center;padding:96px 24px;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="color:#666;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;" data-bloxx-slot="description">{{description}}</p>
          <span style="display:inline-block;background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</span>
          <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:100;">
            <div style="background:#fff;border-radius:16px;padding:40px;max-width:420px;width:90%;position:relative;">
              <span style="position:absolute;top:16px;right:16px;cursor:pointer;font-size:1.25rem;color:#888;">✕</span>
              <h3 style="font-size:1.5rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="modal_title">{{modal_title}}</h3>
              <p style="color:#666;margin-bottom:24px;" data-bloxx-slot="modal_desc">{{modal_desc}}</p>
              <input type="email" placeholder="your@email.com" style="width:100%;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;margin-bottom:16px;box-sizing:border-box;" />
              <span style="display:block;text-align:center;background:#2563EB;color:#fff;padding:12px;border-radius:8px;font-weight:600;">{{button_text}}</span>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'inline-form',
        name: 'Inline Form',
        template: `<section style="text-align:center;padding:96px 24px;background:#f8fafc;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="color:#666;margin-bottom:32px;max-width:500px;margin-left:auto;margin-right:auto;" data-bloxx-slot="description">{{description}}</p>
          <div style="display:flex;gap:12px;max-width:440px;margin:0 auto;">
            <input type="email" placeholder="your@email.com" style="flex:1;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;" />
            <span style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;white-space:nowrap;">{{button_text}}</span>
          </div>
        </section>`,
      },
    ],
  },

{
    id: 'schedule-demo',
    name: 'Schedule a Demo',
    category: 'cta',
    description: 'Schedule a demo section with calendar callout',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'See Bloxx in Action', label: 'Heading' },
      description: { type: 'text', default: 'Book a personalized demo with our team. Well show you how Bloxx can transform your workflow.', label: 'Description' },
      button_text: { type: 'text', default: 'Book a Demo', label: 'Button text' },
      feature1: { type: 'text', default: 'Live product walkthrough', label: 'Feature 1' },
      feature2: { type: 'text', default: 'Q&A with our team', label: 'Feature 2' },
      feature3: { type: 'text', default: 'Custom use case discussion', label: 'Feature 3' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:800px;margin:0 auto;text-align:center;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="color:#666;margin-bottom:40px;max-width:550px;margin-left:auto;margin-right:auto;" data-bloxx-slot="description">{{description}}</p>
          <div style="display:flex;gap:48px;justify-content:center;margin-bottom:40px;">
            <div style="display:flex;align-items:center;gap:8px;"><span style="color:#2563EB;">✓</span> <span data-bloxx-slot="feature1">{{feature1}}</span></div>
            <div style="display:flex;align-items:center;gap:8px;"><span style="color:#2563EB;">✓</span> <span data-bloxx-slot="feature2">{{feature2}}</span></div>
            <div style="display:flex;align-items:center;gap:8px;"><span style="color:#2563EB;">✓</span> <span data-bloxx-slot="feature3">{{feature3}}</span></div>
          </div>
          <span style="display:inline-block;background:#2563EB;color:#fff;padding:14px 36px;border-radius:8px;font-weight:600;">{{button_text}}</span>
          <p style="color:#888;font-size:0.875rem;margin-top:12px;">No credit card required</p>
        </section>`,
      },
    ],
  }
]
