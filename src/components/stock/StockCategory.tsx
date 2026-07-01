import type { CategoryId } from '../../data/business'
import { getCategoryMeta, getStockByCategory } from '../../lib/stock'
import { ProductCard } from './ProductCard'
import './StockCategory.css'

interface StockCategoryProps {
  categoryId: CategoryId
}

export function StockCategory({ categoryId }: StockCategoryProps) {
  const meta = getCategoryMeta(categoryId)
  const items = getStockByCategory(categoryId)

  if (!meta || items.length === 0) return null

  return (
    <section id={categoryId} className="stock-category">
      <div className="stock-category__head">
        <h2 className="stock-category__title">{meta.label}</h2>
        <p className="stock-category__desc">{meta.description}</p>
      </div>
      <div className="stock-category__grid">
        {items.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}
