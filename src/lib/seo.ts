import {
  business,
  categories,
  openingHours,
  shopCategoryPath,
  SITE_URL,
  type ShopCategory,
} from '../data/business'

export interface PageMeta {
  title: string
  description: string
  path: string
  /** Short label for BreadcrumbList (defaults to a trimmed title). */
  breadcrumb?: string
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
  'bulk refill Takaka',
  'herbs spices Takaka',
  'eco cleaners Takaka',
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
const LOGO_URL = `${SITE_URL}/android-chrome-512x512.png`
const STORE_ID = `${SITE_URL}/#store`
const WEBSITE_ID = `${SITE_URL}/#website`
const OWNER_ID = `${SITE_URL}/#patricia-smith`

export interface FaqItem {
  question: string
  answer: string
}

export function pageUrl(path: string): string {
  const normalized = path === '/' ? '' : path.replace(/^\//, '')
  return normalized ? `${SITE_URL}/${normalized}` : `${SITE_URL}/`
}

export function getOgImage(image?: string): string {
  if (!image) return defaultImage
  if (image.startsWith('http')) return image
  return `${SITE_URL}/images/${image.replace(/^\//, '')}`
}

function buildSameAs(): string[] {
  const urls = [
    business.profiles.facebook,
    business.profiles.googleBusinessProfile,
    business.owner.servicesUrl,
  ]
  return urls.filter((url): url is string => Boolean(url))
}

function buildOfferCatalog() {
  return {
    '@type': 'OfferCatalog',
    name: 'Departments at Golden Bay Organics',
    itemListElement: categories.map((cat, index) => ({
      '@type': 'Offer',
      position: index + 1,
      itemOffered: {
        '@type': 'Service',
        name: cat.label,
        description: cat.description,
        url: pageUrl(shopCategoryPath(cat.id)),
        provider: { '@id': STORE_ID },
        areaServed: [
          { '@type': 'City', name: 'Takaka' },
          { '@type': 'AdministrativeArea', name: 'Golden Bay' },
        ],
      },
    })),
  }
}

export function buildLocalBusinessJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': ['GroceryStore', 'Store', 'Organization'],
    '@id': STORE_ID,
    name: business.name,
    legalName: business.name,
    alternateName: ['Golden Bay Organics Takaka', 'Organic shop Takaka'],
    description: STORE_DESCRIPTION,
    slogan: business.tagline,
    url: SITE_URL,
    image: defaultImage,
    logo: {
      '@type': 'ImageObject',
      url: LOGO_URL,
      width: 512,
      height: 512,
    },
    telephone: business.phoneTel,
    priceRange: '$$',
    currenciesAccepted: 'NZD',
    paymentAccepted: 'Cash, EFTPOS, Credit Card',
    sameAs: buildSameAs(),
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
    founder: { '@id': OWNER_ID },
    employee: { '@id': OWNER_ID },
    knowsAbout: [
      'organic groceries',
      'organic produce',
      'spray-free produce',
      'bulk foods',
      'bulk refills',
      'herbs and spices',
      'artisan bread',
      'specialty foods',
      'eco-friendly cleaners',
      'household refills',
      'Takaka',
      'Golden Bay',
    ],
    hasOfferCatalog: buildOfferCatalog(),
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

export function buildPersonJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': OWNER_ID,
    name: business.owner.name,
    jobTitle: 'Owner',
    worksFor: { '@id': STORE_ID },
    url: business.owner.servicesUrl,
    sameAs: [business.owner.servicesUrl, business.profiles.facebook].filter(
      Boolean,
    ),
    knowsAbout: [
      'organic groceries',
      'Touch for Health Kinesiology',
      'nutrition',
      'yoga',
      'Golden Bay',
    ],
  }
}

/** Visit-page FAQs — answers must stand alone (no "see above"). */
export const visitFaqs: FaqItem[] = [
  {
    question: 'Where is Golden Bay Organics in Takaka?',
    answer:
      'Golden Bay Organics is at 47 Commercial Street, Takaka 7110, Tasman, New Zealand — on the main street in the centre of Takaka.',
  },
  {
    question: 'What are Golden Bay Organics opening hours?',
    answer:
      'Golden Bay Organics is open Monday to Friday 9:00am–5:00pm and Saturday 10:00am–2:00pm. The shop is closed on Sunday.',
  },
  {
    question: 'How do I check stock or place a bulk order?',
    answer:
      'Call 03 525 8677 (+64 3 525 8677) to check whether an item is in stock, reserve bakery items, or arrange a larger bulk order before you drive in.',
  },
  {
    question: 'Can I refill bulk foods and cleaners at Golden Bay Organics?',
    answer:
      'Yes. Bring clean jars or bottles for bulk pantry staples and eco cleaner refills where available; we weigh and price them at the counter on Commercial Street.',
  },
  {
    question: 'Does Golden Bay Organics sell online?',
    answer:
      'Not yet. Browse the online stocklist and department pages for what we usually carry, then visit the Takaka shop or call to confirm availability and buy in store.',
  },
]

export function buildFaqPageJsonLd(faqs: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}

