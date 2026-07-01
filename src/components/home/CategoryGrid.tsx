import { Link } from 'react-router-dom'
import { categories } from '../../data/business'
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
              <article key={cat.id} className="category-card">
                <h3 className="category-card__title">{cat.label}</h3>
                <p className="category-card__desc">{cat.description}</p>
                <p className="category-card__count label">{count} items listed</p>
                <Link to={`/stocklist`} className="category-card__link">
                  Browse photos →
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
