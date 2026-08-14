import { business, openingHours, SITE_URL } from '../data/business'

export interface PageMeta {
  title: string
  description: string
  path: string
  keywords?: string
  image?: string
}

/** Approximate shop coordinates — 47 Commercial Street, Takaka */
const GEO = {
  latitude: -40.8556,
  longitude: 172.8076,
} as const

/** Primary local search terms for meta keywords and structured data. */
export const SEARCH_KEYWORDS = [
  'Golden Bay Organics',
  'organic grocer Takaka',
  'organic shop Golden Bay',
  'organic food Takaka',
  'health food store Takaka',
  'organic produce Golden Bay',
  'bulk foods Takaka',
  'herbs spices Takaka',
  'Commercial Street Takaka',
  'Tasman New Zealand',
].join(', ')

const STORE_DESCRIPTION =
  'Organic grocer in Takaka, Golden Bay — fresh produce, bulk foods, herbs, bakery, specialty foods and eco cleaners at 47 Commercial Street.'

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
    '@type': ['GroceryStore', 'Store'],
    '@id': `${SITE_URL}/#store`,
    name: business.name,
    alternateName: ['Golden Bay Organics Takaka', 'Organic shop Takaka'],
    description: STORE_DESCRIPTION,
    slogan: business.tagline,
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
    knowsAbout: [
      'organic groceries',
      'organic produce',
      'bulk foods',
      'herbs and spices',
      'artisan bread',
      'specialty foods',
      'eco-friendly cleaners',
      'Takaka',
      'Golden Bay',
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
    description: STORE_DESCRIPTION,
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
      'Organic grocer in Takaka, Golden Bay. Fresh produce, bulk foods, herbs, bakery, specialty foods & eco cleaners at 47 Commercial Street. Open Mon–Sat.',
    path: '/',
    keywords: SEARCH_KEYWORDS,
  },
  stocklist: {
    title: 'Organic Stocklist & Photos | Golden Bay Organics Takaka',
    description:
      'Search the organic product catalog at Golden Bay Organics, Takaka — produce, bulk foods, herbs, bakery and specialty goods. Browse current stock photos.',
    path: '/stocklist',
    keywords: `${SEARCH_KEYWORDS}, organic stocklist Takaka, organic products Golden Bay`,
  },
  visit: {
    title: 'Hours & Directions | Organic Shop Takaka — Golden Bay Organics',
    description:
      "Visit Takaka's organic shop at 47 Commercial Street, Takaka 7110. Open Mon–Fri 9am–5pm, Sat 10am–2pm. Phone 03 525 8677.",
    path: '/visit',
    keywords: `${SEARCH_KEYWORDS}, Golden Bay Organics hours, organic shop directions Takaka`,
  },
  about: {
    title: 'About | Organic Grocer Takaka — Golden Bay Organics',
    description:
      "About Golden Bay Organics — Takaka's local organic grocer on Commercial Street. Fresh, affordable organic food for Golden Bay and Tasman.",
    path: '/about',
    keywords: `${SEARCH_KEYWORDS}, Patricia Smith Takaka, local organic grocer Golden Bay`,
  },
} satisfies Record<string, PageMeta>
