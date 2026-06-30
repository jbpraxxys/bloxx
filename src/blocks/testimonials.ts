import type { BlockDefinition } from '../types'

export const testimonialsBlocks: BlockDefinition[] = [
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
  }
]
