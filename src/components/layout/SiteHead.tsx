import { Head } from 'vite-react-ssg'
import type { PageMeta } from '../../lib/seo'
import { getOgImage, pageUrl } from '../../lib/seo'
import { business, SITE_URL } from '../../data/business'

interface SiteHeadProps {
  meta: PageMeta
  jsonLd?: Record<string, unknown> | Record<string, unknown>[]
}

export function SiteHead({ meta, jsonLd }: SiteHeadProps) {
  const url = pageUrl(meta.path)
  const image = getOgImage(meta.image)

  return (
    <Head>
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={url} />
      <link rel="sitemap" type="application/xml" title="Sitemap" href={`${SITE_URL}/sitemap.xml`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:locale" content="en_NZ" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Head>
  )
}
