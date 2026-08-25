import { Link } from 'react-router-dom'
import { business, openingHours } from '../data/business'
import { SiteHead } from '../components/layout/SiteHead'
import {
  buildFaqPageJsonLd,
  buildPageJsonLd,
  pageMeta,
  visitFaqs,
} from '../lib/seo'
import './VisitPage.css'

const mapQuery = encodeURIComponent(`${business.address.full}, New Zealand`)
const mapEmbed = `https://maps.google.com/maps?q=${mapQuery}&output=embed`

export function Component() {
  return (
    <>
      <SiteHead
        meta={pageMeta.visit}
        jsonLd={buildPageJsonLd(pageMeta.visit, [buildFaqPageJsonLd(visitFaqs)])}
      />
      <header className="page-header">
        <div className="page-header__inner page-header__inner--narrow">
          <h1>Visit us</h1>
          <p className="page-subtitle">
            Golden Bay Organics is at 47 Commercial Street, Takaka — open Mon–Fri
            9am–5pm and Sat 10am–2pm. Call 03 525 8677 to check stock or place a
            bulk order.
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

      <section className="section section--alt" aria-labelledby="visit-faq-heading">
        <div className="section__inner section__inner--narrow">
          <p className="label section__label">FAQ</p>
          <h2 id="visit-faq-heading">Common questions</h2>
          <p className="visit-faq-lead">
            Straight answers for visitors looking up hours, location, and how shopping works in
            Takaka.
          </p>
          <dl className="visit-faq">
            {visitFaqs.map((faq) => (
              <div key={faq.question} className="visit-faq__item">
                <dt>
                  <h3>{faq.question}</h3>
                </dt>
                <dd>{faq.answer}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="section">
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
