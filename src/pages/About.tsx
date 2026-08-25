import { Link } from 'react-router-dom'
import { business, categories } from '../data/business'
import { SiteHead } from '../components/layout/SiteHead'
import { buildPageJsonLd, pageMeta } from '../lib/seo'
import './AboutPage.css'

export function Component() {
  return (
    <>
      <SiteHead meta={pageMeta.about} jsonLd={buildPageJsonLd(pageMeta.about)} />
      <header className="page-header">
        <div className="page-header__inner page-header__inner--narrow">
          <span className="chip chip--accent">Local & community</span>
          <h1>
            More than just <em>food</em>
          </h1>
          <p className="page-subtitle">{business.tagline}</p>
        </div>
      </header>

      <article className="section">
        <div className="section__inner section__inner--narrow about-prose">
          <p>
            Golden Bay Organics is Takaka&apos;s organic grocer at 47 Commercial Street —
            seasonal produce, bulk pantry refills, bakery favourites, and eco cleaners without a
            supermarket run out of Golden Bay.
          </p>
          <p>
            We source local spray-free and organic fruit and vegetables whenever we can, support
            Golden Bay producers, and keep prices as accessible as possible for our community.
            Whether you are picking up heritage apples, weighing bulk oats into your own jar, or
            grabbing a Rainbow Kitchen pie, you will find the same friendly people behind the
            counter.
          </p>

          <h2>What you will find</h2>
          <ul>
            {categories.map((cat) => (
              <li key={cat.id}>
                <Link to={`/shop/${cat.id}`}>{cat.label}</Link> — {cat.description}
              </li>
            ))}
          </ul>

          <h2>Looking ahead</h2>
          <p>
            Browse our searchable <Link to="/stocklist">stocklist and photo gallery</Link> before
            you visit, check{' '}
            <a href={business.profiles.facebook} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>{' '}
            for weekly specials, or call{' '}
            <a href={`tel:${business.phoneTel}`}>{business.phone}</a> to confirm stock or place a
            bulk order. We are building toward online ordering; for now the catalog is your window
            into what we usually carry.
          </p>

          <h2>Patricia Smith & Equilibrium</h2>
          <p>
            Golden Bay Organics is run by {business.owner.name}, who also offers Touch for Health
            Kinesiology, nutrition, and yoga through{' '}
            <a href={business.owner.servicesUrl} target="_blank" rel="noopener noreferrer">
              {business.owner.servicesName}
            </a>
            . Visit Patricia&apos;s wellness site to learn about sessions, courses, and her holistic
            approach to health.
          </p>
        </div>
      </article>
    </>
  )
}
