import { readdir, mkdir, writeFile } from 'node:fs/promises'
import { join, basename, extname } from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'
import { readFileSync } from 'node:fs'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const imagesDir = join(root, 'public', 'images')
const thumbsDir = join(imagesDir, 'thumbs')
const galleryPath = join(root, 'src', 'data', 'gallery.json')
const stockPath = join(root, 'src', 'data', 'stock.json')

const stock = JSON.parse(readFileSync(stockPath, 'utf8'))
const imageToProduct = new Map(stock.map((item) => [item.image, item.id]))

const CATEGORY_RULES = [
  { category: 'shop', keywords: ['shop', 'storefront', 'entrance', 'floor', 'layout', 'atmosphere', 'busy', 'discount', 'calendar', 'book', 'plant', 'patricia', 'kinesiology', 'services'] },
  { category: 'bakery', keywords: ['bread', 'pie', 'cookie', 'baked', 'frozenbread'] },
  { category: 'bulk', keywords: ['bulk', 'oat', 'rice', 'nut', 'dried', 'gried', 'medjool', 'date'] },
  { category: 'herbs', keywords: ['herb', 'spice', 'ginger', 'corriander', 'dill', 'parsley', 'tea', 'tincture', 'mushroom', 'cacao', 'coffee', 'chai'] },
  { category: 'household', keywords: ['dishwash', 'laundry', 'cleaner', 'household'] },
  { category: 'specialty', keywords: ['nectar', 'tonic', 'honey', 'iceblock', 'ceremonial', 'egg', 'healthyeating'] },
  { category: 'produce', keywords: ['apple', 'onion', 'potato', 'banana', 'orange', 'beet', 'leek', 'aubergine', 'capsicum', 'carrot', 'cauliflower', 'celery', 'cucumber', 'fruit', 'vegetable', 'broccoli', 'cabbage', 'asparagus', 'avocado', 'apricot', 'grape', 'kale', 'lettuce', 'papaya', 'pear', 'plum', 'radish', 'tomato', 'fridge', 'vege', 'mushroom'] },
]

function titleFromFilename(filename) {
  const name = basename(filename, extname(filename))
  const words = [
    'shop', 'front', 'entrance', 'floor', 'layout', 'local', 'varieties', 'heritage',
    'fresh', 'fridge', 'bread', 'frozen', 'discount', 'percent', 'bulk', 'laundry',
    'vegetable', 'fruit', 'mushroom', 'potato', 'apple', 'organic', 'health', 'eating',
  ]
  let spaced = name.replace(/([a-z])([A-Z])/g, '$1 $2')
  for (const word of words.sort((a, b) => b.length - a.length)) {
    spaced = spaced.replace(new RegExp(word, 'gi'), ` ${word} `)
  }
  return spaced
    .replace(/(\d+)/g, ' $1 ')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function inferCategory(filename) {
  const lower = filename.toLowerCase()
  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some((kw) => lower.includes(kw))) return rule.category
  }
  return 'produce'
}

function idFromFilename(filename) {
  return basename(filename, extname(filename)).toLowerCase().replace(/[^a-z0-9]+/g, '-')
}

await mkdir(thumbsDir, { recursive: true })

const files = (await readdir(imagesDir))
  .filter((f) => /\.jpe?g$/i.test(f) && !f.startsWith('og-default'))
  .sort()

const gallery = []

for (const filename of files) {
  const inputPath = join(imagesDir, filename)
  const thumbName = `${basename(filename, extname(filename))}.webp`
  const thumbPath = join(thumbsDir, thumbName)

  await sharp(inputPath)
    .resize({ width: 480, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbPath)

  const productId = imageToProduct.get(filename) ?? null

  gallery.push({
    id: idFromFilename(filename),
    filename,
    thumb: thumbName,
    title: titleFromFilename(filename),
    category: inferCategory(filename),
    productId,
  })
}

await writeFile(galleryPath, `${JSON.stringify(gallery, null, 2)}\n`)
console.log(`Generated ${gallery.length} thumbnails and gallery manifest.`)
