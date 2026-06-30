import type { BlockDefinition } from '../types'

export const footerBlocks: BlockDefinition[] = [
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
  }
]
