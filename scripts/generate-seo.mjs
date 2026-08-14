import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const publicDir = join(root, 'public')

const SITE_URL = 'https://goldenbayorganics.co.nz'
const lastmod = new Date().toISOString().slice(0, 10)

const pages = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/stocklist', changefreq: 'weekly', priority: '0.9' },
  { path: '/visit', changefreq: 'monthly', priority: '0.8' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
]

function pageLoc(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

const robotsTxt = `# robots.txt for Golden Bay Organics
# Organic grocer in Takaka, Golden Bay, New Zealand
# ${SITE_URL}
#
# Allow full crawl of public pages for local search discovery
# (organic grocer Takaka, organic shop Golden Bay, etc.)

User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

Sitemap: ${SITE_URL}/sitemap.xml
Host: ${SITE_URL.replace('https://', '')}
`

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `  <url>
    <loc>${pageLoc(page.path)}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`

await writeFile(join(publicDir, 'robots.txt'), robotsTxt, 'utf8')
await writeFile(join(publicDir, 'sitemap.xml'), sitemapXml, 'utf8')

console.log(`Generated robots.txt and sitemap.xml (lastmod ${lastmod}).`)
