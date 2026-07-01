import { Link } from 'react-router-dom'
import { getShopLandingPhotos } from '../../lib/gallery'
import { thumbUrl } from '../../lib/assets'
import './ShopShowcase.css'

export function ShopShowcase() {
  const photos = getShopLandingPhotos()

  if (photos.length === 0) return null

  return (
    <section className="shop-showcase section--alt">
      <div className="section__inner">
        <p className="section__label label">Visit us in Takaka</p>
        <h2>Step inside Golden Bay Organics</h2>
        <p className="shop-showcase__intro">
          Friendly faces, fresh produce, and a welcoming space on Commercial Street.
        </p>
        <div className="shop-showcase__grid">
          {photos.map((photo, index) => (
            <figure
              key={photo.id}
              className={`shop-showcase__item shop-showcase__item--${index + 1}`}
            >
              <img
                src={thumbUrl(photo.thumb)}
                alt={photo.title}
                loading={index < 2 ? 'eager' : 'lazy'}
                decoding="async"
              />
              <figcaption className="shop-showcase__caption">{photo.title}</figcaption>
            </figure>
          ))}
        </div>
        <div className="shop-showcase__actions">
          <Link to="/visit" className="btn btn--primary">
            Directions & hours
          </Link>
          <Link to="/stocklist" className="btn">
            Browse stock photos
          </Link>
        </div>
      </div>
    </section>
  )
}
