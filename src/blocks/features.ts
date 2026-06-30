import type { BlockDefinition } from '../types'

export const featuresBlocks: BlockDefinition[] = [
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
              <span style="display:inline-block;color:#2563EB;font-weight:600;">{{cta_text}}</span>
            </div>
          </div>
        </section>`,
      },
    ],
  }
]
