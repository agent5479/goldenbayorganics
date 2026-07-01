import { Link } from 'react-router-dom'
import { business, openingHours } from '../../data/business'
import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__col">
          <p className="footer__brand">{business.name}</p>
          <p className="footer__muted">{business.address.full}</p>
          <p className="footer__muted">
            <a href={`tel:${business.phoneTel}`}>{business.phone}</a>
          </p>
        </div>

        <div className="footer__col">
          <p className="label footer__label">Hours</p>
          <p className="footer__muted">Mon–Fri 9am – 5pm</p>
          <p className="footer__muted">Sat 10am – 2pm · Sun closed</p>
        </div>

        <div className="footer__col">
          <p className="label footer__label">Connect</p>
          <p>
            <a href={business.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
          </p>
          <p>
            <Link to="/visit">Directions & map</Link>
          </p>
          <p>
            <Link to="/stocklist">View stocklist</Link>
          </p>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} {business.name} · Takaka, Golden Bay</p>
      </div>
    </footer>
  )
}
