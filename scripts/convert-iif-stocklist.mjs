import { readdir, readFile, writeFile, stat } from 'node:fs/promises'
import { join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(fileURLToPath(import.meta.url), '..', '..')
const datadumpDir = join(root, 'datadump')
const preferredName = 'stocklist today.IIF'
const outputPath = join(root, 'src', 'data', 'catalog.json')

/** Prefer explicit CLI path; else preferred filename; else newest *.IIF / *.iif in datadump/. */
async function resolveInputPath(cliArg) {
  if (cliArg) return resolve(cliArg)

  const preferred = join(datadumpDir, preferredName)
  try {
    await stat(preferred)
    return preferred
  } catch {
    // fall through
  }

  let entries
  try {
    entries = await readdir(datadumpDir)
  } catch {
    throw new Error(
      `No IIF found. Place an export in datadump/ (e.g. "${preferredName}") or pass a path.`,
    )
  }

  const iifs = entries.filter((name) => /\.iif$/i.test(name))
  if (iifs.length === 0) {
    throw new Error(
      `No .IIF files in datadump/. Drop a Reckon stocklist export there, then re-run.`,
    )
  }

  const ranked = await Promise.all(
    iifs.map(async (name) => {
      const full = join(datadumpDir, name)
      const info = await stat(full)
      return { full, mtime: info.mtimeMs }
    }),
  )
  ranked.sort((a, b) => b.mtime - a.mtime)
  return ranked[0].full
}

const PRODUCT_TYPES = new Set(['STOCK', 'ASSEMBLY'])

function stripQuotes(value) {
  if (value == null) return ''
  const s = String(value).trim()
  if (s.startsWith('"') && s.endsWith('"')) return s.slice(1, -1).trim()
  return s
}

function parsePrice(raw) {
  const s = stripQuotes(raw).replace(/,/g, '')
  if (!s || s.endsWith('%')) return null
  const n = Number(s)
  if (!Number.isFinite(n) || n === 0) return null
  return Math.round(n * 100) / 100
}

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
}

/** Parse Reckon HDR DATE like 7/15/2026 → YYYY-MM-DD */
function parseExportDate(raw) {
  const s = stripQuotes(raw)
  const m = s.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/)
  if (!m) return new Date().toISOString().slice(0, 10)
  const month = m[1].padStart(2, '0')
  const day = m[2].padStart(2, '0')
  return `${m[3]}-${month}-${day}`
}

function splitTsv(line) {
  return line.split('\t')
}

function buildIdx(headerLine) {
  const cols = splitTsv(headerLine).map((c) => c.replace(/^!/, ''))
  const idx = {}
  cols.forEach((name, i) => {
    idx[name] = i
  })
  return { cols, idx }
}

function isFullProductSchema(idx) {
  return 'DESC' in idx && 'GROSSPRICE' in idx && 'HIDDEN' in idx && 'INVITEMTYPE' in idx
}

async function main() {
  const inputPath = await resolveInputPath(process.argv[2])
  const text = await readFile(inputPath, 'utf8')
  const lines = text.split(/\r?\n/)

  let exportedAt = new Date().toISOString().slice(0, 10)
  let schema = null
  const rows = []

  for (const line of lines) {
    if (line.startsWith('HDR\t')) {
      const cols = splitTsv(line)
      if (cols[5]) exportedAt = parseExportDate(cols[5])
      continue
    }
    if (line.startsWith('!INVITEM\t')) {
      schema = buildIdx(line)
      continue
    }
    if (line.startsWith('INVITEM\t') && schema && isFullProductSchema(schema.idx)) {
      rows.push({ cols: splitTsv(line), idx: schema.idx })
    }
  }

  if (rows.length === 0) {
    throw new Error('No full product INVITEM rows found in IIF')
  }

  const get = (row, key) => stripQuotes(row.cols[row.idx[key]] ?? '')

  // Collect parent names (left side of NAME:child) from visible products
  const parentNames = new Set()
  for (const row of rows) {
    const type = get(row, 'INVITEMTYPE')
    if (!PRODUCT_TYPES.has(type)) continue
    if (get(row, 'HIDDEN') === 'Y') continue
    const name = get(row, 'NAME')
    const colon = name.indexOf(':')
    if (colon > 0) parentNames.add(name.slice(0, colon))
  }

  const usedIds = new Map()
  const items = []

  for (const row of rows) {
    const type = get(row, 'INVITEMTYPE')
    if (!PRODUCT_TYPES.has(type)) continue
    if (get(row, 'HIDDEN') === 'Y') continue

    const fullName = get(row, 'NAME')
    if (!fullName) continue

    // Skip category header rows (appear both as parent and as own INVITEM)
    if (parentNames.has(fullName) && !fullName.includes(':')) continue

    const colon = fullName.indexOf(':')
    const category = colon > 0 ? fullName.slice(0, colon) : 'Other'
    const leafName = colon > 0 ? fullName.slice(colon + 1) : fullName
    const desc = get(row, 'DESC')
    const displayName = desc || leafName
    if (!displayName) continue

    const gross = parsePrice(get(row, 'GROSSPRICE'))
    const fallback = parsePrice(get(row, 'PRICE'))
    const price = gross ?? fallback

    let idBase = slugify(`${category}-${displayName}`) || 'item'
    let id = idBase
    const count = usedIds.get(idBase) ?? 0
    if (count > 0) id = `${idBase}-${count + 1}`
    usedIds.set(idBase, count + 1)

    items.push({
      id,
      name: displayName,
      category,
      price,
    })
  }

  items.sort((a, b) => {
    const cat = a.category.localeCompare(b.category, undefined, { sensitivity: 'base' })
    if (cat !== 0) return cat
    return a.name.localeCompare(b.name, undefined, { sensitivity: 'base' })
  })

  const catalog = { exportedAt, items }
  await writeFile(outputPath, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8')
  console.log(
    `Wrote ${items.length} items to ${outputPath} (exportedAt: ${exportedAt}) from ${inputPath}`,
  )
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