export function buildBulkRefillHowToJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: 'How to buy bulk food refills at Golden Bay Organics',
    description:
      'Steps to refill jars with bulk grains, nuts, legumes, and pantry staples at Golden Bay Organics in Takaka.',
    totalTime: 'PT15M',
    estimatedCost: {
      '@type': 'MonetaryAmount',
      currency: 'NZD',
      value: '0',
    },
    supply: [
      {
        '@type': 'HowToSupply',
        name: 'Clean reusable jars or containers',
      },
    ],
    tool: [],
    step: [
      {
        '@type': 'HowToStep',
        position: 1,
        name: 'Bring clean containers',
        text: 'Bring clean jars or containers from home so you can refill without buying extra packaging.',
      },
      {
        '@type': 'HowToStep',
        position: 2,
        name: 'Choose bulk staples',
        text: 'Select the bulk grains, nuts, legumes, or pantry staples you need from the bulk foods aisle.',
      },
      {
        '@type': 'HowToStep',
        position: 3,
        name: 'Weigh and pay at the counter',
        text: 'Bring your filled containers to the counter; we weigh them and charge by weight in New Zealand dollars.',
      },
      {
        '@type': 'HowToStep',
        position: 4,
        name: 'Call ahead for large orders',
        text: 'For a bigger order, phone 03 525 8677 first so we can check stock before you drive into Takaka.',
      },
    ],
  }
}

export function buildWebSiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: business.name,
    alternateName: 'Golden Bay Organics Takaka',
    url: SITE_URL,
    description: STORE_DESCRIPTION,
    inLanguage: 'en-NZ',
    publisher: { '@id': STORE_ID },
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

function breadcrumbLabel(meta: PageMeta): string {
  if (meta.breadcrumb) return meta.breadcrumb
  return meta.title.split('—')[0].split('|')[0].trim()
}

function buildWebPageJsonLd(meta: PageMeta) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${pageUrl(meta.path)}#webpage`,
    url: pageUrl(meta.path),
    name: meta.title,
    description: meta.description,
    isPartOf: { '@id': WEBSITE_ID },
    about: { '@id': STORE_ID },
    inLanguage: 'en-NZ',
  }
}

export function buildPageJsonLd(
  meta: PageMeta,
  extras: Record<string, unknown>[] = [],
) {
  const crumbs =
    meta.path === '/'
      ? [{ name: 'Home', path: '/' }]
      : [
          { name: 'Home', path: '/' },
          { name: breadcrumbLabel(meta), path: meta.path },
        ]

  return [
    buildWebSiteJsonLd(),
    buildLocalBusinessJsonLd(),
    buildPersonJsonLd(),
    buildBreadcrumbJsonLd(crumbs),
    buildWebPageJsonLd(meta),
    ...extras,
  ]
}

export function categoryPageMeta(category: ShopCategory): PageMeta {
  return {
    title: category.seoTitle,
    description: category.seoDescription,
    path: shopCategoryPath(category.id),
    breadcrumb: category.label,
    keywords: [
      SEARCH_KEYWORDS,
      `${category.label} Takaka`,
      `organic ${category.id} Golden Bay`,
      `${category.label} Commercial Street`,
    ].join(', '),
  }
}

export function buildCategoryPageJsonLd(category: ShopCategory) {
  const meta = categoryPageMeta(category)
  const crumbs = [
    { name: 'Home', path: '/' },
    { name: 'Stocklist', path: '/stocklist' },
    { name: category.label, path: meta.path },
  ]

  const webPage = {
    ...buildWebPageJsonLd(meta),
    mainEntity: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: category.label,
        description: category.description,
        url: pageUrl(meta.path),
        provider: { '@id': STORE_ID },
      },
    },
  }

  const graph: Record<string, unknown>[] = [
    buildWebSiteJsonLd(),
    buildLocalBusinessJsonLd(),
    buildPersonJsonLd(),
    buildBreadcrumbJsonLd(crumbs),
    webPage,
  ]

  if (category.id === 'bulk') {
    graph.push(buildBulkRefillHowToJsonLd())
  }

  return graph
}

export const pageMeta = {
  home: {
    title: 'Golden Bay Organics | Organic Grocer in Takaka, Golden Bay',
    description:
      'Organic grocer in Takaka, Golden Bay. Fresh produce, bulk refill foods, herbs, bakery, specialty foods & eco cleaners at 47 Commercial Street. Open Mon–Sat.',
    path: '/',
    breadcrumb: 'Home',
    keywords: SEARCH_KEYWORDS,
  },
  stocklist: {
    title: 'Organic Stocklist & Photos | Golden Bay Organics Takaka',
    description:
      'Search the live organic product catalog at Golden Bay Organics, Takaka — produce, bulk foods, herbs, bakery, specialty goods and eco cleaners. Browse current stock photos; prices dated on the page.',
    path: '/stocklist',
    breadcrumb: 'Stocklist',
    keywords: `${SEARCH_KEYWORDS}, organic stocklist Takaka, organic products Golden Bay, shop catalog Takaka`,
  },
  visit: {
    title: 'Hours & Directions | Organic Shop Takaka — Golden Bay Organics',
    description:
      "Visit Takaka's organic shop at 47 Commercial Street, Takaka 7110. Open Mon–Fri 9am–5pm, Sat 10am–2pm. Call 03 525 8677 to check stock or place a bulk order.",
    path: '/visit',
    breadcrumb: 'Visit',
    keywords: `${SEARCH_KEYWORDS}, Golden Bay Organics hours, organic shop directions Takaka, bulk order Takaka`,
  },
  about: {
    title: 'About | Organic Grocer Takaka — Golden Bay Organics',
    description:
      "About Golden Bay Organics — Takaka's local organic grocer on Commercial Street. Spray-free produce, bulk refills, bakery and eco cleaners for Golden Bay.",
    path: '/about',
    breadcrumb: 'About',
    keywords: `${SEARCH_KEYWORDS}, Patricia Smith Takaka, local organic grocer Golden Bay, bulk refill Takaka`,
  },
} satisfies Record<string, PageMeta>
