import { Head } from 'vite-react-ssg'
import type { PageMeta } from '../../lib/seo'
import { getOgImage, OG_IMAGE, pageUrl } from '../../lib/seo'
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
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content={business.name} />
      <meta name="geo.region" content="NZ-TAS" />
      <meta name="geo.placename" content="Takaka, Golden Bay" />
      <meta name="geo.position" content="-40.8556;172.8076" />
      <meta name="ICBM" content="-40.8556, 172.8076" />
      <link rel="canonical" href={url} />
      <link rel="sitemap" type="application/xml" title="Sitemap" href={`${SITE_URL}/sitemap.xml`} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={business.name} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={image} />
      <meta property="og:image:secure_url" content={image} />
      <meta property="og:image:type" content={OG_IMAGE.type} />
      <meta property="og:image:width" content={String(OG_IMAGE.width)} />
      <meta property="og:image:height" content={String(OG_IMAGE.height)} />
      <meta property="og:image:alt" content={OG_IMAGE.alt} />
      <meta property="og:locale" content="en_NZ" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:image:alt" content={OG_IMAGE.alt} />

      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Head>
  )
}
