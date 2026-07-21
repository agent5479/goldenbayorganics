import { readFile, writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const publicDir = join(root, 'public')
const svgPath = join(publicDir, 'favicon.svg')

const SITE_URL = 'https://goldenbayorganics.co.nz'

async function pngWithSize(svg, size) {
  return sharp(svg).resize(size, size).png().toBuffer()
}

/** Multi-size ICO with PNG-compressed entries (supported by modern browsers). */
async function buildIco(svg) {
  const sizes = [16, 32, 48]
  const pngs = await Promise.all(sizes.map((s) => pngWithSize(svg, s)))

  const count = pngs.length
  const headerSize = 6
  const entrySize = 16
  let offset = headerSize + entrySize * count

  const header = Buffer.alloc(headerSize)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const parts = [header]
  const dataParts = []

  for (let i = 0; i < count; i++) {
    const size = sizes[i]
    const png = pngs[i]
    const entry = Buffer.alloc(entrySize)
    entry.writeUInt8(size, 0)
    entry.writeUInt8(size, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(png.length, 8)
    entry.writeUInt32LE(offset, 12)
    parts.push(entry)
    dataParts.push(png)
    offset += png.length
  }

  return Buffer.concat([...parts, ...dataParts])
}

const svg = await readFile(svgPath)

const outputs = [
  { file: 'favicon-16x16.png', size: 16 },
  { file: 'favicon-32x32.png', size: 32 },
  { file: 'apple-touch-icon.png', size: 180 },
  { file: 'android-chrome-192x192.png', size: 192 },
  { file: 'android-chrome-512x512.png', size: 512 },
]

for (const { file, size } of outputs) {
  await writeFile(join(publicDir, file), await pngWithSize(svg, size))
}

await writeFile(join(publicDir, 'favicon.ico'), await buildIco(svg))

const manifest = {
  name: 'Golden Bay Organics',
  short_name: 'GBO Takaka',
  description:
    'Organic grocer in Takaka, Golden Bay — fresh produce, herbs, breads, bulk foods, speciality foods and eco cleaners at 47 Commercial Street.',
  start_url: '/',
  scope: '/',
  display: 'browser',
  background_color: '#faf8f4',
  theme_color: '#5a7a52',
  lang: 'en-NZ',
  icons: [
    {
      src: '/android-chrome-192x192.png',
      sizes: '192x192',
      type: 'image/png',
    },
    {
      src: '/android-chrome-512x512.png',
      sizes: '512x512',
      type: 'image/png',
    },
  ],
}

await writeFile(
  join(publicDir, 'site.webmanifest'),
  `${JSON.stringify(manifest, null, 2)}\n`,
  'utf8',
)

console.log(
  `Generated favicons + site.webmanifest for Golden Bay Organics, Takaka (${SITE_URL}).`,
)
