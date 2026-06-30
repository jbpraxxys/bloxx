import type { BlockDefinition } from '../types'

export const contentBlocks: BlockDefinition[] = [
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
            <span style="display:block;text-align:center;background:#2563EB;color:#fff;padding:14px;border-radius:8px;font-weight:600;">{{button_text}}</span>
          </form>
        </section>`,
      },
    ],
  },

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
  }
]
