import { business } from '../../data/business'
import { getPatriciaPromo } from '../../lib/gallery'
import { assetUrl } from '../../lib/assets'
import { SmartImage } from '../stock/SmartImage'
import './PatriciaPromo.css'

const EQUILIBRIUM_BOOKINGS = `${business.owner.servicesUrl}bookings/`

export function PatriciaPromo() {
  const promo = getPatriciaPromo()
  if (!promo) return null

  const { owner } = business

  return (
    <section className="patricia-promo-section" aria-labelledby="patricia-promo-heading">
      <div className="section__inner">
        <div className="patricia-promo">
          <div className="patricia-promo__glow" aria-hidden="true" />
          <div className="patricia-promo__panel">
            <a
              href={owner.servicesUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="patricia-promo__logo-link"
            >
              <img
                src={assetUrl('equilibrium-logo.png')}
                alt={owner.servicesName}
                className="patricia-promo__logo"
                width={220}
                height={88}
              />
            </a>

            <div className="patricia-promo__grid">
              <div className="patricia-promo__media">
                <a
                  href={owner.servicesUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="patricia-promo__image-frame"
                >
                  <SmartImage
                    thumb={promo.thumb}
                    filename={promo.filename}
                    alt={`${owner.name} — ${owner.servicesName}`}
                    className="patricia-promo__image"
                  />
                </a>
              </div>

              <div className="patricia-promo__body">
                <p className="patricia-promo__eyebrow">Meet the owner</p>
                <h2 id="patricia-promo-heading">{owner.name}</h2>
                <p className="patricia-promo__tagline">Live Like You Love YourSelf</p>
                <p className="patricia-promo__lead">
                  Patricia runs Golden Bay Organics and also offers Touch for Health
                  Kinesiology, nutrition, and yoga through{' '}
                  <a href={owner.servicesUrl} target="_blank" rel="noopener noreferrer">
                    {owner.servicesName}
                  </a>
                  .
                </p>
                {promo.description && <p className="patricia-promo__desc">{promo.description}</p>}
                <div className="patricia-promo__actions">
                  <a
                    href={owner.servicesUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="patricia-promo__btn patricia-promo__btn--primary"
                  >
                    Visit Equilibrium
                  </a>
                  <a
                    href={EQUILIBRIUM_BOOKINGS}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="patricia-promo__btn patricia-promo__btn--secondary"
                  >
                    Book a free intro session
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
