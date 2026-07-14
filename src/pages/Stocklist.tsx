import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SiteHead } from '../components/layout/SiteHead'
import { PhotoGrid } from '../components/stock/PhotoGrid'
import { PhotoDetailPanel } from '../components/stock/PhotoDetailPanel'
import {
  galleryFilterOptions,
  getStocklistGallery,
  parseGalleryCategory,
  type GalleryCategory,
  type GalleryItemWithProduct,
} from '../lib/gallery'
import { buildPageJsonLd, pageMeta } from '../lib/seo'
import './StocklistPage.css'

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = parseGalleryCategory(searchParams.get('category'))
  const [selected, setSelected] = useState<GalleryItemWithProduct | null>(null)
  const items = getStocklistGallery(category)

  const handleSelect = (item: GalleryItemWithProduct) => {
    setSelected(item)
  }

  const setCategory = (next: GalleryCategory) => {
    setSelected(null)
    if (next === 'all') {
      setSearchParams({})
    } else {
      setSearchParams({ category: next })
    }
  }

  return (
    <>
      <SiteHead meta={pageMeta.stocklist} jsonLd={buildPageJsonLd(pageMeta.stocklist)} />
      <header className="page-header">
        <div className="page-header__inner">
          <span className="chip chip--accent">In store</span>
          <h1>Stocklist</h1>
          <p className="page-subtitle stocklist-intro">
            Browse what's in store. Tap any photo for details. Prices change — call{' '}
            <a href="tel:+6435258677">03 525 8677</a> or visit us to confirm.
          </p>
          <p className="stocklist-count label">{items.length} photos shown</p>
        </div>
      </header>

      <div className="section stocklist-section">
        <div className="section__inner">
          <div className="stocklist-filters" role="tablist" aria-label="Filter by category">
            {galleryFilterOptions.map((opt) => (
              <button
                key={opt.id}
                type="button"
                role="tab"
                aria-selected={category === opt.id}
                className={`stocklist-filter${category === opt.id ? ' stocklist-filter--active' : ''}`}
                onClick={() => setCategory(opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>

          <PhotoGrid items={items} onSelect={handleSelect} selectedId={selected?.id ?? null} />
        </div>
      </div>

      <section className="section section--alt">
        <div className="section__inner section__inner--narrow">
          <p className="label section__label">A note</p>
          <p>
            Photos show a sample of what we carry. For bulk orders or to check specific items, please{' '}
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

      <PhotoDetailPanel item={selected} onClose={() => setSelected(null)} />
    </>
  )
}
