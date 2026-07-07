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
  facebook: 'https://www.facebook.com/profile.php?id=100092461392927',
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
  { id: 'produce', label: 'Fresh produce', description: 'Seasonal fruit and vegetables, local and organic' },
  { id: 'herbs', label: 'Herbs & spices', description: 'Fresh herbs, dried spices, and botanicals' },
  { id: 'bakery', label: 'Breads & bakery', description: 'Artisan breads and baked goods' },
  { id: 'bulk', label: 'Bulk foods', description: 'Grains, nuts, legumes, and pantry staples' },
  { id: 'specialty', label: 'Specialty foods', description: 'Local and imported speciality items' },
  { id: 'household', label: 'Cleaners & household', description: 'Eco-friendly cleaners and household goods' },
] as const

export type CategoryId = (typeof categories)[number]['id']
