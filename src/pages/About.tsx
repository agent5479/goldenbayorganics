import { Link } from 'react-router-dom'
import { business } from '../data/business'
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
            {business.name} is Takaka&apos;s organic grocer — a place where fresh produce, bulk
            pantry staples, specialty foods, and eco-friendly household goods come together under
            one roof.
          </p>
          <p>
            We source local spray-free and organic fruit and vegetables whenever we can, support
            Golden Bay producers, and keep prices as accessible as possible for our community.
            Whether you are picking up heritage apples, refilling bulk oats, or grabbing a Rainbow
            Kitchen pie, you will find the same friendly people behind the counter.
          </p>

          <h2>What you will find</h2>
          <ul>
            <li>Fresh herbs, fruit, and vegetables — seasonal and often local</li>
            <li>Artisan breads and bakery items</li>
            <li>Bulk grains, nuts, legumes, and pantry staples</li>
            <li>Specialty foods and health products</li>
            <li>Eco cleaners and household refills</li>
          </ul>

          <h2>Looking ahead</h2>
          <p>
            We are building an online stocklist so you can see what is in store before you visit —
            and eventually order online. For now, browse our{' '}
            <Link to="/stocklist">photo stocklist</Link>, check our{' '}
            <a href={business.facebook} target="_blank" rel="noopener noreferrer">
              Facebook page
            </a>{' '}
            for weekly specials, or call <a href={`tel:${business.phoneTel}`}>{business.phone}</a>.
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
