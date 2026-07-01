import { Link } from 'react-router-dom'
import { getPreviewGallery } from '../../lib/gallery'
import { thumbUrl } from '../../lib/assets'
import './InTheShop.css'

export function InTheShop() {
  const preview = getPreviewGallery(8)

  return (
    <section className="section">
      <div className="section__inner">
        <p className="section__label label">In the shop</p>
        <div className="in-the-shop__head">
          <h2>A peek inside</h2>
          <Link to="/stocklist" className="btn">
            See all photos
          </Link>
        </div>
        <div className="in-the-shop__grid">
          {preview.map((item) => (
            <Link
              key={item.id}
              to="/stocklist"
              className="in-the-shop__tile"
              aria-label={item.title}
            >
              <img src={thumbUrl(item.thumb)} alt={item.title} loading="lazy" decoding="async" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
