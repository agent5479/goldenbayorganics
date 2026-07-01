import { business, openingHours, SITE_URL } from '../data/business'

export interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
}

const defaultImage = `${SITE_URL}/images/og-default.jpg`

export function pageUrl(path: string): string {
  const normalized = path === '/' ? '' : path.replace(/^\//, '')
  return normalized ? `${SITE_URL}/${normalized}` : `${SITE_URL}/`
}

export function getOgImage(image?: string): string {
  if (!image) return defaultImage
  if (image.startsWith('http')) return image
  return `${SITE_URL}/images/${image.replace(/^\//, '')}`
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'GroceryStore',
    name: business.name,
    description: business.tagline,
    url: SITE_URL,
    telephone: business.phoneTel,
    sameAs: [business.facebook],
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    openingHoursSpecification: openingHours
      .filter((row) => row.opens && row.closes)
      .map((row) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: row.day,
        opens: row.opens,
        closes: row.closes,
      })),
  }
}

export const pageMeta = {
  home: {
    title: 'Golden Bay Organics — Takaka',
    description:
      'Organic grocer in Takaka — herbs, fresh produce, breads, speciality foods, cleaners, bulk foods and more. 47 Commercial Street.',
    path: '/',
  },
  stocklist: {
    title: 'Stocklist — Golden Bay Organics',
    description:
      'Browse our current range of organic produce, bulk foods, herbs, bakery, specialty items and eco household goods in Takaka.',
    path: '/stocklist',
  },
  visit: {
    title: 'Visit Us — Golden Bay Organics',
    description:
      'Find Golden Bay Organics at 47 Commercial Street, Takaka. Open Mon–Fri 9–5, Sat 10–2. Call 03 525 8677.',
    path: '/visit',
  },
  about: {
    title: 'About — Golden Bay Organics',
    description:
      'More than just food. Golden Bay Organics is your local organic grocer in Takaka — supporting healthy, affordable eating for the community.',
    path: '/about',
  },
} satisfies Record<string, PageMeta>
