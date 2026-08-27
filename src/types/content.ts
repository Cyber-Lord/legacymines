/**
 * Shapes for everything editable in `src/content/`.
 * If you add a field here, TypeScript will tell you every place that needs it.
 */

export interface NavLink {
  label: string
  /** In-page anchor, e.g. "#about". */
  href: `#${string}`
}

export interface Cta {
  label: string
  href: string
}

export interface Company {
  /** Registered name, exactly as on the CAC certificate. */
  name: string
  shortName: string
  /** Strapline from the logo. */
  tagline: string
  /** One-line descriptor used in the hero and for SEO. */
  descriptor: string
  rcNumber: string
  registeredIn: string
}

export interface ContactDetails {
  addressLines: string[]
  phones: string[]
  emails: string[]
  /**
   * Optional POST endpoint for the enquiry form (e.g. a Formspree URL).
   * Leave empty to open the visitor's email app with the message prepared.
   */
  formEndpoint: string
}

export interface SiteAssets {
  logoFull: string
  logoEmblem: string
  founderPhoto: string
}

export interface HeroContent {
  eyebrow: string
  heading: string
  lede: string
  primaryCta: Cta
  secondaryCta: Cta
}

export interface AboutContent {
  eyebrow: string
  heading: string
  paragraphs: string[]
  vision: string
  mission: string
}

export interface Stage {
  title: string
  body: string
  /** Shown above the first and last stage only, e.g. "Upstream". */
  stageLabel?: string
}

export interface BusinessContent {
  eyebrow: string
  heading: string
  lede: string
  stages: Stage[]
  note: string
}

export interface GallerySlide {
  /** Path under /public, e.g. "/images/gallery/site-01.jpg". */
  src: string
  /** Describe the picture for screen readers. Empty string for a purely decorative slide. */
  alt: string
  /** Optional line printed under the frame. */
  caption?: string
  /**
   * Fit the whole image inside the frame instead of cropping it to fill.
   * Right for logos and drawings; leave off for photographs.
   */
  contain?: boolean
}

export interface GalleryContent {
  eyebrow: string
  heading: string
  lede: string
  /** Seconds each slide is held before the slideshow advances. */
  intervalSeconds: number
  slides: GallerySlide[]
}

export interface Person {
  name: string
  role: string
  photo: string
  photoAlt: string
  origin: string
  bio: string[]
}

export interface LeadershipContent {
  eyebrow: string
  founder: Person
}

export interface Principle {
  title: string
  body: string
}

export interface ApproachContent {
  eyebrow: string
  heading: string
  principles: Principle[]
}

export interface Column {
  eyebrow: string
  heading: string
  paragraphs: string[]
}

export interface OutlookContent {
  opportunity: Column
  legacy: Column
}

export interface ClosingContent {
  values: string[]
  ambition: string[]
  contactEyebrow: string
  contactHeading: string
}
