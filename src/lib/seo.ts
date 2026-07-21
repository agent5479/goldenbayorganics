import { business, openingHours, SITE_URL } from '../data/business'

export interface PageMeta {
  title: string
  description: string
  path: string
  image?: string
}

/** Approximate shop coordinates — 47 Commercial Street, Takaka */
const GEO = {
  latitude: -40.8556,
  longitude: 172.8076,
} as const

export const OG_IMAGE = {
  path: '/images/og-default.jpg',
  width: 2048,
  height: 1365,
  type: 'image/jpeg',
  alt: 'Golden Bay Organics shopfront on Commercial Street, Takaka',
} as const

const defaultImage = `${SITE_URL}${OG_IMAGE.path}`

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
    '@id': `${SITE_URL}/#store`,
    name: business.name,
    alternateName: 'Golden Bay Organics Takaka',
    description: business.tagline,
    url: SITE_URL,
    image: defaultImage,
    telephone: business.phoneTel,
    priceRange: '$$',
    currenciesAccepted: 'NZD',
    paymentAccepted: 'Cash, EFTPOS, Credit Card',
    sameAs: [business.facebook],
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.address.street,
      addressLocality: business.address.locality,
      addressRegion: 'Tasman',
      postalCode: business.address.postalCode,
      addressCountry: business.address.country,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: GEO.latitude,
      longitude: GEO.longitude,
    },
    hasMap: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${business.address.full}, New Zealand`)}`,
    areaServed: [
      { '@type': 'City', name: 'Takaka' },
      { '@type': 'AdministrativeArea', name: 'Golden Bay' },
      { '@type': 'AdministrativeArea', name: 'Tasman' },
    ],
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

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    name: business.name,
    alternateName: 'Golden Bay Organics Takaka',
    url: SITE_URL,
    description: business.tagline,
    inLanguage: 'en-NZ',
    publisher: { '@id': `${SITE_URL}/#store` },
  }
}

export function buildBreadcrumbJsonLd(
  crumbs: { name: string; path: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: pageUrl(crumb.path),
    })),
  }
}

export function buildPageJsonLd(meta: PageMeta) {
  const crumbs =
    meta.path === '/'
      ? [{ name: 'Home', path: '/' }]
      : [
          { name: 'Home', path: '/' },
          { name: meta.title.split('—')[0].split('|')[0].trim(), path: meta.path },
        ]

  return [buildWebSiteJsonLd(), buildLocalBusinessJsonLd(), buildBreadcrumbJsonLd(crumbs)]
}

export const pageMeta = {
  home: {
    title: 'Golden Bay Organics | Organic Grocer in Takaka, Golden Bay',
    description:
      'Your local organic grocer in Takaka — fresh produce, herbs, breads, bulk foods, speciality foods and eco cleaners. Visit us at 47 Commercial Street, Golden Bay.',
    path: '/',
  },
  stocklist: {
    title: 'Organic Stocklist | Golden Bay Organics Takaka',
    description:
      'Search our product catalog and browse photos of organic produce, bulk foods, herbs, bakery and specialty goods at Golden Bay Organics, Takaka.',
    path: '/stocklist',
  },
  visit: {
    title: 'Visit Us | Hours & Directions — Golden Bay Organics Takaka',
    description:
      'Find Golden Bay Organics at 47 Commercial Street, Takaka 7110. Open Mon–Fri 9am–5pm, Sat 10am–2pm. Phone 03 525 8677.',
    path: '/visit',
  },
  about: {
    title: 'About Us | Golden Bay Organics — Organic Grocer Takaka',
    description:
      'Golden Bay Organics is Takaka\'s local organic grocer — supporting healthy, affordable eating with fresh produce, bulk foods and community-minded shopping.',
    path: '/about',
  },
} satisfies Record<string, PageMeta>
