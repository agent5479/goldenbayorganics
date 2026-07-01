import { Link } from 'react-router-dom'
import { categories } from '../../data/business'
import { getStockByCategory } from '../../lib/stock'
import './CategoryGrid.css'

export function CategoryGrid() {
  return (
    <section className="section">
      <div className="section__inner">
        <p className="section__label mono">Departments · What we stock</p>
        <h2>Shop by category</h2>
        <div className="category-grid">
          {categories.map((cat) => {
            const count = getStockByCategory(cat.id).length
            return (
              <article key={cat.id} className="category-card">
                <div className="category-card__head">
                  <span className="category-card__index mono">{cat.index}</span>
                  <span className="category-card__label mono">{cat.label}</span>
                </div>
                <p className="category-card__desc">{cat.description}</p>
                <p className="category-card__count mono">{count} items listed</p>
                <Link to={`/stocklist#${cat.id}`} className="category-card__link mono">
                  View →
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
