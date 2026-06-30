import type { BlockDefinition } from '../types'

import { navigationBlocks } from './navigation'
import { heroBlocks } from './hero'
import { featuresBlocks } from './features'
import { pricingBlocks } from './pricing'
import { ctaBlocks } from './cta'
import { testimonialsBlocks } from './testimonials'
import { faqBlocks } from './faq'
import { footerBlocks } from './footer'
import { contentBlocks } from './content'
import { miscBlocks } from './misc'

export const curatedBlocks: BlockDefinition[] = [
  ...navigationBlocks,
  ...heroBlocks,
  ...featuresBlocks,
  ...pricingBlocks,
  ...ctaBlocks,
  ...testimonialsBlocks,
  ...faqBlocks,
  ...footerBlocks,
  ...contentBlocks,
  ...miscBlocks,
]
