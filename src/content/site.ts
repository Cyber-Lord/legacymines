/**
 * Company-wide facts: name, contact details, navigation, image paths.
 * Anything in square brackets is a placeholder waiting for the real value.
 */
import type { Company, ContactDetails, Cta, NavLink, SiteAssets } from '@/types/content'

export const company: Company = {
  name: 'Legacy Minerals Limited',
  shortName: 'Legacy Minerals',
  tagline: 'Mining today. Building tomorrow. Leaving a legacy.',
  descriptor: 'Building value from Nigeria’s mineral wealth',
  rcNumber: '[Add RC number]',
  registeredIn: 'Nigeria',
}

export const contact: ContactDetails = {
  addressLines: ['[Add office address]'],
  phones: ['[Add phone number]'],
  emails: ['[Add company email]'],
  formEndpoint: '',
}

export const nav: NavLink[] = [
  { label: 'About', href: '#about' },
  { label: 'Business', href: '#business' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Leadership', href: '#leadership' },
  { label: 'Approach', href: '#approach' },
]

export const primaryCta: Cta = { label: 'Get in touch', href: '#contact' }

/** Files live in /public/images. Replace a file to change an image; keep the name and nothing else changes. */
export const assets: SiteAssets = {
  logoFull: '/images/logo-full.jpg',
  logoEmblem: '/images/logo-emblem.png',
  founderPhoto: '/images/founder.jpg',
}
