import { Link } from 'react-router-dom'
import { business } from '../../data/business'
import { assetUrl } from '../../lib/assets'
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
            <img
              src={assetUrl('shopfront.jpg')}
              alt="Golden Bay Organics shopfront on Commercial Street, Takaka"
              width={640}
              height={480}
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
