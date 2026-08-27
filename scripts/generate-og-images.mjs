import { mkdir } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const imagesDir = join(root, 'public', 'images')
const ogDir = join(imagesDir, 'og')

/** Standard Open Graph size (~1.91:1). */
const WIDTH = 1200
const HEIGHT = 630

/**
 * Source photos → dedicated OG assets.
 * Keep filenames in sync with `pageMeta` / `categoryPageMeta` in src/lib/seo.ts.
 */
const OG_SOURCES = [
  { out: 'home.jpg', source: 'shopfront.jpg' },
  { out: 'visit.jpg', source: 'shopentranceway.jpg' },
  { out: 'about.jpg', source: 'shopfrontsideview.jpg' },
  { out: 'stocklist.jpg', source: 'busyshopshopatmosphere.jpg' },
  { out: 'produce.jpg', source: 'freshvegetables.jpg' },
  { out: 'herbs.jpg', source: 'corrianderanddill.jpg' },
  { out: 'bakery.jpg', source: 'freshbreads.jpg' },
  { out: 'bulk.jpg', source: 'bulk.jpg' },
  { out: 'specialty.jpg', source: 'healthyeating.jpg' },
  { out: 'household.jpg', source: 'bulklaundryagents.jpg' },
]

await mkdir(ogDir, { recursive: true })

for (const { out, source } of OG_SOURCES) {
  const input = join(imagesDir, source)
  const output = join(ogDir, out)
  await sharp(input)
    .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(output)
}

/** Sitewide default — same crop as home for legacy links / index.html fallback. */
await sharp(join(imagesDir, 'shopfront.jpg'))
  .resize(WIDTH, HEIGHT, { fit: 'cover', position: 'centre' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(join(imagesDir, 'og-default.jpg'))

console.log(
  `Generated ${OG_SOURCES.length} OG images at ${WIDTH}×${HEIGHT} plus og-default.jpg.`,
)
