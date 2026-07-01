import galleryData from '../data/gallery.json'
import { SHOP_LANDING_PHOTOS, business } from '../data/business'
import { stock, formatPrice, type StockItem } from './stock'
import type { CategoryId } from '../data/business'

export type GalleryCategory =
  | 'all'
  | CategoryId
  | 'shop'

export type GalleryKind = 'stock' | 'shop' | 'promo'

export interface GalleryItem {
  id: string
  filename: string
  thumb: string
  title: string
  category: string
  kind: GalleryKind
  productId: string | null
  productIds: string[]
  externalUrl: string | null
  description: string | null
  stocklist: boolean
}

export interface GalleryItemWithProduct extends GalleryItem {
  product: StockItem | null
  products: StockItem[]
}

export const gallery = galleryData as GalleryItem[]

export const galleryFilterOptions: { id: GalleryCategory; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'produce', label: 'Produce' },
  { id: 'bakery', label: 'Bakery' },
  { id: 'bulk', label: 'Bulk' },
  { id: 'herbs', label: 'Herbs' },
  { id: 'specialty', label: 'Specialty' },
  { id: 'household', label: 'Household' },
  { id: 'shop', label: 'Shop' },
]

const stockById = new Map(stock.map((item) => [item.id, item]))

export function enrichGalleryItem(item: GalleryItem): GalleryItemWithProduct {
  const products = item.productIds
    .map((id) => stockById.get(id))
    .filter((p): p is StockItem => Boolean(p))

  return {
    ...item,
    product: item.productId ? (stockById.get(item.productId) ?? null) : products[0] ?? null,
    products,
  }
}

export function getStocklistGallery(category: GalleryCategory = 'all'): GalleryItemWithProduct[] {
  const stockItems = gallery.filter((item) => item.stocklist)
  const items =
    category === 'all'
      ? stockItems
      : stockItems.filter((item) => item.category === category)
  return items.map(enrichGalleryItem)
}

/** @deprecated use getStocklistGallery */
export function getGalleryItems(category: GalleryCategory = 'all'): GalleryItemWithProduct[] {
  return getStocklistGallery(category)
}

export function getShopLandingPhotos(): GalleryItemWithProduct[] {
  return SHOP_LANDING_PHOTOS.map((filename) => gallery.find((item) => item.filename === filename))
    .filter((item): item is GalleryItem => Boolean(item))
    .map(enrichGalleryItem)
}

export function getPatriciaPromo(): GalleryItemWithProduct | null {
  const item = gallery.find((g) => g.filename === business.owner.promoImage)
  return item ? enrichGalleryItem(item) : null
}

export function getPreviewGallery(count = 8): GalleryItemWithProduct[] {
  return gallery
    .filter((item) => item.kind === 'stock' && item.stocklist)
    .slice(0, count)
    .map(enrichGalleryItem)
}

export function productDisplay(item: GalleryItemWithProduct): string | null {
  if (!item.product) return null
  return formatPrice(item.product.price, item.product.unit)
}
