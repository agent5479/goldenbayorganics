import { useState } from 'react'
import type { GalleryItemWithProduct } from '../../lib/gallery'
import { thumbUrl } from '../../lib/assets'
import './PhotoGrid.css'

interface PhotoGridProps {
  items: GalleryItemWithProduct[]
  onSelect: (item: GalleryItemWithProduct) => void
  selectedId?: string | null
}

export function PhotoGrid({ items, onSelect, selectedId }: PhotoGridProps) {
  return (
    <div className="photo-grid" role="list">
      {items.map((item) => (
        <PhotoTile
          key={item.id}
          item={item}
          isSelected={selectedId === item.id}
          onSelect={() => onSelect(item)}
        />
      ))}
    </div>
  )
}

function PhotoTile({
  item,
  isSelected,
  onSelect,
}: {
  item: GalleryItemWithProduct
  isSelected: boolean
  onSelect: () => void
}) {
  const [loaded, setLoaded] = useState(false)

  return (
    <button
      type="button"
      className={`photo-tile${isSelected ? ' photo-tile--selected' : ''}`}
      onClick={onSelect}
      role="listitem"
      aria-label={item.product ? `${item.product.name}, ${item.title}` : item.title}
    >
      <div className="photo-tile__frame">
        {!loaded && <div className="photo-tile__skeleton" aria-hidden="true" />}
        <img
          src={thumbUrl(item.thumb)}
          alt={item.title}
          loading="lazy"
          decoding="async"
          className={loaded ? 'photo-tile__img--loaded' : ''}
          onLoad={() => setLoaded(true)}
        />
        <div className="photo-tile__overlay">
          <span className="photo-tile__title">{item.product?.name ?? item.title}</span>
          {item.product && (
            <span className="photo-tile__price">
              {item.product.price !== null
                ? `$${item.product.price.toFixed(2)}/${item.product.unit}`
                : 'Ask in store'}
            </span>
          )}
          {item.product?.note && (
            <span className="photo-tile__note">{item.product.note}</span>
          )}
        </div>
      </div>
    </button>
  )
}
