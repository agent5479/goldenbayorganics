import { SiteHead } from '../components/layout/SiteHead'
import { Hero } from '../components/home/Hero'
import { ShopShowcase } from '../components/home/ShopShowcase'
import { StatsStrip } from '../components/home/StatsStrip'
import { FeaturedSpecial } from '../components/home/FeaturedSpecial'
import { PatriciaPromo } from '../components/home/PatriciaPromo'
import { CategoryGrid } from '../components/home/CategoryGrid'
import { InTheShop } from '../components/home/InTheShop'
import { RecentUpdates } from '../components/home/RecentUpdates'
import { buildLocalBusinessJsonLd, pageMeta } from '../lib/seo'

export function Component() {
  return (
    <>
      <SiteHead meta={pageMeta.home} jsonLd={buildLocalBusinessJsonLd()} />
      <Hero />
      <ShopShowcase />
      <StatsStrip />
      <FeaturedSpecial />
      <PatriciaPromo />
      <InTheShop />
      <CategoryGrid />
      <RecentUpdates />
    </>
  )
}
