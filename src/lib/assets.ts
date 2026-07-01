const base = import.meta.env.BASE_URL

export function assetUrl(filename: string): string {
  return `${base}images/${filename}`
}

export function thumbUrl(thumbFilename: string): string {
  return `${base}images/thumbs/${thumbFilename}`
}

export function fullUrl(filename: string): string {
  return assetUrl(filename)
}

export const PLACEHOLDER_COLORS: Record<string, string> = {
  produce: '#7a9e6a',
  herbs: '#6b8f5e',
  bakery: '#c9a66b',
  bulk: '#a6896b',
  specialty: '#b86b3f',
  household: '#8a9a7b',
  shop: '#5a7a52',
  default: '#5a7a52',
}
