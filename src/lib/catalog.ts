import catalogData from '../data/catalog.json'

export interface CatalogItem {
  id: string
  name: string
  /** Reckon group path excluding the product leaf, e.g. ["Bulk", "FLOUR"] */
  path: string[]
  price: number | null
}

export interface Catalog {
  exportedAt: string
  items: CatalogItem[]
}

export const catalog = catalogData as Catalog

function pathPrefixMatch(itemPath: string[], selected: string[]): boolean {
  if (selected.length === 0) return true
  if (itemPath.length < selected.length) return false
  return selected.every((seg, i) => itemPath[i] === seg)
}

/** Top-level category labels, sorted. */
export function getCatalogTopCategories(): string[] {
  const set = new Set(catalog.items.map((item) => item.path[0]).filter(Boolean))
  return [...set].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

/**
 * Child group labels under `selectedPath`.
 * Only returns segments that are real groups (some item has a deeper path).
 */
export function getCatalogChildCategories(selectedPath: string[]): string[] {
  if (selectedPath.length === 0) return getCatalogTopCategories()

  const depth = selectedPath.length
  const children = new Set<string>()

  for (const item of catalog.items) {
    if (!pathPrefixMatch(item.path, selectedPath)) continue
    if (item.path.length > depth) {
      children.add(item.path[depth])
    }
  }

  return [...children].sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }))
}

export function filterCatalogItems(query: string, selectedPath: string[]): CatalogItem[] {
  const q = query.trim().toLowerCase()
  return catalog.items.filter((item) => {
    if (!pathPrefixMatch(item.path, selectedPath)) return false
    if (!q) return true
    const haystack = `${item.name} ${item.path.join(' ')}`.toLowerCase()
    return haystack.includes(q)
  })
}

export function formatCatalogPath(path: string[]): string {
  return path.join(' · ')
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
