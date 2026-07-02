import { Link } from 'react-router-dom'
import { categories } from '../../data/business'
import { stocklistCategoryUrl } from '../../lib/gallery'
import { getStockByCategory } from '../../lib/stock'
import './CategoryGrid.css'

export function CategoryGrid() {
  return (
    <section className="section section--alt">
      <div className="section__inner">
        <p className="section__label label">What we stock</p>
        <h2>Shop by category</h2>
        <div className="category-grid">
          {categories.map((cat) => {
            const count = getStockByCategory(cat.id).length
            return (
              <Link
                key={cat.id}
                to={stocklistCategoryUrl(cat.id)}
                className="category-card"
                aria-label={`Browse ${cat.label} — ${count} items listed`}
              >
                <h3 className="category-card__title">{cat.label}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <p className="category-card__count label">{count} items listed</p>
                <span className="category-card__cta">Browse photos →</span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
