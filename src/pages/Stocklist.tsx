import { Link } from 'react-router-dom'
import { categories } from '../data/business'
import { SiteHead } from '../components/layout/SiteHead'
import { StockCategory } from '../components/stock/StockCategory'
import { pageMeta } from '../lib/seo'
import './StocklistPage.css'

export function Component() {
  return (
    <>
      <SiteHead meta={pageMeta.stocklist} />
      <header className="page-header">
        <div className="page-header__inner">
          <div className="folio">
            <span className="chip chip--accent">In store</span>
            <span className="folio__sep">·</span>
            <span className="mono">Updated regularly</span>
          </div>
          <h1>Stocklist</h1>
          <p className="stocklist-intro">
            A showcase of what we carry. Prices and availability change — call{' '}
            <a href="tel:+6435258677">03 525 8677</a> or visit us to confirm. Online ordering
            coming soon.
          </p>
          <nav className="stocklist-jump mono" aria-label="Jump to category">
            {categories.map((cat, i) => (
              <span key={cat.id}>
                {i > 0 && <span className="folio__sep"> · </span>}
                <a href={`#${cat.id}`}>{cat.label}</a>
              </span>
            ))}
          </nav>
        </div>
      </header>

      <div className="section">
        <div className="section__inner">
          {categories.map((cat) => (
            <StockCategory key={cat.id} categoryId={cat.id} />
          ))}
        </div>
      </div>

      <section className="section section--alt">
        <div className="section__inner section__inner--narrow">
          <p className="mono section__label">Note</p>
          <p>
            This list is maintained manually. For bulk orders or to check specific items, please{' '}
            <Link to="/visit">visit the shop</Link> or message us on{' '}
            <a
              href="https://www.facebook.com/profile.php?id=100092461392927"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            .
          </p>
        </div>
      </section>
    </>
  )
}
