import { useState } from 'react'
import type { StockItem } from '../../lib/stock'
import { formatPrice } from '../../lib/stock'
import { PLACEHOLDER_COLORS, assetUrl } from '../../lib/assets'
import './ProductCard.css'

interface ProductCardProps {
  item: StockItem
}

export function ProductCard({ item }: ProductCardProps) {
  const [imgError, setImgError] = useState(false)
  const placeholderColor = PLACEHOLDER_COLORS[item.category] ?? PLACEHOLDER_COLORS.default

  return (
    <article className="product-card">
      <div className="product-card__media">
        {!imgError ? (
          <img
            src={assetUrl(item.image)}
            alt={item.name}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            className="product-card__placeholder"
            style={{ background: `linear-gradient(135deg, ${placeholderColor}22, ${placeholderColor}44)` }}
            aria-hidden="true"
          >
            <span className="mono">{item.category}</span>
          </div>
        )}
      </div>
      <div className="product-card__body">
        <h3 className="product-card__name">{item.name}</h3>
        <p className="product-card__price mono">{formatPrice(item.price, item.unit)}</p>
        <p className="product-card__note">{item.note}</p>
      </div>
    </article>
  )
}
