import { business, openingHours } from '../data/business'
import { SiteHead } from '../components/layout/SiteHead'
import { buildLocalBusinessJsonLd, pageMeta } from '../lib/seo'
import './VisitPage.css'

const mapQuery = encodeURIComponent(`${business.address.full}, New Zealand`)
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`

export function Component() {
  return (
    <>
      <SiteHead meta={pageMeta.visit} jsonLd={buildLocalBusinessJsonLd()} />
      <header className="page-header">
        <div className="page-header__inner page-header__inner--narrow">
          <div className="folio">
            <span className="mono">Takaka</span>
            <span className="folio__sep">·</span>
            <span className="mono">Golden Bay</span>
          </div>
          <h1>Visit us</h1>
          <p>We would love to see you at the shop on Commercial Street.</p>
        </div>
      </header>

      <div className="section">
        <div className="section__inner visit-grid">
          <div className="visit-card">
            <p className="mono visit-card__label">Address</p>
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
            <p className="mono visit-card__label">Phone</p>
            <p className="visit-card__value">
              <a href={`tel:${business.phoneTel}`}>{business.phone}</a>
            </p>
            <p className="visit-card__hint">Call to check stock or place a bulk order.</p>
          </div>

          <div className="visit-card">
            <p className="mono visit-card__label">Facebook</p>
            <p className="visit-card__value">
              <a href={business.facebook} target="_blank" rel="noopener noreferrer">
                Golden Bay Organics — Takaka
              </a>
            </p>
            <p className="visit-card__hint">Weekly specials and store updates.</p>
          </div>

          <div className="visit-card visit-card--wide">
            <p className="mono visit-card__label">Opening hours</p>
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
          </div>
        </div>
      </div>

      <section className="section section--alt">
        <div className="section__inner">
          <p className="mono section__label">Map</p>
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
