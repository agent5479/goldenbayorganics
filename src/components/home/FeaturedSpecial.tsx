import { Link } from 'react-router-dom'
import { getFeaturedSpecial } from '../../lib/stock'
import './FeaturedSpecial.css'

export function FeaturedSpecial() {
  const special = getFeaturedSpecial()

  return (
    <section className="section">
      <div className="section__inner">
        <p className="section__label label">This week's special</p>
        <div className="featured-special">
          <div className="featured-special__copy">
            <h2>{special.title}</h2>
            <p>{special.body}</p>
            <Link to="/stocklist" className="btn btn--primary">
              Browse stocklist
            </Link>
          </div>
          <div className="featured-special__meta">
            <div className="featured-special__meta-row">
              <span className="label featured-special__key">Updated</span>
              <span className="featured-special__val">{special.date}</span>
            </div>
            <div className="featured-special__meta-row">
              <span className="chip chip--hot">While stocks last</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
