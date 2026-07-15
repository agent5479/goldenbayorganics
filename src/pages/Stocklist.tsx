import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { SiteHead } from '../components/layout/SiteHead'
import { CatalogSearch } from '../components/stock/CatalogSearch'
import { CatalogTable } from '../components/stock/CatalogTable'
import { PhotoGrid } from '../components/stock/PhotoGrid'
import { PhotoDetailPanel } from '../components/stock/PhotoDetailPanel'
import {
  catalog,
  filterCatalogItems,
  formatCatalogDate,
  getCatalogCategories,
} from '../lib/catalog'
import {
  galleryFilterOptions,
  getStocklistGallery,
  parseGalleryCategory,
  type GalleryCategory,
  type GalleryItemWithProduct,
} from '../lib/gallery'
import { buildPageJsonLd, pageMeta } from '../lib/seo'
import './StocklistPage.css'

type StocklistView = 'catalog' | 'photos'

function parseView(value: string | null): StocklistView {
  return value === 'photos' ? 'photos' : 'catalog'
}

export function Component() {
  const [searchParams, setSearchParams] = useSearchParams()
  const view = parseView(searchParams.get('view'))
  const category = parseGalleryCategory(searchParams.get('category'))
  const [selected, setSelected] = useState<GalleryItemWithProduct | null>(null)
  const [catalogQuery, setCatalogQuery] = useState('')
  const [catalogCategory, setCatalogCategory] = useState('all')

  const photoItems = getStocklistGallery(category)
  const categories = useMemo(() => getCatalogCategories(), [])
  const catalogItems = useMemo(
    () => filterCatalogItems(catalogQuery, catalogCategory),
    [catalogQuery, catalogCategory],
  )

  const setView = (next: StocklistView) => {
    setSelected(null)
    const nextParams = new URLSearchParams()
    if (next === 'photos') {
      nextParams.set('view', 'photos')
      if (category !== 'all') nextParams.set('category', category)
    }
    setSearchParams(nextParams)
  }

  const setPhotoCategory = (next: GalleryCategory) => {
    setSelected(null)
    const nextParams = new URLSearchParams()
    nextParams.set('view', 'photos')
    if (next !== 'all') nextParams.set('category', next)
    setSearchParams(nextParams)
  }

  const priceDate = formatCatalogDate(catalog.exportedAt)

  return (
    <>
      <SiteHead meta={pageMeta.stocklist} jsonLd={buildPageJsonLd(pageMeta.stocklist)} />
      <header className="page-header">
        <div className="page-header__inner">
          <span className="chip chip--accent">In store</span>
          <h1>Stocklist</h1>
          <p className="page-subtitle stocklist-intro">
            Search what we usually carry, or browse photos of the shop. Stock changes —
            call <a href="tel:+6435258677">03 525 8677</a> or visit us to confirm.
          </p>
        </div>
      </header>

      <div className="section stocklist-section">
        <div className="section__inner">
          <div className="stocklist-view-toggle" role="tablist" aria-label="Stocklist view">
            <button
              type="button"
              role="tab"
              aria-selected={view === 'catalog'}
              className={`stocklist-view-btn${view === 'catalog' ? ' stocklist-view-btn--active' : ''}`}
              onClick={() => setView('catalog')}
            >
              Catalog
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={view === 'photos'}
              className={`stocklist-view-btn${view === 'photos' ? ' stocklist-view-btn--active' : ''}`}
              onClick={() => setView('photos')}
            >
              Photos
            </button>
          </div>

          {view === 'catalog' ? (
            <>
              <p className="stocklist-price-note label">
                Prices as of {priceDate}. Confirm in store — they may have changed.
              </p>
              <CatalogSearch
                query={catalogQuery}
                category={catalogCategory}
                categories={categories}
                resultCount={catalogItems.length}
                onQueryChange={setCatalogQuery}
                onCategoryChange={setCatalogCategory}
              />
              <CatalogTable
                key={`${catalogQuery}\0${catalogCategory}`}
                items={catalogItems}
              />
            </>
          ) : (
            <>
              <p className="stocklist-count label">{photoItems.length} photos shown</p>
              <div className="stocklist-filters" role="tablist" aria-label="Filter by category">
                {galleryFilterOptions.map((opt) => (
                  <button
                    key={opt.id}
                    type="button"
                    role="tab"
                    aria-selected={category === opt.id}
                    className={`stocklist-filter${category === opt.id ? ' stocklist-filter--active' : ''}`}
                    onClick={() => setPhotoCategory(opt.id)}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
              <PhotoGrid
                items={photoItems}
                onSelect={setSelected}
                selectedId={selected?.id ?? null}
              />
            </>
          )}
        </div>
      </div>

      <section className="section section--alt">
        <div className="section__inner section__inner--narrow">
          <p className="label section__label">A note</p>
          <p>
            This list shows items from our shop system that are not marked discontinued.
            Availability varies — for bulk orders or to check a specific item, please{' '}
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

      {view === 'photos' && (
        <PhotoDetailPanel item={selected} onClose={() => setSelected(null)} />
      )}
    </>
  )
}
