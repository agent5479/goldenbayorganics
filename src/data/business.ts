export const SITE_URL = 'https://goldenbayorganics.co.nz'

export const business = {
  name: 'Golden Bay Organics',
  tagline:
    'More than just food — herbs, fresh produce, breads, speciality foods, cleaners, bulk foods & more',
  address: {
    street: '47 Commercial Street',
    locality: 'Takaka',
    postalCode: '7110',
    country: 'NZ',
    full: '47 Commercial Street, Takaka 7110',
  },
  phone: '03 525 8677',
  phoneTel: '+6435258677',
  /** Public profiles for entity graph / sameAs. Set googleBusinessProfile when known. */
  profiles: {
    facebook: 'https://www.facebook.com/profile.php?id=100092461392927',
    googleBusinessProfile: null as string | null,
  },
  email: null as string | null,
  owner: {
    name: 'Patricia Smith',
    servicesName: 'Equilibrium Kinesiology & Nutrition',
    servicesUrl: 'https://agent5479.github.io/equilibrium/',
    promoImage: 'PatriciaSmithEquilibriumKinesiologyHealthServices.jpg',
  },
} as const

export const SHOP_LANDING_PHOTOS = [
  'shopfrontsideview.jpg',
  'shopentranceway.jpg',
  'shopfloorlayout.jpg',
] as const

export const openingHours = [
  { day: 'Monday', hours: '9am – 5pm', opens: '09:00', closes: '17:00' },
  { day: 'Tuesday', hours: '9am – 5pm', opens: '09:00', closes: '17:00' },
  { day: 'Wednesday', hours: '9am – 5pm', opens: '09:00', closes: '17:00' },
  { day: 'Thursday', hours: '9am – 5pm', opens: '09:00', closes: '17:00' },
  { day: 'Friday', hours: '9am – 5pm', opens: '09:00', closes: '17:00' },
  { day: 'Saturday', hours: '10am – 2pm', opens: '10:00', closes: '14:00' },
  { day: 'Sunday', hours: 'Closed', opens: null, closes: null },
] as const

export const categories = [
  {
    id: 'produce',
    slug: 'produce',
    label: 'Fresh produce',
    description: 'Seasonal fruit and vegetables, local and organic',
    seoTitle: 'Fresh Organic Produce Takaka | Golden Bay Organics',
    seoDescription:
      'Seasonal organic and spray-free fruit and vegetables at Golden Bay Organics, 47 Commercial Street, Takaka. Local Golden Bay growers when we can.',
    body: [
      'Our produce benches turn over with the seasons — heritage apples, salad greens, root vegetables, and whatever local growers bring in that week. We favour spray-free and organic fruit and veg for Takaka and Golden Bay shoppers who want to know where their food comes from.',
      'Call ahead if you need a larger order for the week, or stop by Commercial Street to see what arrived today. Stock changes with harvests, so photos and the online catalog are a guide — confirm in store.',
    ],
  },
  {
    id: 'herbs',
    slug: 'herbs',
    label: 'Herbs & spices',
    description: 'Fresh herbs, dried spices, and botanicals',
    seoTitle: 'Herbs & Spices Takaka | Golden Bay Organics',
    seoDescription:
      'Fresh herbs, dried spices, and botanicals at Golden Bay Organics in Takaka. Everyday cooking staples and specialty blends for Golden Bay kitchens.',
    body: [
      'From everyday cooking spices to fresh herbs when in season, we keep a working pantry for Golden Bay cooks — not a warehouse catalogue. Ask at the counter if you are looking for something specific; we often know what is due in.',
      'Herbs and spices sit alongside our bulk foods so you can refill pantry jars without buying more packaging than you need.',
    ],
  },
  {
    id: 'bakery',
    slug: 'bakery',
    label: 'Breads & bakery',
    description: 'Artisan breads and baked goods',
    seoTitle: 'Organic Bakery & Bread Takaka | Golden Bay Organics',
    seoDescription:
      'Artisan breads, pies, and bakery items at Golden Bay Organics, Takaka. Rainbow Kitchen pies and fresh loaves when available — check Facebook or call.',
    body: [
      'We stock artisan breads and bakery favourites for Commercial Street shoppers — including Rainbow Kitchen frozen pies when they are on the shelf. Bakery lines move quickly; call 03 525 8677 if you need to reserve something for the weekend.',
      'Pair a loaf with seasonal produce or specialty foods for an easy Golden Bay dinner without leaving Takaka.',
    ],
  },
  {
    id: 'bulk',
    slug: 'bulk',
    label: 'Bulk foods',
    description: 'Grains, nuts, legumes, and pantry staples',
    seoTitle: 'Bulk Foods & Refills Takaka | Golden Bay Organics',
    seoDescription:
      'Bulk grains, nuts, legumes, and pantry staples at Golden Bay Organics, Takaka. Refill jars, buy the amount you need, phone ahead for larger bulk orders.',
    body: [
      'Our bulk foods aisle is for refill shopping — oats, grains, nuts, legumes, and pantry staples by weight so you take home what you will use. Bring your own containers when you can; we will weigh and price them at the counter.',
      'Planning a bigger order? Phone 03 525 8677 and we will check stock before you drive in from elsewhere in Golden Bay.',
    ],
  },
  {
    id: 'specialty',
    slug: 'specialty',
    label: 'Specialty foods',
    description: 'Local and imported speciality items',
    seoTitle: 'Specialty Organic Foods Takaka | Golden Bay Organics',
    seoDescription:
      'Specialty and health foods at Golden Bay Organics in Takaka — local makers, Turbo Tonics, and pantry finds you will not always see in the supermarket.',
    body: [
      'Specialty foods cover the extras that make the shop more than a produce stand — sauces, health products, local makers, and imported staples we are asked for again and again. Weekly specials often land here; check Facebook or our homepage updates.',
      'If you cannot find a familiar item, ask — we may have it in the next delivery or know a Golden Bay alternative.',
    ],
  },
  {
    id: 'household',
    slug: 'household',
    label: 'Cleaners & household',
    description: 'Eco-friendly cleaners and household goods',
    seoTitle: 'Eco Cleaners & Household Refills Takaka | Golden Bay Organics',
    seoDescription:
      'Eco-friendly cleaners and household goods at Golden Bay Organics, Takaka. Refill where we can and keep packaging down on Commercial Street.',
    body: [
      'Household shelves focus on eco-friendly cleaners and everyday goods you would rather not buy wrapped in plastic. Where we offer refills, bring a bottle and top up in store.',
      'Combine a cleaner refill with bulk pantry staples on the same visit — that is how many of our Takaka regulars shop.',
    ],
  },
] as const

export type CategoryId = (typeof categories)[number]['id']

export type ShopCategory = (typeof categories)[number]

export function isCategoryId(value: string | undefined): value is CategoryId {
  return categories.some((c) => c.id === value)
}

export function getCategoryById(id: string | undefined): ShopCategory | undefined {
  return categories.find((c) => c.id === id)
}

export function shopCategoryPath(id: CategoryId): string {
  return `/shop/${id}`
}

export function stocklistPhotosPath(id: CategoryId): string {
  return `/stocklist?view=photos&category=${id}`
}
