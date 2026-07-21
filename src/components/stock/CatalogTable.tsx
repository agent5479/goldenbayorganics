import { useState } from 'react'
import type { CatalogItem } from '../../lib/catalog'
import { formatCatalogPath, formatCatalogPrice } from '../../lib/catalog'
import './CatalogTable.css'

const PAGE_SIZE = 100

interface CatalogTableProps {
  items: CatalogItem[]
}

export function CatalogTable({ items }: CatalogTableProps) {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  if (items.length === 0) {
    return (
      <p className="catalog-table__empty">
        No matching products. Try a different search or category.
      </p>
    )
  }

  const visible = items.slice(0, visibleCount)
  const hasMore = visibleCount < items.length

  return (
    <div className="catalog-table-wrap">
      <table className="catalog-table">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Category</th>
            <th scope="col">Price</th>
          </tr>
        </thead>
        <tbody>
          {visible.map((item) => (
            <tr key={item.id}>
              <td className="catalog-table__name">{item.name}</td>
              <td className="catalog-table__category">{formatCatalogPath(item.path)}</td>
              <td className="catalog-table__price">{formatCatalogPrice(item.price)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {hasMore && (
        <button
          type="button"
          className="catalog-table__more"
          onClick={() => setVisibleCount((n) => n + PAGE_SIZE)}
        >
          Show more ({items.length - visibleCount} remaining)
        </button>
      )}
    </div>
  )
}
