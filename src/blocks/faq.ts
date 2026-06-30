import type { BlockDefinition } from '../types'

export const faqBlocks: BlockDefinition[] = [
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
  }
]
