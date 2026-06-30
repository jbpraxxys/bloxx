import type { BlockDefinition } from '../types'

export const pricingBlocks: BlockDefinition[] = [
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
  }
]
