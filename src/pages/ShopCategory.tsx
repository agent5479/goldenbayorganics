import { Link, Navigate, useParams } from 'react-router-dom'
import { SiteHead } from '../components/layout/SiteHead'
import { SmartImage } from '../components/stock/SmartImage'
import {
  getCategoryById,
  stocklistPhotosPath,
  type CategoryId,
} from '../data/business'
import { getStocklistGallery } from '../lib/gallery'
import { getStockByCategory } from '../lib/stock'
import { buildCategoryPageJsonLd, categoryPageMeta } from '../lib/seo'
import './ShopCategoryPage.css'

const PREVIEW_COUNT = 6

export function Component() {
  const { categoryId } = useParams<{ categoryId: string }>()
  const category = getCategoryById(categoryId)

  if (!category) {
    return <Navigate to="/stocklist" replace />
  }

  const meta = categoryPageMeta(category)
  const photos = getStocklistGallery(category.id as CategoryId).slice(0, PREVIEW_COUNT)
  const showcaseCount = getStockByCategory(category.id).length

  return (
    <>
      <SiteHead meta={meta} jsonLd={buildCategoryPageJsonLd(category)} />
      <header className="page-header">
        <div className="page-header__inner page-header__inner--narrow">
          <nav className="shop-cat-crumbs label" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span aria-hidden="true"> / </span>
            <Link to="/stocklist">Stocklist</Link>
            <span aria-hidden="true"> / </span>
            <span>{category.label}</span>
          </nav>
          <span className="chip chip--accent">In store</span>
          <h1>{category.label}</h1>
          <p className="page-subtitle">{category.description}</p>
        </div>
      </header>

      <article className="section">
        <div className="section__inner section__inner--narrow shop-cat-prose">
          {category.body.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))}
          {category.id === 'bulk' && (
            <ol className="shop-cat-steps">
              <li>Bring clean jars or containers from home.</li>
              <li>Choose bulk grains, nuts, legumes, or pantry staples.</li>
              <li>Weigh and pay at the counter (charged by weight in NZD).</li>
              <li>
                Call <a href="tel:+6435258677">03 525 8677</a> ahead for large orders.
              </li>
            </ol>
          )}
          <p className="shop-cat-prose__meta label">
            {showcaseCount} showcase item{showcaseCount === 1 ? '' : 's'} on the homepage grid
            {photos.length > 0
              ? ` · ${photos.length} photo${photos.length === 1 ? '' : 's'} previewed below`
              : ''}
            .
          </p>
          <div className="shop-cat-actions">
            <Link to="/stocklist" className="btn">
              Search full catalog
            </Link>
            <Link to={stocklistPhotosPath(category.id)} className="btn btn--ghost">
              Browse {category.label.toLowerCase()} photos
            </Link>
            <Link to="/visit" className="btn btn--ghost">
              Hours &amp; directions
            </Link>
          </div>
        </div>
      </article>

      {photos.length > 0 && (
        <section className="section section--alt">
          <div className="section__inner">
            <p className="section__label label">From the shop</p>
            <div className="shop-cat-preview-head">
              <h2>Recent {category.label.toLowerCase()} photos</h2>
              <Link to={stocklistPhotosPath(category.id)} className="btn">
                See all photos
              </Link>
            </div>
            <div className="shop-cat-preview-grid">
              {photos.map((item) => (
                <Link
                  key={item.id}
                  to={stocklistPhotosPath(category.id)}
                  className="shop-cat-preview-tile"
                  aria-label={item.product?.name ?? item.title}
                >
                  <SmartImage
                    thumb={item.thumb}
                    filename={item.filename}
                    alt={item.title}
                  />
                  <span className="shop-cat-preview-tile__title">
                    {item.product?.name ?? item.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export function getStaticPaths() {
  return [
    'shop/produce',
    'shop/herbs',
    'shop/bakery',
    'shop/bulk',
    'shop/specialty',
    'shop/household',
  ]
}

export const entry = 'src/pages/ShopCategory.tsx'
