import { Link } from 'react-router-dom'
import { business } from '../../data/business'
import { SmartImage } from '../stock/SmartImage'
import './Hero.css'

export function Hero() {
  return (
    <section className="hero">
      <div className="hero__inner">
        <div className="hero__grid">
          <div className="hero__copy">
            <span className="chip chip--accent">Organic grocer · Takaka</span>

            <h1 className="hero__title">
              Your local <em>organic</em> grocer
            </h1>

            <p className="hero__tagline">{business.tagline}</p>

            <div className="hero__actions">
              <Link to="/stocklist" className="btn btn--primary">
                View stocklist
              </Link>
              <Link to="/visit" className="btn">
                Find us
              </Link>
            </div>
          </div>

          <figure className="hero__figure">
            <SmartImage
              thumb="shopfront.webp"
              filename="shopfront.jpg"
              alt="Golden Bay Organics shopfront on Commercial Street, Takaka"
              loading="eager"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
