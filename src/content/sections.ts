/**
 * All the words on the page, section by section. Edit text here, not in components.
 * Source: the Legacy Minerals Limited company profile.
 */
import type {
  AboutContent,
  ApproachContent,
  BusinessContent,
  ClosingContent,
  GalleryContent,
  HeroContent,
  LeadershipContent,
  OutlookContent,
} from '@/types/content'
import { assets, company } from './site'

export const hero: HeroContent = {
  eyebrow: company.tagline,
  heading: company.descriptor,
  lede: 'Legacy Minerals Limited explores, develops and commercialises solid mineral resources in Nigeria, built for the long term on professional management, responsible practice and strategic partnerships.',
  primaryCta: { label: 'Partner with us', href: '#contact' },
  secondaryCta: { label: 'What we do', href: '#business' },
}

export const about: AboutContent = {
  eyebrow: 'About the company',
  heading: 'Founded on a belief: Nigeria’s minerals are a foundation, not just a deposit.',
  paragraphs: [
    'Legacy Minerals Limited is a Nigerian mining and minerals development company, established to become a respected and professionally managed player in the country’s evolving solid minerals industry.',
    'We hold that Nigeria’s mineral resources are not merely natural deposits but a foundation for economic growth, industrial development, employment and sustainable wealth. We take part in that development by combining entrepreneurial leadership, strategic partnerships, professional management and responsible mining practice.',
    'The company is being built with a long-term perspective: not simply to extract minerals, but to create a legacy of value, opportunity and sustainable development around Nigeria’s mineral wealth.',
  ],
  vision:
    'To build Legacy Minerals Limited into a leading and trusted Nigerian mining company, recognised for excellence in mineral exploration, responsible mining, strategic investment and sustainable resource development.',
  mission:
    'To responsibly explore, develop and commercialise Nigeria’s mineral resources while creating sustainable value for investors, host communities, employees, partners and the Nigerian economy.',
}

export const business: BusinessContent = {
  eyebrow: 'Our core business',
  heading: 'Across the mining value chain',
  lede: 'The company is positioned to operate at each stage, from finding a deposit to bringing its minerals to market.',
  stages: [
    {
      stageLabel: 'Upstream',
      title: 'Exploration & prospecting',
      body: 'Identifying and evaluating mineral deposits with commercial potential.',
    },
    {
      title: 'Mining & extraction',
      body: 'Developing and operating mines to regulatory and safety standards.',
    },
    {
      title: 'Processing & beneficiation',
      body: 'Adding value to raw minerals before they reach the market.',
    },
    {
      title: 'Assets, partnerships & joint ventures',
      body: 'Acquiring and developing mining assets alongside investors, financiers and operators.',
    },
    {
      stageLabel: 'Downstream',
      title: 'Trading & investment',
      body: 'Commercialising minerals and investing in promising mineral projects.',
    },
  ],
  note: 'The portfolio will expand as opportunities arise. Regulatory compliance, operational efficiency and responsible resource management are fixed commitments at every stage.',
}

/**
 * Gallery slideshow.
 *
 * Until site photography arrives the logo does the sliding. To add real pictures:
 *   1. drop the files in `public/images/gallery/`
 *   2. add an entry below — `src`, `alt`, optional `caption`
 *   3. delete the logo slides (or keep one as an opener)
 * Photographs should be landscape and at least 1600px wide; leave `contain` off so
 * they fill the frame. Set `contain: true` only for logos or drawings.
 */
export const gallery: GalleryContent = {
  eyebrow: 'Gallery',
  heading: 'The company in pictures',
  lede: 'Site photography from our exploration and operations is being assembled. In the meantime, the mark we work under.',
  intervalSeconds: 5,
  slides: [
    {
      src: '/images/gallery/mine1.jpeg',
      alt: `${company.name} logo`,
      caption: company.tagline,
      contain: true,
    },
    {
      src: '/images/gallery/mine2.jpg',
      alt: `${company.shortName} emblem`,
      caption: company.descriptor,
      contain: true,
    },
    {
      src: '/images/gallery/mine3.jpeg',
      alt: `${company.name} logo`,
      caption: company.tagline,
      contain: true,
    },
    {
      src: '/images/gallery/mine4.webp',
      alt: `${company.name} logo`,
      caption: company.tagline,
      contain: true,
    },
  ],
}

export const leadership: LeadershipContent = {
  eyebrow: 'Leadership',
  founder: {
    name: 'Ogbonna Simon Obinna',
    role: 'Founder & Chief Executive Officer',
    photo: assets.founderPhoto,
    // Update this description when a real portrait replaces /public/images/founder.jpg
    photoAlt: 'Legacy Minerals Limited emblem, standing in for the founder’s portrait',
    origin: 'Ishiagu · Ivo Local Government Area · Ebonyi State',
    bio: [
      'Mr. Ogbonna hails from Ishiagu in Ivo Local Government Area of Ebonyi State, a community with a long association with mining and mineral resources. Growing up with an understanding of the economic weight of minerals shaped both his interest in the sector and his ambition to build a company that contributes meaningfully to Nigeria’s mining future.',
      'His vision for Legacy Minerals extends beyond extraction: an organisation founded on professionalism, integrity, strategic thinking, responsible resource development and long-term value creation, building relationships with investors, government institutions, technical professionals, host communities and other stakeholders.',
    ],
  },
}

export const approach: ApproachContent = {
  eyebrow: 'Our approach',
  heading: 'Commercial opportunity, balanced with responsibility',
  principles: [
    {
      title: 'Responsible mining',
      body: 'Practices that respect the environment, host communities and every applicable regulatory requirement.',
    },
    {
      title: 'Professionalism',
      body: 'Competent people, sound management systems, technical expertise and transparent business practice.',
    },
    {
      title: 'Strategic partnerships',
      body: 'Large-scale mineral opportunities need collaboration: investors, financiers, technical experts and operators.',
    },
    {
      title: 'Community development',
      body: 'Host communities are stakeholders. We support economic opportunity and development around our operations.',
    },
    {
      title: 'Sustainable value',
      body: 'Lasting value over short-term extraction, with enduring benefits for the company, partners, communities and the economy.',
    },
  ],
}

export const outlook: OutlookContent = {
  opportunity: {
    eyebrow: 'The opportunity',
    heading: 'A sector with room to grow',
    paragraphs: [
      'Nigeria’s solid minerals sector has considerable room for growth. The Federal Government has identified its development as a route to wealth creation, employment, rural economic development and a larger contribution to national output.',
      'Legacy Minerals is positioning itself within that opening: identifying commercially viable assets, building strategic partnerships and developing the technical and organisational capacity to compete.',
    ],
  },
  legacy: {
    eyebrow: 'Our legacy',
    heading: 'An institution built to outlive individuals',
    paragraphs: [
      'The name is a commitment. Legacy Minerals aspires to be remembered not only for the minerals it extracts, but for the people it empowers, the communities it develops, the investments it creates and its contribution to Nigeria’s economic transformation.',
      'We seek to develop mineral assets in ways that generate enduring benefits for the company, its partners, host communities and the Nigerian economy.',
    ],
  },
}

export const closing: ClosingContent = {
  values: ['Integrity', 'Excellence', 'Responsibility', 'Innovation', 'Sustainability'],
  ambition: [
    'To discover resources.',
    'To develop opportunities.',
    'To create value.',
    'To build a lasting legacy.',
  ],
  contactEyebrow: 'Contact',
  contactHeading: 'Talk to us about partnership, investment or supply.',
}
