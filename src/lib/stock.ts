import stockData from '../data/stock.json'
import specialsData from '../data/specials.json'
import { categories, type CategoryId } from '../data/business'

export interface StockItem {
  id: string
  name: string
  category: CategoryId
  price: number | null
  unit: string
  note: string
  image: string
}

export interface Special {
  id: string
  date: string
  title: string
  body: string
  featured: boolean
}

export const stock = stockData as StockItem[]
export const specials = specialsData as Special[]

export function getFeaturedSpecial(): Special {
  return specials.find((s) => s.featured) ?? specials[0]
}

export function getStockByCategory(categoryId: CategoryId): StockItem[] {
  return stock.filter((item) => item.category === categoryId)
}

export function getCategoryMeta(categoryId: CategoryId) {
  return categories.find((c) => c.id === categoryId)
}

export function formatPrice(price: number | null, unit: string): string {
  if (price === null) return 'Ask in store'
  return `$${price.toFixed(2)}/${unit}`
}
