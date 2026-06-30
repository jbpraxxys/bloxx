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
        name: 'Default',
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
    ],
  },
]