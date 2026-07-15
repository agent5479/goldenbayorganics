import catalogData from '../data/catalog.json'

export interface CatalogItem {
  id: string
  name: string
  category: string
  price: number | null
}

export interface Catalog {
  exportedAt: string
  items: CatalogItem[]
}

export const catalog = catalogData as Catalog

export function getCatalogCategories(): string[] {
  const set = new Set(catalog.items.map((item) => item.category))
  return [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

export function filterCatalogItems(
  query: string,
  category: string | 'all',
): CatalogItem[] {
  const q = query.trim().toLowerCase()
  return catalog.items.filter((item) => {
    if (category !== 'all' && item.category !== category) return false
    if (!q) return true
    return (
      item.name.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  })
}

export function formatCatalogPrice(price: number | null): string {
  if (price === null) return 'Ask in store'
  return `$${price.toFixed(2)}`
}

/** e.g. "15 July 2026" */
export function formatCatalogDate(isoDate: string): string {
  const [y, m, d] = isoDate.split('-').map(Number)
  if (!y || !m || !d) return isoDate
  const date = new Date(Date.UTC(y, m - 1, d))
  return date.toLocaleDateString('en-NZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  })
}
