import galleryData from '../data/gallery.json'
import { stock, formatPrice, type StockItem } from './stock'
import type { CategoryId } from '../data/business'

export type GalleryCategory =
  | 'all'
  | CategoryId
  | 'shop'

export interface GalleryItem {
  id: string
  filename: string
  thumb: string
  title: string
  category: string
  productId: string | null
}

export interface GalleryItemWithProduct extends GalleryItem {
  product: StockItem | null
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
  return {
    ...item,
    product: item.productId ? (stockById.get(item.productId) ?? null) : null,
  }
}

export function getGalleryItems(category: GalleryCategory = 'all'): GalleryItemWithProduct[] {
  const items = category === 'all' ? gallery : gallery.filter((item) => item.category === category)
  return items.map(enrichGalleryItem)
}

export function getPreviewGallery(count = 8): GalleryItemWithProduct[] {
  return gallery.slice(0, count).map(enrichGalleryItem)
}

export function productDisplay(item: GalleryItemWithProduct): string | null {
  if (!item.product) return null
  return formatPrice(item.product.price, item.product.unit)
}
