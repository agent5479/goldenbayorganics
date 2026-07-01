import { business } from '../../data/business'
import { getPatriciaPromo } from '../../lib/gallery'
import { thumbUrl } from '../../lib/assets'
import './PatriciaPromo.css'

export function PatriciaPromo() {
  const promo = getPatriciaPromo()
  if (!promo) return null

  const { owner } = business

  return (
    <section className="section">
      <div className="section__inner">
        <div className="patricia-promo">
          <a
            href={owner.servicesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="patricia-promo__image-link"
          >
            <img
              src={thumbUrl(promo.thumb)}
              alt={`${owner.name} — ${owner.servicesName}`}
              loading="lazy"
              decoding="async"
            />
          </a>
          <div className="patricia-promo__body">
            <p className="label section__label">Meet the owner</p>
            <h2>{owner.name}</h2>
            <p className="patricia-promo__lead">
              Patricia runs Golden Bay Organics and also offers kinesiology, nutrition, and yoga
              through her practice{' '}
              <strong>{owner.servicesName}</strong>.
            </p>
            {promo.description && <p className="patricia-promo__desc">{promo.description}</p>}
            <a
              href={owner.servicesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn--primary"
            >
              Visit Equilibrium Kinesiology & Nutrition
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
