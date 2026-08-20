import { Link } from 'react-router-dom'
import { business, openingHours } from '../data/business'
import { SiteHead } from '../components/layout/SiteHead'
import { buildPageJsonLd, pageMeta } from '../lib/seo'
import './VisitPage.css'

const mapQuery = encodeURIComponent(`${business.address.full}, New Zealand`)
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`

export function Component() {
  return (
    <>
      <SiteHead meta={pageMeta.visit} jsonLd={buildPageJsonLd(pageMeta.visit)} />
      <header className="page-header">
        <div className="page-header__inner page-header__inner--narrow">
          <h1>Visit us</h1>
          <p className="page-subtitle">
            Organic groceries, bulk refills, and bakery staples on Commercial Street — we would
            love to see you in store.
          </p>
        </div>
      </header>

      <div className="section">
        <div className="section__inner visit-grid">
          <div className="visit-card">
            <p className="label visit-card__label">Address</p>
            <p className="visit-card__value">{business.address.full}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              Open in Google Maps
            </a>
          </div>

          <div className="visit-card">
            <p className="label visit-card__label">Phone</p>
            <p className="visit-card__value">
              <a href={`tel:${business.phoneTel}`}>{business.phone}</a>
            </p>
            <p className="visit-card__hint">
              Call to check stock, reserve bakery items, or place a bulk order before you drive in.
            </p>
          </div>

          <div className="visit-card">
            <p className="label visit-card__label">Facebook</p>
            <p className="visit-card__value">
              <a href={business.profiles.facebook} target="_blank" rel="noopener noreferrer">
                Golden Bay Organics — Takaka
              </a>
            </p>
            <p className="visit-card__hint">Weekly specials, seasonal produce notes, and store updates.</p>
          </div>

          <div className="visit-card visit-card--wide">
            <p className="label visit-card__label">Opening hours</p>
            <table className="hours-table">
              <tbody>
                {openingHours.map((row) => (
                  <tr key={row.day}>
                    <th scope="row">{row.day}</th>
                    <td>{row.hours}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="visit-card__hint">
              Bring jars for bulk foods and cleaner refills when you can. Browse departments on our{' '}
              <Link to="/stocklist">stocklist</Link> or jump straight to{' '}
              <Link to="/shop/produce">produce</Link>, <Link to="/shop/bulk">bulk foods</Link>, or{' '}
              <Link to="/shop/household">eco cleaners</Link>.
            </p>
          </div>
        </div>
      </div>

      <section className="section section--alt">
        <div className="section__inner">
          <p className="label section__label">Map</p>
          <div className="visit-map">
            <iframe
              title="Map to Golden Bay Organics"
              src={mapEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
        </div>
      </section>
    </>
  )
}
