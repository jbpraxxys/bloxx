import type { BlockDefinition } from '../types'

export const curatedBlocks: BlockDefinition[] = [
  // ─── Navigation ─────────────────────────────────────
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
            <a href="#" data-bloxx-slot="link1">{{link1}}</a>
            <a href="#" data-bloxx-slot="link2">{{link2}}</a>
            <a href="#" data-bloxx-slot="link3">{{link3}}</a>
            <a href="#" style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</a>
          </div>
        </nav>`,
      },
      {
        id: 'centered',
        name: 'Centered',
        template: `<nav style="text-align:center;padding:20px;">
          <div style="font-weight:700;font-size:1.25rem;margin-bottom:12px;" data-bloxx-slot="logo">{{logo}}</div>
          <div style="display:flex;gap:24px;justify-content:center;align-items:center;">
            <a href="#" data-bloxx-slot="link1">{{link1}}</a>
            <a href="#" data-bloxx-slot="link2">{{link2}}</a>
            <a href="#" data-bloxx-slot="link3">{{link3}}</a>
            <a href="#" style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</a>
          </div>
        </nav>`,
      },
    ],
  },

  // ─── Hero ────────────────────────────────────────────
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

  // ─── Features Grid ───────────────────────────────────
  {
    id: 'features',
    name: 'Features Grid',
    category: 'features',
    description: 'Grid of feature cards with icon, heading, and description',
    source: 'curated',
    defaultVariant: '3-column',
    schema: {
      heading: { type: 'text', default: 'Features', label: 'Section heading' },
      subheading: { type: 'text', default: 'Everything you need to build great products.', label: 'Section subheading' },
      feature1_title: { type: 'text', default: 'Fast', label: 'Feature 1 title' },
      feature1_desc: { type: 'text', default: 'Lightning-fast performance out of the box.', label: 'Feature 1 description' },
      feature2_title: { type: 'text', default: 'Flexible', label: 'Feature 2 title' },
      feature2_desc: { type: 'text', default: 'Customizable to fit your exact needs.', label: 'Feature 2 description' },
      feature3_title: { type: 'text', default: 'Reliable', label: 'Feature 3 title' },
      feature3_desc: { type: 'text', default: 'Built to handle production workloads.', label: 'Feature 3 description' },
    },
    variants: [
      {
        id: '3-column',
        name: '3 Column',
        template: `<section style="padding:96px 24px;max-width:1200px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:64px;">
            <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
            <p style="color:#666;max-width:600px;margin:0 auto;" data-bloxx-slot="subheading">{{subheading}}</p>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px;">
            <div style="padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;">⚡</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="feature1_title">{{feature1_title}}</h3>
              <p style="color:#666;" data-bloxx-slot="feature1_desc">{{feature1_desc}}</p>
            </div>
            <div style="padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;">🔧</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="feature2_title">{{feature2_title}}</h3>
              <p style="color:#666;" data-bloxx-slot="feature2_desc">{{feature2_desc}}</p>
            </div>
            <div style="padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;">🛡️</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="feature3_title">{{feature3_title}}</h3>
              <p style="color:#666;" data-bloxx-slot="feature3_desc">{{feature3_desc}}</p>
            </div>
          </div>
        </section>`,
      },
      {
        id: '2-column',
        name: '2 Column Alternating',
        template: `<section style="padding:96px 24px;max-width:900px;margin:0 auto;">
          <div style="text-align:center;margin-bottom:64px;">
            <h2 style="font-size:2rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
            <p style="color:#666;" data-bloxx-slot="subheading">{{subheading}}</p>
          </div>
          <div style="display:flex;flex-direction:column;gap:48px;">
            <div style="display:flex;gap:32px;align-items:center;">
              <div style="flex:1;"><div style="font-size:3rem;">⚡</div></div>
              <div style="flex:1;"><h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="feature1_title">{{feature1_title}}</h3><p style="color:#666;" data-bloxx-slot="feature1_desc">{{feature1_desc}}</p></div>
            </div>
            <div style="display:flex;gap:32px;align-items:center;flex-direction:row-reverse;">
              <div style="flex:1;"><div style="font-size:3rem;">🔧</div></div>
              <div style="flex:1;"><h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="feature2_title">{{feature2_title}}</h3><p style="color:#666;" data-bloxx-slot="feature2_desc">{{feature2_desc}}</p></div>
            </div>
            <div style="display:flex;gap:32px;align-items:center;">
              <div style="flex:1;"><div style="font-size:3rem;">🛡️</div></div>
              <div style="flex:1;"><h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="feature3_title">{{feature3_title}}</h3><p style="color:#666;" data-bloxx-slot="feature3_desc">{{feature3_desc}}</p></div>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Pricing ─────────────────────────────────────────
  {
    id: 'pricing',
    name: 'Pricing Section',
    category: 'pricing',
    description: 'Pricing tier cards',
    source: 'curated',
    defaultVariant: '3-tier',
    schema: {
      heading: { type: 'text', default: 'Simple Pricing', label: 'Heading' },
      tier1_name: { type: 'text', default: 'Starter', label: 'Tier 1 name' },
      tier1_price: { type: 'text', default: '$19/mo', label: 'Tier 1 price' },
      tier1_feature1: { type: 'text', default: '5 projects', label: 'Tier 1 feature 1' },
      tier2_name: { type: 'text', default: 'Pro', label: 'Tier 2 name' },
      tier2_price: { type: 'text', default: '$49/mo', label: 'Tier 2 price' },
      tier2_feature1: { type: 'text', default: 'Unlimited projects', label: 'Tier 2 feature 1' },
      tier3_name: { type: 'text', default: 'Enterprise', label: 'Tier 3 name' },
      tier3_price: { type: 'text', default: '$99/mo', label: 'Tier 3 price' },
      tier3_feature1: { type: 'text', default: 'Everything in Pro + SSO', label: 'Tier 3 feature 1' },
    },
    variants: [
      {
        id: '3-tier',
        name: '3 Tiers',
        template: `<section style="padding:96px 24px;max-width:1100px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
            <div style="border:1px solid #eee;border-radius:12px;padding:32px;">
              <h3 style="font-weight:600;margin-bottom:8px;">{{tier1_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:24px;">{{tier1_price}}</div>
              <ul style="list-style:none;padding:0;">
                <li style="padding:8px 0;border-bottom:1px solid #f0f0f0;">✓ {{tier1_feature1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;margin-top:24px;padding:12px;border:1px solid #ddd;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:2px solid #2563EB;border-radius:12px;padding:32px;position:relative;">
              <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#2563EB;color:#fff;padding:4px 16px;border-radius:999px;font-size:0.875rem;">Popular</span>
              <h3 style="font-weight:600;margin-bottom:8px;">{{tier2_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:24px;">{{tier2_price}}</div>
              <ul style="list-style:none;padding:0;">
                <li style="padding:8px 0;border-bottom:1px solid #f0f0f0;">✓ {{tier2_feature1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;margin-top:24px;padding:12px;background:#2563EB;color:#fff;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:32px;">
              <h3 style="font-weight:600;margin-bottom:8px;">{{tier3_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:24px;">{{tier3_price}}</div>
              <ul style="list-style:none;padding:0;">
                <li style="padding:8px 0;border-bottom:1px solid #f0f0f0;">✓ {{tier3_feature1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;margin-top:24px;padding:12px;border:1px solid #ddd;border-radius:8px;">Contact Sales</a>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── CTA ─────────────────────────────────────────────
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
          <a href="#" style="display:inline-block;background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</a>
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
          <a href="#" style="background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-weight:600;white-space:nowrap;">{{button_text}}</a>
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
            <a href="#" style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;">{{button_text}}</a>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Testimonials ────────────────────────────────────
  {
    id: 'testimonials',
    name: 'Testimonials',
    category: 'content',
    description: 'Customer testimonial cards',
    source: 'curated',
    defaultVariant: 'grid',
    schema: {
      heading: { type: 'text', default: 'What Our Users Say', label: 'Heading' },
      quote1: { type: 'text', default: 'Bloxx transformed our design workflow.', label: 'Quote 1' },
      author1: { type: 'text', default: 'Jane Doe', label: 'Author 1' },
      quote2: { type: 'text', default: 'The AI polish feature is incredible.', label: 'Quote 2' },
      author2: { type: 'text', default: 'John Smith', label: 'Author 2' },
    },
    variants: [
      {
        id: 'grid',
        name: 'Grid',
        template: `<section style="padding:96px 24px;max-width:900px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(2,1fr);gap:24px;">
            <div style="padding:32px;border:1px solid #eee;border-radius:12px;">
              <p style="margin-bottom:16px;font-style:italic;" data-bloxx-slot="quote1">"{{quote1}}"</p>
              <div style="font-weight:600;" data-bloxx-slot="author1">— {{author1}}</div>
            </div>
            <div style="padding:32px;border:1px solid #eee;border-radius:12px;">
              <p style="margin-bottom:16px;font-style:italic;" data-bloxx-slot="quote2">"{{quote2}}"</p>
              <div style="font-weight:600;" data-bloxx-slot="author2">— {{author2}}</div>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── FAQ ─────────────────────────────────────────────
  {
    id: 'faq',
    name: 'FAQ Section',
    category: 'content',
    description: 'Frequently asked questions in accordion style',
    source: 'curated',
    defaultVariant: 'accordion',
    schema: {
      heading: { type: 'text', default: 'Frequently Asked Questions', label: 'Heading' },
      q1: { type: 'text', default: 'What is Bloxx?', label: 'Question 1' },
      a1: { type: 'text', default: 'Bloxx is a design tool for wireframing and HTML export.', label: 'Answer 1' },
      q2: { type: 'text', default: 'How does the AI work?', label: 'Question 2' },
      a2: { type: 'text', default: 'AI helps polish your designs using natural language prompts.', label: 'Answer 2' },
    },
    variants: [
      {
        id: 'accordion',
        name: 'Accordion',
        template: `<section style="padding:96px 24px;max-width:700px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="border-bottom:1px solid #eee;padding:16px 0;">
            <div style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="q1">{{q1}}</div>
            <p style="color:#666;" data-bloxx-slot="a1">{{a1}}</p>
          </div>
          <div style="border-bottom:1px solid #eee;padding:16px 0;">
            <div style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="q2">{{q2}}</div>
            <p style="color:#666;" data-bloxx-slot="a2">{{a2}}</p>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Footer ──────────────────────────────────────────
  {
    id: 'footer-simple',
    name: 'Simple Footer',
    category: 'footer',
    description: 'Copyright + links',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      copyright: { type: 'text', default: '© 2026 Bloxx. All rights reserved.', label: 'Copyright text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<footer style="text-align:center;padding:48px 24px;border-top:1px solid #eee;color:#888;font-size:0.875rem;">
          <div style="display:flex;gap:24px;justify-content:center;margin-bottom:16px;">
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
            <a href="#">Contact</a>
          </div>
          <div data-bloxx-slot="copyright">{{copyright}}</div>
        </footer>`,
      },
      {
        id: 'multi-column',
        name: 'Multi-Column',
        template: `<footer style="padding:64px 24px 32px;max-width:1200px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:48px;margin-bottom:48px;">
            <div><div style="font-weight:700;margin-bottom:12px;">Bloxx</div><p style="color:#888;font-size:0.875rem;">Building the future of design.</p></div>
            <div><div style="font-weight:600;margin-bottom:8px;">Product</div><div style="display:flex;flex-direction:column;gap:4px;color:#888;font-size:0.875rem;"><a href="#">Features</a><a href="#">Pricing</a></div></div>
            <div><div style="font-weight:600;margin-bottom:8px;">Company</div><div style="display:flex;flex-direction:column;gap:4px;color:#888;font-size:0.875rem;"><a href="#">About</a><a href="#">Blog</a></div></div>
            <div><div style="font-weight:600;margin-bottom:8px;">Legal</div><div style="display:flex;flex-direction:column;gap:4px;color:#888;font-size:0.875rem;"><a href="#">Privacy</a><a href="#">Terms</a></div></div>
          </div>
          <div style="border-top:1px solid #eee;padding-top:24px;text-align:center;color:#888;font-size:0.875rem;" data-bloxx-slot="copyright">{{copyright}}</div>
        </footer>`,
      },
    ],
  },

  // ─── Logo Cloud ──────────────────────────────────────
  {
    id: 'logo-cloud',
    name: 'Logo Cloud',
    category: 'content',
    description: 'Row of company logos / trust indicators',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Trusted by leading teams', label: 'Heading' },
    },
    variants: [
      {
        id: 'default',
        name: 'Static Grid',
        template: `<section style="text-align:center;padding:64px 24px;">
          <p style="color:#888;margin-bottom:32px;font-size:0.875rem;text-transform:uppercase;letter-spacing:1px;" data-bloxx-slot="heading">{{heading}}</p>
          <div style="display:flex;gap:48px;justify-content:center;align-items:center;flex-wrap:wrap;color:#bbb;font-weight:600;">
            <span style="font-size:1.25rem;">Company A</span>
            <span style="font-size:1.25rem;">Company B</span>
            <span style="font-size:1.25rem;">Company C</span>
            <span style="font-size:1.25rem;">Company D</span>
            <span style="font-size:1.25rem;">Company E</span>
          </div>
        </section>`,
      },
      {
        id: 'carousel',
        name: 'Carousel',
        template: `<section style="text-align:center;padding:64px 24px;overflow:hidden;">
          <p style="color:#888;margin-bottom:40px;font-size:0.875rem;text-transform:uppercase;letter-spacing:1px;" data-bloxx-slot="heading">{{heading}}</p>
          <div style="display:flex;gap:64px;align-items:center;justify-content:flex-start;white-space:nowrap;">
            <span style="font-size:1.25rem;color:#bbb;font-weight:600;flex-shrink:0;">Company A</span>
            <span style="font-size:1.25rem;color:#bbb;font-weight:600;flex-shrink:0;">Company B</span>
            <span style="font-size:1.25rem;color:#bbb;font-weight:600;flex-shrink:0;">Company C</span>
            <span style="font-size:1.25rem;color:#bbb;font-weight:600;flex-shrink:0;">Company D</span>
            <span style="font-size:1.25rem;color:#bbb;font-weight:600;flex-shrink:0;">Company E</span>
            <span style="font-size:1.25rem;color:#bbb;font-weight:600;flex-shrink:0;">Company F</span>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Stats ───────────────────────────────────────────
  {
    id: 'stats',
    name: 'Stats Section',
    category: 'content',
    description: 'Statistics / metrics display',
    source: 'curated',
    defaultVariant: '4-column',
    schema: {
      stat1_value: { type: 'text', default: '10K+', label: 'Stat 1 value' },
      stat1_label: { type: 'text', default: 'Users', label: 'Stat 1 label' },
      stat2_value: { type: 'text', default: '99.9%', label: 'Stat 2 value' },
      stat2_label: { type: 'text', default: 'Uptime', label: 'Stat 2 label' },
      stat3_value: { type: 'text', default: '50M+', label: 'Stat 3 value' },
      stat3_label: { type: 'text', default: 'Blocks built', label: 'Stat 3 label' },
      stat4_value: { type: 'text', default: '4.9★', label: 'Stat 4 value' },
      stat4_label: { type: 'text', default: 'Rating', label: 'Stat 4 label' },
    },
    variants: [
      {
        id: '4-column',
        name: '4 Columns',
        template: `<section style="padding:64px 24px;max-width:1000px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center;">
            <div><div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat1_value">{{stat1_value}}</div><div style="color:#888;" data-bloxx-slot="stat1_label">{{stat1_label}}</div></div>
            <div><div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat2_value">{{stat2_value}}</div><div style="color:#888;" data-bloxx-slot="stat2_label">{{stat2_label}}</div></div>
            <div><div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat3_value">{{stat3_value}}</div><div style="color:#888;" data-bloxx-slot="stat3_label">{{stat3_label}}</div></div>
            <div><div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat4_value">{{stat4_value}}</div><div style="color:#888;" data-bloxx-slot="stat4_label">{{stat4_label}}</div></div>
          </div>
        </section>`,
      },
      {
        id: 'with-icons',
        name: 'With Icons',
        template: `<section style="padding:64px 24px;max-width:1000px;margin:0 auto;">
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px;text-align:center;">
            <div style="padding:32px 16px;background:#f8fafc;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:8px;">👥</div>
              <div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat1_value">{{stat1_value}}</div>
              <div style="color:#888;" data-bloxx-slot="stat1_label">{{stat1_label}}</div>
            </div>
            <div style="padding:32px 16px;background:#f8fafc;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:8px;">⚡</div>
              <div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat2_value">{{stat2_value}}</div>
              <div style="color:#888;" data-bloxx-slot="stat2_label">{{stat2_label}}</div>
            </div>
            <div style="padding:32px 16px;background:#f8fafc;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:8px;">🧱</div>
              <div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat3_value">{{stat3_value}}</div>
              <div style="color:#888;" data-bloxx-slot="stat3_label">{{stat3_label}}</div>
            </div>
            <div style="padding:32px 16px;background:#f8fafc;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:8px;">⭐</div>
              <div style="font-size:2.5rem;font-weight:700;color:#2563EB;" data-bloxx-slot="stat4_value">{{stat4_value}}</div>
              <div style="color:#888;" data-bloxx-slot="stat4_label">{{stat4_label}}</div>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Nav Dropdown ────────────────────────────────────
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
                <a href="#" style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link1_item1">{{link1_item1}}</a>
                <a href="#" style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link1_item2">{{link1_item2}}</a>
              </div>
            </div>
            <div style="position:relative;cursor:pointer;">
              <span data-bloxx-slot="link2">{{link2}} ▾</span>
              <div style="position:absolute;top:100%;left:0;background:#fff;border:1px solid #eee;border-radius:8px;padding:8px;min-width:160px;box-shadow:0 4px 12px rgba(0,0,0,0.1);display:flex;flex-direction:column;gap:4px;">
                <a href="#" style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link2_item1">{{link2_item1}}</a>
                <a href="#" style="padding:8px 12px;border-radius:6px;display:block;color:#333;" data-bloxx-slot="link2_item2">{{link2_item2}}</a>
              </div>
            </div>
            <a href="#" style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</a>
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
                <a href="#" style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link1_item1">{{link1_item1}}</a>
                <a href="#" style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link1_item2">{{link1_item2}}</a>
              </div>
            </div>
            <div style="position:relative;cursor:pointer;">
              <span data-bloxx-slot="link2">{{link2}} ▾</span>
              <div style="position:absolute;top:100%;left:50%;transform:translateX(-50%);background:#fff;border:1px solid #eee;border-radius:12px;padding:16px;min-width:400px;box-shadow:0 8px 24px rgba(0,0,0,0.1);display:grid;grid-template-columns:1fr 1fr;gap:12px;">
                <a href="#" style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link2_item1">{{link2_item1}}</a>
                <a href="#" style="padding:8px 12px;border-radius:6px;color:#333;display:block;font-weight:600;" data-bloxx-slot="link2_item2">{{link2_item2}}</a>
              </div>
            </div>
            <a href="#" style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</a>
          </div>
        </nav>`,
      },
    ],
  },

  // ─── Nav Hamburger ───────────────────────────────────
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
            <a href="#" style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</a>
          </div>
          <div style="position:fixed;top:0;left:-280px;width:280px;height:100vh;background:#fff;border-right:1px solid #eee;padding:48px 24px;display:flex;flex-direction:column;gap:16px;transition:left 0.3s;z-index:100;">
            <div style="font-weight:700;font-size:1.25rem;margin-bottom:24px;" data-bloxx-slot="logo">{{logo}}</div>
            <a href="#" style="font-size:1.125rem;color:#333;" data-bloxx-slot="link1">{{link1}}</a>
            <a href="#" style="font-size:1.125rem;color:#333;" data-bloxx-slot="link2">{{link2}}</a>
            <a href="#" style="font-size:1.125rem;color:#333;" data-bloxx-slot="link3">{{link3}}</a>
            <a href="#" style="background:#2563EB;color:#fff;padding:12px 20px;border-radius:8px;text-align:center;margin-top:16px;">{{cta_text}}</a>
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
            <a href="#" style="background:#2563EB;color:#fff;padding:8px 20px;border-radius:8px;">{{cta_text}}</a>
          </div>
          <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.8);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:24px;z-index:100;">
            <div style="font-weight:700;font-size:1.5rem;color:#fff;margin-bottom:12px;" data-bloxx-slot="logo">{{logo}}</div>
            <a href="#" style="font-size:1.25rem;color:#fff;" data-bloxx-slot="link1">{{link1}}</a>
            <a href="#" style="font-size:1.25rem;color:#fff;" data-bloxx-slot="link2">{{link2}}</a>
            <a href="#" style="font-size:1.25rem;color:#fff;" data-bloxx-slot="link3">{{link3}}</a>
            <a href="#" style="background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-size:1.125rem;margin-top:16px;">{{cta_text}}</a>
          </div>
        </nav>`,
      },
    ],
  },

  // ─── Nav Transparent ─────────────────────────────────
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
            <a href="#" style="opacity:0.85;" data-bloxx-slot="link1">{{link1}}</a>
            <a href="#" style="opacity:0.85;" data-bloxx-slot="link2">{{link2}}</a>
            <a href="#" style="opacity:0.85;" data-bloxx-slot="link3">{{link3}}</a>
            <a href="#" style="background:rgba(255,255,255,0.2);backdrop-filter:blur(8px);color:#fff;padding:8px 20px;border-radius:8px;border:1px solid rgba(255,255,255,0.3);">{{cta_text}}</a>
          </div>
        </nav>`,
      },
    ],
  },

  // ─── Hero Gradient ───────────────────────────────────
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

  // ─── Hero Background Image ───────────────────────────
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

  // ─── Hero Video ──────────────────────────────────────
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
  },

  // ─── Features Tabs ───────────────────────────────────
  {
    id: 'features-tabs',
    name: 'Tabbed Features',
    category: 'features',
    description: 'Tabbed features with content switching panels',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Powerful Features', label: 'Section heading' },
      tab1_label: { type: 'text', default: 'Design', label: 'Tab 1 label' },
      tab1_heading: { type: 'text', default: 'Beautiful Design Tools', label: 'Tab 1 heading' },
      tab1_desc: { type: 'text', default: 'Create stunning interfaces with our intuitive drag-and-drop design tools.', label: 'Tab 1 description' },
      tab2_label: { type: 'text', default: 'Develop', label: 'Tab 2 label' },
      tab2_heading: { type: 'text', default: 'Clean Code Export', label: 'Tab 2 heading' },
      tab2_desc: { type: 'text', default: 'Export production-ready HTML and CSS with a single click.', label: 'Tab 2 description' },
      tab3_label: { type: 'text', default: 'Deploy', label: 'Tab 3 label' },
      tab3_heading: { type: 'text', default: 'One-Click Deploy', label: 'Tab 3 heading' },
      tab3_desc: { type: 'text', default: 'Deploy your site instantly to any hosting provider.', label: 'Tab 3 description' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;gap:4px;margin-bottom:48px;justify-content:center;border-bottom:2px solid #eee;padding-bottom:0;">
            <span style="padding:12px 24px;border-bottom:2px solid #2563EB;margin-bottom:-2px;font-weight:600;cursor:pointer;" data-bloxx-slot="tab1_label">{{tab1_label}}</span>
            <span style="padding:12px 24px;color:#888;cursor:pointer;" data-bloxx-slot="tab2_label">{{tab2_label}}</span>
            <span style="padding:12px 24px;color:#888;cursor:pointer;" data-bloxx-slot="tab3_label">{{tab3_label}}</span>
          </div>
          <div style="display:flex;align-items:center;gap:48px;">
            <div style="flex:1;">
              <h3 style="font-size:1.5rem;font-weight:600;margin-bottom:12px;" data-bloxx-slot="tab1_heading">{{tab1_heading}}</h3>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="tab1_desc">{{tab1_desc}}</p>
            </div>
            <div style="flex:1;background:#f5f5f5;border-radius:12px;height:300px;display:flex;align-items:center;justify-content:center;color:#bbb;">Tab content preview</div>
          </div>
        </section>`,
      },
      {
        id: 'vertical-tabs',
        name: 'Vertical Tabs',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;gap:48px;">
            <div style="display:flex;flex-direction:column;gap:4px;min-width:180px;">
              <span style="padding:12px 20px;background:#2563EB;color:#fff;border-radius:8px;font-weight:600;cursor:pointer;" data-bloxx-slot="tab1_label">{{tab1_label}}</span>
              <span style="padding:12px 20px;color:#666;cursor:pointer;" data-bloxx-slot="tab2_label">{{tab2_label}}</span>
              <span style="padding:12px 20px;color:#666;cursor:pointer;" data-bloxx-slot="tab3_label">{{tab3_label}}</span>
            </div>
            <div style="flex:1;padding:24px;background:#f8fafc;border-radius:12px;">
              <h3 style="font-size:1.5rem;font-weight:600;margin-bottom:12px;" data-bloxx-slot="tab1_heading">{{tab1_heading}}</h3>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="tab1_desc">{{tab1_desc}}</p>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Features Accordion ──────────────────────────────
  {
    id: 'features-accordion',
    name: 'Accordion Features',
    category: 'features',
    description: 'Accordion-style expandable features list',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Features in Detail', label: 'Section heading' },
      item1_title: { type: 'text', default: 'Drag & Drop Editor', label: 'Item 1 title' },
      item1_desc: { type: 'text', default: 'Build layouts visually with our intuitive drag-and-drop interface. No coding required.', label: 'Item 1 description' },
      item2_title: { type: 'text', default: 'AI-Powered Polish', label: 'Item 2 title' },
      item2_desc: { type: 'text', default: 'Let AI refine your designs with smart suggestions for spacing, color, and typography.', label: 'Item 2 description' },
      item3_title: { type: 'text', default: 'HTML Export', label: 'Item 3 title' },
      item3_desc: { type: 'text', default: 'Export clean, semantic HTML and CSS ready for production deployment.', label: 'Item 3 description' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:800px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="border:1px solid #e0e0e0;border-radius:12px;overflow:hidden;">
            <div style="border-bottom:1px solid #e0e0e0;padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:600;" data-bloxx-slot="item1_title">{{item1_title}}</span>
              <span style="font-size:0.75rem;color:#888;">▼</span>
            </div>
            <div style="padding:0 24px 20px;color:#666;line-height:1.6;" data-bloxx-slot="item1_desc">{{item1_desc}}</div>
            <div style="border-bottom:1px solid #e0e0e0;padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:600;" data-bloxx-slot="item2_title">{{item2_title}}</span>
              <span style="font-size:0.75rem;color:#888;">▶</span>
            </div>
            <div style="border-bottom:1px solid #e0e0e0;padding:20px 24px;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
              <span style="font-weight:600;" data-bloxx-slot="item3_title">{{item3_title}}</span>
              <span style="font-size:0.75rem;color:#888;">▶</span>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'boxed',
        name: 'Boxed Cards',
        template: `<section style="padding:96px 24px;max-width:800px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;flex-direction:column;gap:16px;">
            <div style="display:flex;gap:20px;align-items:flex-start;padding:24px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:1.5rem;flex-shrink:0;">🔧</div>
              <div><div style="font-weight:600;margin-bottom:6px;" data-bloxx-slot="item1_title">{{item1_title}}</div><p style="color:#666;line-height:1.5;" data-bloxx-slot="item1_desc">{{item1_desc}}</p></div>
            </div>
            <div style="display:flex;gap:20px;align-items:flex-start;padding:24px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:1.5rem;flex-shrink:0;">🤖</div>
              <div><div style="font-weight:600;margin-bottom:6px;" data-bloxx-slot="item2_title">{{item2_title}}</div><p style="color:#666;line-height:1.5;" data-bloxx-slot="item2_desc">{{item2_desc}}</p></div>
            </div>
            <div style="display:flex;gap:20px;align-items:flex-start;padding:24px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:1.5rem;flex-shrink:0;">📦</div>
              <div><div style="font-weight:600;margin-bottom:6px;" data-bloxx-slot="item3_title">{{item3_title}}</div><p style="color:#666;line-height:1.5;" data-bloxx-slot="item3_desc">{{item3_desc}}</p></div>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Features Icon Grid ──────────────────────────────
  {
    id: 'features-icon-grid',
    name: 'Icon Grid Features',
    category: 'features',
    description: 'Large grid of feature cards with icons (6 items)',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Everything You Need', label: 'Section heading' },
      item1_title: { type: 'text', default: 'Lightning Fast', label: 'Item 1 title' },
      item1_desc: { type: 'text', default: 'Optimized for speed with instant preview updates.', label: 'Item 1 description' },
      item2_title: { type: 'text', default: 'Responsive by Default', label: 'Item 2 title' },
      item2_desc: { type: 'text', default: 'All blocks are designed to work on every screen size.', label: 'Item 2 description' },
      item3_title: { type: 'text', default: 'AI Enhanced', label: 'Item 3 title' },
      item3_desc: { type: 'text', default: 'Smart suggestions to improve your designs instantly.', label: 'Item 3 description' },
      item4_title: { type: 'text', default: 'Version Control', label: 'Item 4 title' },
      item4_desc: { type: 'text', default: 'Track changes and revert to any previous version.', label: 'Item 4 description' },
      item5_title: { type: 'text', default: 'Team Collaboration', label: 'Item 5 title' },
      item5_desc: { type: 'text', default: 'Design together in real-time with your team.', label: 'Item 5 description' },
      item6_title: { type: 'text', default: 'Clean Export', label: 'Item 6 title' },
      item6_desc: { type: 'text', default: 'Production-ready HTML with semantic markup.', label: 'Item 6 description' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:1100px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px;">
            <div style="text-align:center;padding:32px 24px;border-radius:12px;background:#f8fafc;">
              <div style="font-size:2.5rem;margin-bottom:16px;">⚡</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item1_title">{{item1_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item1_desc">{{item1_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 24px;border-radius:12px;background:#f8fafc;">
              <div style="font-size:2.5rem;margin-bottom:16px;">📱</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item2_title">{{item2_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item2_desc">{{item2_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 24px;border-radius:12px;background:#f8fafc;">
              <div style="font-size:2.5rem;margin-bottom:16px;">🤖</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item3_title">{{item3_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item3_desc">{{item3_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 24px;border-radius:12px;background:#f8fafc;">
              <div style="font-size:2.5rem;margin-bottom:16px;">🔄</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item4_title">{{item4_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item4_desc">{{item4_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 24px;border-radius:12px;background:#f8fafc;">
              <div style="font-size:2.5rem;margin-bottom:16px;">👥</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item5_title">{{item5_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item5_desc">{{item5_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 24px;border-radius:12px;background:#f8fafc;">
              <div style="font-size:2.5rem;margin-bottom:16px;">📦</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item6_title">{{item6_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item6_desc">{{item6_desc}}</p>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'bordered',
        name: 'Bordered Cards',
        template: `<section style="padding:96px 24px;max-width:1100px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
            <div style="text-align:center;padding:32px 20px;border:1px solid #e0e0e0;border-radius:12px;transition:box-shadow 0.2s;">
              <div style="font-size:2rem;margin-bottom:12px;color:#2563EB;">⚡</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item1_title">{{item1_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item1_desc">{{item1_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 20px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;color:#2563EB;">📱</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item2_title">{{item2_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item2_desc">{{item2_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 20px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;color:#2563EB;">🤖</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item3_title">{{item3_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item3_desc">{{item3_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 20px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;color:#2563EB;">🔄</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item4_title">{{item4_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item4_desc">{{item4_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 20px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;color:#2563EB;">👥</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item5_title">{{item5_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item5_desc">{{item5_desc}}</p>
            </div>
            <div style="text-align:center;padding:32px 20px;border:1px solid #e0e0e0;border-radius:12px;">
              <div style="font-size:2rem;margin-bottom:12px;color:#2563EB;">📦</div>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="item6_title">{{item6_title}}</h3>
              <p style="color:#666;font-size:0.9375rem;" data-bloxx-slot="item6_desc">{{item6_desc}}</p>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Features Side by Side ───────────────────────────
  {
    id: 'features-side-by-side',
    name: 'Side by Side Features',
    category: 'features',
    description: 'Alternating image and text feature rows',
    source: 'curated',
    defaultVariant: 'image-left',
    schema: {
      heading: { type: 'text', default: 'Built for Modern Teams', label: 'Section heading' },
      feature1_title: { type: 'text', default: 'Visual Editing', label: 'Feature 1 title' },
      feature1_desc: { type: 'text', default: 'Edit your designs visually with real-time preview. See changes as you make them.', label: 'Feature 1 description' },
      feature2_title: { type: 'text', default: 'Smart Components', label: 'Feature 2 title' },
      feature2_desc: { type: 'text', default: 'Reusable components that stay consistent across your entire project.', label: 'Feature 2 description' },
    },
    variants: [
      {
        id: 'image-left',
        name: 'Image Left',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;gap:48px;align-items:center;margin-bottom:64px;">
            <div style="flex:1;background:#f0f0f0;border-radius:12px;height:280px;display:flex;align-items:center;justify-content:center;color:#999;">Image</div>
            <div style="flex:1;">
              <h3 style="font-size:1.5rem;font-weight:600;margin-bottom:12px;" data-bloxx-slot="feature1_title">{{feature1_title}}</h3>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="feature1_desc">{{feature1_desc}}</p>
            </div>
          </div>
          <div style="display:flex;gap:48px;align-items:center;flex-direction:row-reverse;">
            <div style="flex:1;background:#f0f0f0;border-radius:12px;height:280px;display:flex;align-items:center;justify-content:center;color:#999;">Image</div>
            <div style="flex:1;">
              <h3 style="font-size:1.5rem;font-weight:600;margin-bottom:12px;" data-bloxx-slot="feature2_title">{{feature2_title}}</h3>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="feature2_desc">{{feature2_desc}}</p>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'image-right',
        name: 'Image Right',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;gap:48px;align-items:center;margin-bottom:64px;">
            <div style="flex:1;">
              <h3 style="font-size:1.5rem;font-weight:600;margin-bottom:12px;" data-bloxx-slot="feature1_title">{{feature1_title}}</h3>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="feature1_desc">{{feature1_desc}}</p>
            </div>
            <div style="flex:1;background:#f0f0f0;border-radius:12px;height:280px;display:flex;align-items:center;justify-content:center;color:#999;">Image</div>
          </div>
          <div style="display:flex;gap:48px;align-items:center;flex-direction:row-reverse;">
            <div style="flex:1;">
              <h3 style="font-size:1.5rem;font-weight:600;margin-bottom:12px;" data-bloxx-slot="feature2_title">{{feature2_title}}</h3>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="feature2_desc">{{feature2_desc}}</p>
            </div>
            <div style="flex:1;background:#f0f0f0;border-radius:12px;height:280px;display:flex;align-items:center;justify-content:center;color:#999;">Image</div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Pricing 4-Tier ──────────────────────────────────
  {
    id: 'pricing-4-tier',
    name: '4-Tier Pricing',
    category: 'pricing',
    description: 'Four pricing column comparison',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Choose Your Plan', label: 'Heading' },
      tier1_name: { type: 'text', default: 'Free', label: 'Tier 1 name' },
      tier1_price: { type: 'text', default: '$0/mo', label: 'Tier 1 price' },
      tier1_feat1: { type: 'text', default: '3 projects', label: 'Tier 1 feature 1' },
      tier2_name: { type: 'text', default: 'Starter', label: 'Tier 2 name' },
      tier2_price: { type: 'text', default: '$19/mo', label: 'Tier 2 price' },
      tier2_feat1: { type: 'text', default: '10 projects', label: 'Tier 2 feature 1' },
      tier3_name: { type: 'text', default: 'Pro', label: 'Tier 3 name' },
      tier3_price: { type: 'text', default: '$49/mo', label: 'Tier 3 price' },
      tier3_feat1: { type: 'text', default: 'Unlimited projects', label: 'Tier 3 feature 1' },
      tier4_name: { type: 'text', default: 'Enterprise', label: 'Tier 4 name' },
      tier4_price: { type: 'text', default: '$99/mo', label: 'Tier 4 price' },
      tier4_feat1: { type: 'text', default: 'Custom solutions', label: 'Tier 4 feature 1' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:1200px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;">
            <div style="border:1px solid #eee;border-radius:12px;padding:28px 20px;">
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier1_name">{{tier1_name}}</h3>
              <div style="font-size:1.75rem;font-weight:700;margin-bottom:20px;" data-bloxx-slot="tier1_price">{{tier1_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:24px;">
                <li style="padding:6px 0;border-bottom:1px solid #f5f5f5;">✓ {{tier1_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;border:1px solid #ddd;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:28px 20px;">
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier2_name">{{tier2_name}}</h3>
              <div style="font-size:1.75rem;font-weight:700;margin-bottom:20px;" data-bloxx-slot="tier2_price">{{tier2_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:24px;">
                <li style="padding:6px 0;border-bottom:1px solid #f5f5f5;">✓ {{tier2_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;border:1px solid #ddd;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:2px solid #2563EB;border-radius:12px;padding:28px 20px;position:relative;">
              <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#2563EB;color:#fff;padding:4px 16px;border-radius:999px;font-size:0.8rem;">Popular</span>
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier3_name">{{tier3_name}}</h3>
              <div style="font-size:1.75rem;font-weight:700;margin-bottom:20px;" data-bloxx-slot="tier3_price">{{tier3_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:24px;">
                <li style="padding:6px 0;border-bottom:1px solid #f5f5f5;">✓ {{tier3_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;background:#2563EB;color:#fff;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:28px 20px;">
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier4_name">{{tier4_name}}</h3>
              <div style="font-size:1.75rem;font-weight:700;margin-bottom:20px;" data-bloxx-slot="tier4_price">{{tier4_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:24px;">
                <li style="padding:6px 0;border-bottom:1px solid #f5f5f5;">✓ {{tier4_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;border:1px solid #ddd;border-radius:8px;">Contact Sales</a>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'featured',
        name: 'Featured Highlight',
        template: `<section style="padding:96px 24px;max-width:1200px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:20px;align-items:end;">
            <div style="border:1px solid #eee;border-radius:12px;padding:24px 20px;">
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier1_name">{{tier1_name}}</h3>
              <div style="font-size:1.5rem;font-weight:700;margin-bottom:16px;" data-bloxx-slot="tier1_price">{{tier1_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:20px;">
                <li style="padding:6px 0;font-size:0.9375rem;">✓ {{tier1_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:0.9375rem;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:24px 20px;">
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier2_name">{{tier2_name}}</h3>
              <div style="font-size:1.5rem;font-weight:700;margin-bottom:16px;" data-bloxx-slot="tier2_price">{{tier2_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:20px;">
                <li style="padding:6px 0;font-size:0.9375rem;">✓ {{tier2_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:0.9375rem;">Get Started</a>
            </div>
            <div style="border:2px solid #2563EB;border-radius:12px;padding:32px 24px;position:relative;background:#fff;transform:scaleY(1.05);transform-origin:bottom;">
              <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#2563EB;color:#fff;padding:4px 16px;border-radius:999px;font-size:0.8rem;">Popular</span>
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier3_name">{{tier3_name}}</h3>
              <div style="font-size:1.75rem;font-weight:700;margin-bottom:16px;" data-bloxx-slot="tier3_price">{{tier3_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:20px;">
                <li style="padding:6px 0;font-size:0.9375rem;">✓ {{tier3_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;background:#2563EB;color:#fff;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:24px 20px;">
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="tier4_name">{{tier4_name}}</h3>
              <div style="font-size:1.5rem;font-weight:700;margin-bottom:16px;" data-bloxx-slot="tier4_price">{{tier4_price}}</div>
              <ul style="list-style:none;padding:0;margin-bottom:20px;">
                <li style="padding:6px 0;font-size:0.9375rem;">✓ {{tier4_feat1}}</li>
              </ul>
              <a href="#" style="display:block;text-align:center;padding:10px;border:1px solid #ddd;border-radius:8px;font-size:0.9375rem;">Contact Sales</a>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  {
    id: 'pricing-toggle',
    name: 'Toggle Pricing',
    category: 'pricing',
    description: 'Pricing with monthly/yearly toggle',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Simple Pricing', label: 'Heading' },
      monthly_label: { type: 'text', default: 'Monthly', label: 'Monthly label' },
      yearly_label: { type: 'text', default: 'Yearly', label: 'Yearly label' },
      tier1_name: { type: 'text', default: 'Starter', label: 'Tier 1 name' },
      tier1_monthly: { type: 'text', default: '$19/mo', label: 'Tier 1 monthly' },
      tier1_yearly: { type: 'text', default: '$190/yr', label: 'Tier 1 yearly' },
      tier2_name: { type: 'text', default: 'Pro', label: 'Tier 2 name' },
      tier2_monthly: { type: 'text', default: '$49/mo', label: 'Tier 2 monthly' },
      tier2_yearly: { type: 'text', default: '$490/yr', label: 'Tier 2 yearly' },
      tier3_name: { type: 'text', default: 'Enterprise', label: 'Tier 3 name' },
      tier3_contact: { type: 'text', default: 'Contact us', label: 'Tier 3 contact' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:1100px;margin:0 auto;text-align:center;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:32px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:inline-flex;align-items:center;gap:12px;background:#f0f0f0;padding:4px;border-radius:999px;margin-bottom:64px;">
            <span style="padding:8px 20px;background:#fff;border-radius:999px;font-weight:600;cursor:pointer;" data-bloxx-slot="monthly_label">{{monthly_label}}</span>
            <span style="padding:8px 20px;border-radius:999px;cursor:pointer;color:#666;" data-bloxx-slot="yearly_label">{{yearly_label}}</span>
          </div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
            <div style="border:1px solid #eee;border-radius:12px;padding:32px 24px;text-align:center;">
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="tier1_name">{{tier1_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:24px;" data-bloxx-slot="tier1_monthly">{{tier1_monthly}}</div>
              <a href="#" style="display:block;padding:12px;border:1px solid #ddd;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:2px solid #2563EB;border-radius:12px;padding:32px 24px;text-align:center;position:relative;">
              <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#2563EB;color:#fff;padding:4px 16px;border-radius:999px;font-size:0.8rem;">Popular</span>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="tier2_name">{{tier2_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:8px;" data-bloxx-slot="tier2_monthly">{{tier2_monthly}}</div>
              <div style="font-size:0.875rem;color:#888;margin-bottom:24px;" data-bloxx-slot="tier2_yearly">or {{tier2_yearly}}</div>
              <a href="#" style="display:block;padding:12px;background:#2563EB;color:#fff;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:32px 24px;text-align:center;">
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="tier3_name">{{tier3_name}}</h3>
              <div style="font-size:1.5rem;font-weight:600;margin-bottom:24px;color:#666;" data-bloxx-slot="tier3_contact">{{tier3_contact}}</div>
              <a href="#" style="display:block;padding:12px;border:1px solid #ddd;border-radius:8px;">Contact Sales</a>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'annual-only',
        name: 'Annual Only',
        template: `<section style="padding:96px 24px;max-width:1100px;margin:0 auto;text-align:center;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:8px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="color:#888;margin-bottom:48px;">Save 20% with annual billing</p>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
            <div style="border:1px solid #eee;border-radius:12px;padding:32px 24px;text-align:center;">
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="tier1_name">{{tier1_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:24px;" data-bloxx-slot="tier1_yearly">{{tier1_yearly}}</div>
              <a href="#" style="display:block;padding:12px;border:1px solid #ddd;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:2px solid #2563EB;border-radius:12px;padding:32px 24px;text-align:center;position:relative;">
              <span style="position:absolute;top:-12px;left:50%;transform:translateX(-50%);background:#2563EB;color:#fff;padding:4px 16px;border-radius:999px;font-size:0.8rem;">Popular</span>
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="tier2_name">{{tier2_name}}</h3>
              <div style="font-size:2rem;font-weight:700;margin-bottom:24px;" data-bloxx-slot="tier2_yearly">{{tier2_yearly}}</div>
              <a href="#" style="display:block;padding:12px;background:#2563EB;color:#fff;border-radius:8px;">Get Started</a>
            </div>
            <div style="border:1px solid #eee;border-radius:12px;padding:32px 24px;text-align:center;">
              <h3 style="font-weight:600;margin-bottom:8px;" data-bloxx-slot="tier3_name">{{tier3_name}}</h3>
              <div style="font-size:1.5rem;font-weight:600;margin-bottom:24px;color:#666;" data-bloxx-slot="tier3_contact">{{tier3_contact}}</div>
              <a href="#" style="display:block;padding:12px;border:1px solid #ddd;border-radius:8px;">Contact Sales</a>
            </div>
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
            <a href="#" style="background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</a>
            <a href="#" style="padding:14px 32px;border-radius:8px;border:1px solid rgba(255,255,255,0.4);color:#fff;">{{button2_text}}</a>
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
            <a href="#" style="display:inline-block;background:#fff;color:#2563EB;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</a>
          </div>
          <div style="flex:1;background:rgba(255,255,255,0.1);border-radius:12px;height:200px;display:flex;align-items:center;justify-content:center;backdrop-filter:blur(4px);">Dashboard preview</div>
        </section>`,
      },
    ],
  },

  // ─── CTA Modal ───────────────────────────────────────
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
          <a href="#" style="display:inline-block;background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-weight:600;">{{button_text}}</a>
          <div style="position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.5);display:flex;align-items:center;justify-content:center;z-index:100;">
            <div style="background:#fff;border-radius:16px;padding:40px;max-width:420px;width:90%;position:relative;">
              <span style="position:absolute;top:16px;right:16px;cursor:pointer;font-size:1.25rem;color:#888;">✕</span>
              <h3 style="font-size:1.5rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="modal_title">{{modal_title}}</h3>
              <p style="color:#666;margin-bottom:24px;" data-bloxx-slot="modal_desc">{{modal_desc}}</p>
              <input type="email" placeholder="your@email.com" style="width:100%;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;margin-bottom:16px;box-sizing:border-box;" />
              <a href="#" style="display:block;text-align:center;background:#2563EB;color:#fff;padding:12px;border-radius:8px;font-weight:600;">{{button_text}}</a>
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
            <a href="#" style="background:#2563EB;color:#fff;padding:12px 24px;border-radius:8px;font-weight:600;white-space:nowrap;">{{button_text}}</a>
          </div>
        </section>`,
      },
    ],
  },

  {
    id: 'testimonials-carousel',
    name: 'Testimonials Carousel',
    category: 'content',
    description: 'Carousel-style testimonial slider',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Loved by Designers', label: 'Heading' },
      quote1: { type: 'text', default: 'Bloxx completely changed how we prototype. Incredible tool!', label: 'Quote 1' },
      author1: { type: 'text', default: 'Sarah Chen', label: 'Author 1' },
      role1: { type: 'text', default: 'Product Designer at Acme', label: 'Role 1' },
      quote2: { type: 'text', default: 'The AI polish feature alone saves us hours every week.', label: 'Quote 2' },
      author2: { type: 'text', default: 'Mike Johnson', label: 'Author 2' },
      role2: { type: 'text', default: 'Lead Developer at BuildCo', label: 'Role 2' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:900px;margin:0 auto;text-align:center;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;gap:16px;justify-content:center;align-items:stretch;">
            <div style="flex:0 0 400px;background:#f8fafc;border-radius:16px;padding:32px;text-align:left;box-shadow:0 2px 8px rgba(0,0,0,0.04);">
              <div style="color:#f59e0b;font-size:1.25rem;margin-bottom:12px;">★★★★★</div>
              <p style="font-style:italic;line-height:1.6;margin-bottom:16px;" data-bloxx-slot="quote1">"{{quote1}}"</p>
              <div style="font-weight:600;" data-bloxx-slot="author1">{{author1}}</div>
              <div style="color:#888;font-size:0.875rem;" data-bloxx-slot="role1">{{role1}}</div>
            </div>
            <div style="flex:0 0 400px;background:#f8fafc;border-radius:16px;padding:32px;text-align:left;box-shadow:0 2px 8px rgba(0,0,0,0.04);opacity:0.6;">
              <div style="color:#f59e0b;font-size:1.25rem;margin-bottom:12px;">★★★★★</div>
              <p style="font-style:italic;line-height:1.6;margin-bottom:16px;" data-bloxx-slot="quote2">"{{quote2}}"</p>
              <div style="font-weight:600;" data-bloxx-slot="author2">{{author2}}</div>
              <div style="color:#888;font-size:0.875rem;" data-bloxx-slot="role2">{{role2}}</div>
            </div>
          </div>
          <div style="display:flex;gap:8px;justify-content:center;margin-top:32px;">
            <span style="width:10px;height:10px;border-radius:50%;background:#2563EB;cursor:pointer;"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#ddd;cursor:pointer;"></span>
            <span style="width:10px;height:10px;border-radius:50%;background:#ddd;cursor:pointer;"></span>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Testimonials Single ─────────────────────────────
  {
    id: 'testimonials-single',
    name: 'Single Testimonial',
    category: 'content',
    description: 'Large single testimonial with star rating',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      quote: { type: 'text', default: 'Bloxx has been a game-changer for our design team. The speed and flexibility are unmatched.', label: 'Quote' },
      author: { type: 'text', default: 'Alex Rivera', label: 'Author' },
      role: { type: 'text', default: 'VP of Design at TechCorp', label: 'Role' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="text-align:center;padding:96px 24px;max-width:700px;margin:0 auto;">
          <div style="color:#f59e0b;font-size:1.5rem;margin-bottom:24px;">★★★★★</div>
          <blockquote style="font-size:clamp(1.25rem,2.5vw,1.75rem);font-style:italic;line-height:1.6;margin-bottom:32px;color:#333;" data-bloxx-slot="quote">"{{quote}}"</blockquote>
          <div style="width:56px;height:56px;border-radius:50%;background:#2563EB;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#fff;font-weight:700;font-size:1.25rem;">AR</div>
          <div style="font-weight:600;" data-bloxx-slot="author">{{author}}</div>
          <div style="color:#888;font-size:0.875rem;" data-bloxx-slot="role">{{role}}</div>
        </section>`,
      },
      {
        id: 'with-image',
        name: 'With Image',
        template: `<section style="padding:96px 24px;max-width:900px;margin:0 auto;">
          <div style="display:flex;gap:48px;align-items:center;">
            <div style="flex:1;background:#f0f0f0;border-radius:12px;height:300px;display:flex;align-items:center;justify-content:center;color:#999;">Photo</div>
            <div style="flex:1;">
              <div style="color:#f59e0b;font-size:1.25rem;margin-bottom:16px;">★★★★★</div>
              <blockquote style="font-size:1.25rem;font-style:italic;line-height:1.6;margin-bottom:24px;color:#333;" data-bloxx-slot="quote">"{{quote}}"</blockquote>
              <div style="font-weight:600;" data-bloxx-slot="author">{{author}}</div>
              <div style="color:#888;font-size:0.875rem;" data-bloxx-slot="role">{{role}}</div>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  {
    id: 'faq-two-column',
    name: 'Two-Column FAQ',
    category: 'content',
    description: 'FAQ in two-column grid layout',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Frequently Asked Questions', label: 'Heading' },
      q1: { type: 'text', default: 'What is Bloxx?', label: 'Question 1' },
      a1: { type: 'text', default: 'Bloxx is a modern wireframing tool that lets you design and export clean HTML.', label: 'Answer 1' },
      q2: { type: 'text', default: 'How does the AI work?', label: 'Question 2' },
      a2: { type: 'text', default: 'AI helps polish your designs by suggesting improvements to layout, color, and typography.', label: 'Answer 2' },
      q3: { type: 'text', default: 'Can I export my designs?', label: 'Question 3' },
      a3: { type: 'text', default: 'Yes, export clean HTML and CSS with a single click, ready for production.', label: 'Answer 3' },
      q4: { type: 'text', default: 'Is there a free plan?', label: 'Question 4' },
      a4: { type: 'text', default: 'Yes, our free plan includes 3 projects and all core features.', label: 'Answer 4' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px 48px;">
            <div style="padding:20px 0;">
              <div style="font-weight:600;margin-bottom:8px;font-size:1.125rem;" data-bloxx-slot="q1">{{q1}}</div>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="a1">{{a1}}</p>
            </div>
            <div style="padding:20px 0;">
              <div style="font-weight:600;margin-bottom:8px;font-size:1.125rem;" data-bloxx-slot="q2">{{q2}}</div>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="a2">{{a2}}</p>
            </div>
            <div style="padding:20px 0;border-top:1px solid #eee;">
              <div style="font-weight:600;margin-bottom:8px;font-size:1.125rem;" data-bloxx-slot="q3">{{q3}}</div>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="a3">{{a3}}</p>
            </div>
            <div style="padding:20px 0;border-top:1px solid #eee;">
              <div style="font-weight:600;margin-bottom:8px;font-size:1.125rem;" data-bloxx-slot="q4">{{q4}}</div>
              <p style="color:#666;line-height:1.6;" data-bloxx-slot="a4">{{a4}}</p>
            </div>
          </div>
        </section>`,
      },
      {
        id: 'centered',
        name: 'Centered List',
        template: `<section style="padding:96px 24px;max-width:700px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;flex-direction:column;gap:24px;">
            <div style="padding:24px;background:#f8fafc;border-radius:12px;border-left:4px solid #2563EB;">
              <div style="font-weight:600;margin-bottom:6px;font-size:1.125rem;" data-bloxx-slot="q1">{{q1}}</div>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="a1">{{a1}}</p>
            </div>
            <div style="padding:24px;background:#f8fafc;border-radius:12px;border-left:4px solid #2563EB;">
              <div style="font-weight:600;margin-bottom:6px;font-size:1.125rem;" data-bloxx-slot="q2">{{q2}}</div>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="a2">{{a2}}</p>
            </div>
            <div style="padding:24px;background:#f8fafc;border-radius:12px;border-left:4px solid #2563EB;">
              <div style="font-weight:600;margin-bottom:6px;font-size:1.125rem;" data-bloxx-slot="q3">{{q3}}</div>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="a3">{{a3}}</p>
            </div>
            <div style="padding:24px;background:#f8fafc;border-radius:12px;border-left:4px solid #2563EB;">
              <div style="font-weight:600;margin-bottom:6px;font-size:1.125rem;" data-bloxx-slot="q4">{{q4}}</div>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="a4">{{a4}}</p>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  {
    id: 'footer-social',
    name: 'Social Footer',
    category: 'footer',
    description: 'Footer with social media icons',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      copyright: { type: 'text', default: '© 2026 Bloxx. All rights reserved.', label: 'Copyright text' },
      tagline: { type: 'text', default: 'Building the future of design, one block at a time.', label: 'Tagline' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<footer style="padding:64px 24px 32px;max-width:1200px;margin:0 auto;border-top:1px solid #eee;">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:32px;flex-wrap:wrap;gap:16px;">
            <div>
              <div style="font-weight:700;font-size:1.25rem;margin-bottom:4px;">Bloxx</div>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="tagline">{{tagline}}</p>
            </div>
            <div style="display:flex;gap:12px;">
              <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:8px;cursor:pointer;font-size:1.125rem;">𝕏</span>
              <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:8px;cursor:pointer;font-size:1.125rem;">in</span>
              <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:8px;cursor:pointer;font-size:1.125rem;">f</span>
              <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:8px;cursor:pointer;font-size:1.125rem;">▶</span>
            </div>
          </div>
          <div style="display:flex;justify-content:space-between;align-items:center;padding-top:24px;border-top:1px solid #f0f0f0;color:#888;font-size:0.875rem;flex-wrap:wrap;gap:8px;">
            <div data-bloxx-slot="copyright">{{copyright}}</div>
            <div style="display:flex;gap:16px;">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
            </div>
          </div>
        </footer>`,
      },
      {
        id: 'centered',
        name: 'Centered',
        template: `<footer style="text-align:center;padding:48px 24px;border-top:1px solid #eee;max-width:600px;margin:0 auto;">
          <div style="font-weight:700;font-size:1.25rem;margin-bottom:4px;">Bloxx</div>
          <p style="color:#888;font-size:0.875rem;margin-bottom:24px;" data-bloxx-slot="tagline">{{tagline}}</p>
          <div style="display:flex;gap:16px;justify-content:center;margin-bottom:24px;">
            <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:50%;cursor:pointer;">𝕏</span>
            <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:50%;cursor:pointer;">in</span>
            <span style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:#f0f0f0;border-radius:50%;cursor:pointer;">f</span>
          </div>
          <div style="color:#888;font-size:0.875rem;" data-bloxx-slot="copyright">{{copyright}}</div>
        </footer>`,
      },
    ],
  },

  {
    id: 'footer-minimal',
    name: 'Minimal Footer',
    category: 'footer',
    description: 'Minimal copyright-only footer',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      copyright: { type: 'text', default: '© 2026 Bloxx. All rights reserved.', label: 'Copyright text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<footer style="text-align:center;padding:24px;border-top:1px solid #eee;color:#888;font-size:0.875rem;">
          <div data-bloxx-slot="copyright">{{copyright}}</div>
        </footer>`,
      },
    ],
  },

  // ─── Team Grid ───────────────────────────────────────
  {
    id: 'team-grid',
    name: 'Team Grid',
    category: 'content',
    description: 'Team member card grid',
    source: 'curated',
    defaultVariant: '3-column',
    schema: {
      heading: { type: 'text', default: 'Meet Our Team', label: 'Heading' },
      member1_name: { type: 'text', default: 'Alice Johnson', label: 'Member 1 name' },
      member1_role: { type: 'text', default: 'CEO & Founder', label: 'Member 1 role' },
      member2_name: { type: 'text', default: 'Bob Smith', label: 'Member 2 name' },
      member2_role: { type: 'text', default: 'CTO', label: 'Member 2 role' },
      member3_name: { type: 'text', default: 'Carol Davis', label: 'Member 3 name' },
      member3_role: { type: 'text', default: 'Design Lead', label: 'Member 3 role' },
      member4_name: { type: 'text', default: 'Dan Wilson', label: 'Member 4 name' },
      member4_role: { type: 'text', default: 'Engineering', label: 'Member 4 role' },
      member5_name: { type: 'text', default: 'Eva Martinez', label: 'Member 5 name' },
      member5_role: { type: 'text', default: 'Product Manager', label: 'Member 5 role' },
      member6_name: { type: 'text', default: 'Frank Lee', label: 'Member 6 name' },
      member6_role: { type: 'text', default: 'Marketing', label: 'Member 6 role' },
    },
    variants: [
      {
        id: '3-column',
        name: '3 Column',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px;">
            <div style="text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;background:#e0e7ff;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#2563EB;font-weight:700;font-size:1.5rem;">AJ</div>
              <h3 style="font-weight:600;" data-bloxx-slot="member1_name">{{member1_name}}</h3>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="member1_role">{{member1_role}}</p>
            </div>
            <div style="text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;background:#fce7f3;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#db2777;font-weight:700;font-size:1.5rem;">BS</div>
              <h3 style="font-weight:600;" data-bloxx-slot="member2_name">{{member2_name}}</h3>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="member2_role">{{member2_role}}</p>
            </div>
            <div style="text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;background:#dcfce7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#16a34a;font-weight:700;font-size:1.5rem;">CD</div>
              <h3 style="font-weight:600;" data-bloxx-slot="member3_name">{{member3_name}}</h3>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="member3_role">{{member3_role}}</p>
            </div>
            <div style="text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;background:#fef3c7;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#d97706;font-weight:700;font-size:1.5rem;">DW</div>
              <h3 style="font-weight:600;" data-bloxx-slot="member4_name">{{member4_name}}</h3>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="member4_role">{{member4_role}}</p>
            </div>
            <div style="text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;background:#ede9fe;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#7c3aed;font-weight:700;font-size:1.5rem;">EM</div>
              <h3 style="font-weight:600;" data-bloxx-slot="member5_name">{{member5_name}}</h3>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="member5_role">{{member5_role}}</p>
            </div>
            <div style="text-align:center;">
              <div style="width:96px;height:96px;border-radius:50%;background:#e0f2fe;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;color:#0284c7;font-weight:700;font-size:1.5rem;">FL</div>
              <h3 style="font-weight:600;" data-bloxx-slot="member6_name">{{member6_name}}</h3>
              <p style="color:#888;font-size:0.875rem;" data-bloxx-slot="member6_role">{{member6_role}}</p>
            </div>
          </div>
        </section>`,
      },
      {
        id: '4-column',
        name: '4 Column',
        template: `<section style="padding:96px 24px;max-width:1100px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px;">
            <div style="text-align:center;padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="width:72px;height:72px;border-radius:50%;background:#e0e7ff;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#2563EB;font-weight:700;">AJ</div>
              <h3 style="font-weight:600;font-size:0.9375rem;" data-bloxx-slot="member1_name">{{member1_name}}</h3>
              <p style="color:#888;font-size:0.8125rem;" data-bloxx-slot="member1_role">{{member1_role}}</p>
            </div>
            <div style="text-align:center;padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="width:72px;height:72px;border-radius:50%;background:#fce7f3;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#db2777;font-weight:700;">BS</div>
              <h3 style="font-weight:600;font-size:0.9375rem;" data-bloxx-slot="member2_name">{{member2_name}}</h3>
              <p style="color:#888;font-size:0.8125rem;" data-bloxx-slot="member2_role">{{member2_role}}</p>
            </div>
            <div style="text-align:center;padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="width:72px;height:72px;border-radius:50%;background:#dcfce7;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#16a34a;font-weight:700;">CD</div>
              <h3 style="font-weight:600;font-size:0.9375rem;" data-bloxx-slot="member3_name">{{member3_name}}</h3>
              <p style="color:#888;font-size:0.8125rem;" data-bloxx-slot="member3_role">{{member3_role}}</p>
            </div>
            <div style="text-align:center;padding:24px;border:1px solid #eee;border-radius:12px;">
              <div style="width:72px;height:72px;border-radius:50%;background:#fef3c7;display:flex;align-items:center;justify-content:center;margin:0 auto 12px;color:#d97706;font-weight:700;">DW</div>
              <h3 style="font-weight:600;font-size:0.9375rem;" data-bloxx-slot="member4_name">{{member4_name}}</h3>
              <p style="color:#888;font-size:0.8125rem;" data-bloxx-slot="member4_role">{{member4_role}}</p>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Contact Form ────────────────────────────────────
  {
    id: 'contact-form',
    name: 'Contact Form',
    category: 'content',
    description: 'Contact us form section',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Get in Touch', label: 'Heading' },
      description: { type: 'text', default: 'Have a question or want to work together? Drop us a message.', label: 'Description' },
      button_text: { type: 'text', default: 'Send Message', label: 'Button text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:600px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:8px;" data-bloxx-slot="heading">{{heading}}</h2>
          <p style="text-align:center;color:#666;margin-bottom:48px;" data-bloxx-slot="description">{{description}}</p>
          <form>
            <div style="margin-bottom:16px;">
              <label style="display:block;margin-bottom:6px;font-weight:500;font-size:0.9375rem;">Name</label>
              <input type="text" placeholder="Your name" style="width:100%;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:16px;">
              <label style="display:block;margin-bottom:6px;font-weight:500;font-size:0.9375rem;">Email</label>
              <input type="email" placeholder="your@email.com" style="width:100%;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;box-sizing:border-box;" />
            </div>
            <div style="margin-bottom:24px;">
              <label style="display:block;margin-bottom:6px;font-weight:500;font-size:0.9375rem;">Message</label>
              <textarea placeholder="Your message" rows="4" style="width:100%;padding:12px 16px;border:1px solid #ddd;border-radius:8px;font-size:1rem;box-sizing:border-box;resize:vertical;font-family:inherit;"></textarea>
            </div>
            <a href="#" style="display:block;text-align:center;background:#2563EB;color:#fff;padding:14px;border-radius:8px;font-weight:600;">{{button_text}}</a>
          </form>
        </section>`,
      },
    ],
  },

  // ─── Timeline ────────────────────────────────────────
  {
    id: 'timeline',
    name: 'Timeline',
    category: 'content',
    description: 'Chronological timeline/schedule display',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Our Journey', label: 'Heading' },
      event1_date: { type: 'text', default: '2024 Q1', label: 'Event 1 date' },
      event1_title: { type: 'text', default: 'Idea & Research', label: 'Event 1 title' },
      event1_desc: { type: 'text', default: 'Identified the need for a faster design-to-code workflow.', label: 'Event 1 description' },
      event2_date: { type: 'text', default: '2024 Q2', label: 'Event 2 date' },
      event2_title: { type: 'text', default: 'First Prototype', label: 'Event 2 title' },
      event2_desc: { type: 'text', default: 'Built the first version of the block-based editor.', label: 'Event 2 description' },
      event3_date: { type: 'text', default: '2024 Q3', label: 'Event 3 date' },
      event3_title: { type: 'text', default: 'Beta Launch', label: 'Event 3 title' },
      event3_desc: { type: 'text', default: 'Released beta to early access users for feedback.', label: 'Event 3 description' },
      event4_date: { type: 'text', default: '2025', label: 'Event 4 date' },
      event4_title: { type: 'text', default: 'Public Launch', label: 'Event 4 title' },
      event4_desc: { type: 'text', default: 'Bloxx is available to everyone.', label: 'Event 4 description' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:800px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="position:relative;padding-left:32px;border-left:3px solid #2563EB;">
            <div style="position:relative;padding-bottom:40px;">
              <div style="position:absolute;left:-40px;top:4px;width:16px;height:16px;border-radius:50%;background:#2563EB;border:3px solid #fff;box-shadow:0 0 0 2px #2563EB;"></div>
              <div style="font-size:0.875rem;color:#2563EB;font-weight:600;margin-bottom:4px;" data-bloxx-slot="event1_date">{{event1_date}}</div>
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="event1_title">{{event1_title}}</h3>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="event1_desc">{{event1_desc}}</p>
            </div>
            <div style="position:relative;padding-bottom:40px;">
              <div style="position:absolute;left:-40px;top:4px;width:16px;height:16px;border-radius:50%;background:#2563EB;border:3px solid #fff;box-shadow:0 0 0 2px #2563EB;"></div>
              <div style="font-size:0.875rem;color:#2563EB;font-weight:600;margin-bottom:4px;" data-bloxx-slot="event2_date">{{event2_date}}</div>
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="event2_title">{{event2_title}}</h3>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="event2_desc">{{event2_desc}}</p>
            </div>
            <div style="position:relative;padding-bottom:40px;">
              <div style="position:absolute;left:-40px;top:4px;width:16px;height:16px;border-radius:50%;background:#2563EB;border:3px solid #fff;box-shadow:0 0 0 2px #2563EB;"></div>
              <div style="font-size:0.875rem;color:#2563EB;font-weight:600;margin-bottom:4px;" data-bloxx-slot="event3_date">{{event3_date}}</div>
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="event3_title">{{event3_title}}</h3>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="event3_desc">{{event3_desc}}</p>
            </div>
            <div style="position:relative;">
              <div style="position:absolute;left:-40px;top:4px;width:16px;height:16px;border-radius:50%;background:#2563EB;border:3px solid #fff;box-shadow:0 0 0 2px #2563EB;"></div>
              <div style="font-size:0.875rem;color:#2563EB;font-weight:600;margin-bottom:4px;" data-bloxx-slot="event4_date">{{event4_date}}</div>
              <h3 style="font-weight:600;margin-bottom:4px;" data-bloxx-slot="event4_title">{{event4_title}}</h3>
              <p style="color:#666;line-height:1.5;" data-bloxx-slot="event4_desc">{{event4_desc}}</p>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Comparison Table ────────────────────────────────
  {
    id: 'comparison-table',
    name: 'Comparison Table',
    category: 'content',
    description: 'Feature comparison table',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Compare Plans', label: 'Heading' },
      feat1: { type: 'text', default: 'Project limit', label: 'Feature 1' },
      feat2: { type: 'text', default: 'Team members', label: 'Feature 2' },
      feat3: { type: 'text', default: 'Export formats', label: 'Feature 3' },
      feat4: { type: 'text', default: 'AI features', label: 'Feature 4' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:900px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:48px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="overflow-x:auto;">
            <table style="width:100%;border-collapse:collapse;">
              <thead>
                <tr>
                  <th style="text-align:left;padding:16px 20px;border-bottom:2px solid #2563EB;font-weight:600;">Feature</th>
                  <th style="text-align:center;padding:16px 20px;border-bottom:2px solid #2563EB;font-weight:600;">Free</th>
                  <th style="text-align:center;padding:16px 20px;border-bottom:2px solid #2563EB;background:#f0f7ff;font-weight:600;">Pro</th>
                  <th style="text-align:center;padding:16px 20px;border-bottom:2px solid #2563EB;font-weight:600;">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #eee;" data-bloxx-slot="feat1">{{feat1}}</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;color:#888;">3</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;background:#f8fafc;font-weight:500;">Unlimited</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;font-weight:500;">Unlimited</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #eee;" data-bloxx-slot="feat2">{{feat2}}</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;color:#888;">1</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;background:#f8fafc;font-weight:500;">5</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;font-weight:500;">Unlimited</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #eee;" data-bloxx-slot="feat3">{{feat3}}</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;color:#888;">HTML</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;background:#f8fafc;font-weight:500;">HTML + CSS</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;font-weight:500;">All formats</td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #eee;" data-bloxx-slot="feat4">{{feat4}}</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;color:#888;">—</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;background:#f8fafc;font-weight:500;">✓</td>
                  <td style="text-align:center;padding:14px 20px;border-bottom:1px solid #eee;font-weight:500;">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Schedule Demo ───────────────────────────────────
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
          <a href="#" style="display:inline-block;background:#2563EB;color:#fff;padding:14px 36px;border-radius:8px;font-weight:600;">{{button_text}}</a>
          <p style="color:#888;font-size:0.875rem;margin-top:12px;">No credit card required</p>
        </section>`,
      },
    ],
  },

  // ─── Rich Text ───────────────────────────────────────
  {
    id: 'rich-text',
    name: 'Rich Text Content',
    category: 'content',
    description: 'Simple rich text content section',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'About Bloxx', label: 'Heading' },
      content: { type: 'text', default: 'Bloxx is a modern design tool that bridges the gap between wireframing and production code. Our mission is to make web design accessible to everyone, from solo creators to enterprise teams.\n\nWith a growing library of 40+ curated blocks, you can build beautiful, responsive layouts in minutes — not hours. Every block is crafted with care, using semantic HTML and clean inline styles that export ready for production.\n\nWhether you are prototyping a new idea or building a full marketing site, Bloxx gives you the speed of a wireframing tool with the power of a production build system.', label: 'Content (use \\n for paragraphs)' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:720px;margin:0 auto;">
          <h2 style="font-size:2rem;font-weight:700;margin-bottom:24px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="color:#555;line-height:1.8;font-size:1.0625rem;" data-bloxx-slot="content">{{content}}</div>
        </section>`,
      },
    ],
  },

  // ─── Features Alternating (Single Highlight) ─────────
  {
    id: 'features-alternating',
    name: 'Feature Highlight',
    category: 'features',
    description: 'Single feature highlight with callout',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Why Bloxx?', label: 'Heading' },
      highlight_title: { type: 'text', default: 'Design at the Speed of Thought', label: 'Highlight title' },
      highlight_desc: { type: 'text', default: 'With our block-based approach, you can go from blank canvas to production-ready HTML in minutes. No coding required, no design skills needed — just drag, drop, and publish.', label: 'Highlight description' },
      stat_text: { type: 'text', default: '10x faster than traditional tools', label: 'Stat callout' },
      cta_text: { type: 'text', default: 'Try It Free →', label: 'CTA text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:96px 24px;max-width:1000px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:64px;" data-bloxx-slot="heading">{{heading}}</h2>
          <div style="display:flex;align-items:center;gap:48px;">
            <div style="flex:1;background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);border-radius:16px;height:320px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.25rem;font-weight:600;">Speed Demo</div>
            <div style="flex:1;">
              <span style="display:inline-block;background:#e0e7ff;color:#2563EB;padding:4px 12px;border-radius:999px;font-size:0.875rem;font-weight:500;margin-bottom:16px;" data-bloxx-slot="stat_text">{{stat_text}}</span>
              <h3 style="font-size:1.75rem;font-weight:700;line-height:1.2;margin-bottom:16px;" data-bloxx-slot="highlight_title">{{highlight_title}}</h3>
              <p style="color:#666;line-height:1.7;margin-bottom:24px;" data-bloxx-slot="highlight_desc">{{highlight_desc}}</p>
              <a href="#" style="display:inline-block;color:#2563EB;font-weight:600;">{{cta_text}}</a>
            </div>
          </div>
        </section>`,
      },
    ],
  },

  // ─── Pricing Enterprise Callout ──────────────────────
  {
    id: 'pricing-enterprise',
    name: 'Enterprise Callout',
    category: 'pricing',
    description: 'Enterprise-tier section callout',
    source: 'curated',
    defaultVariant: 'default',
    schema: {
      heading: { type: 'text', default: 'Enterprise Plan', label: 'Heading' },
      description: { type: 'text', default: 'Need a custom solution for your organization? Our Enterprise plan offers dedicated support, custom integrations, and volume pricing.', label: 'Description' },
      feature1: { type: 'text', default: 'Dedicated account manager', label: 'Feature 1' },
      feature2: { type: 'text', default: 'Custom integrations', label: 'Feature 2' },
      feature3: { type: 'text', default: 'SSO & advanced security', label: 'Feature 3' },
      feature4: { type: 'text', default: 'SLA guarantee', label: 'Feature 4' },
      cta_text: { type: 'text', default: 'Contact Sales', label: 'CTA text' },
    },
    variants: [
      {
        id: 'default',
        name: 'Default',
        template: `<section style="padding:80px 24px;max-width:1000px;margin:0 auto;">
          <div style="display:flex;align-items:center;gap:48px;background:linear-gradient(135deg,#1e293b 0%,#334155 100%);border-radius:16px;padding:48px;color:#fff;">
            <div style="flex:1.5;">
              <h2 style="font-size:1.75rem;font-weight:700;margin-bottom:12px;" data-bloxx-slot="heading">{{heading}}</h2>
              <p style="opacity:0.85;line-height:1.6;margin-bottom:24px;" data-bloxx-slot="description">{{description}}</p>
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 24px;margin-bottom:24px;">
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#4ade80;">✓</span> <span style="opacity:0.9;" data-bloxx-slot="feature1">{{feature1}}</span></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#4ade80;">✓</span> <span style="opacity:0.9;" data-bloxx-slot="feature2">{{feature2}}</span></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#4ade80;">✓</span> <span style="opacity:0.9;" data-bloxx-slot="feature3">{{feature3}}</span></div>
                <div style="display:flex;align-items:center;gap:8px;"><span style="color:#4ade80;">✓</span> <span style="opacity:0.9;" data-bloxx-slot="feature4">{{feature4}}</span></div>
              </div>
              <a href="#" style="display:inline-block;background:#2563EB;color:#fff;padding:14px 32px;border-radius:8px;font-weight:600;">{{cta_text}}</a>
            </div>
            <div style="flex:1;text-align:center;">
              <div style="font-size:3rem;font-weight:700;margin-bottom:4px;">Custom</div>
              <div style="opacity:0.7;">Pricing</div>
            </div>
          </div>
        </section>`,
      },
    ],
  },
]