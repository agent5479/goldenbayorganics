import type { GalleryItemWithProduct } from '../../lib/gallery'
import { SmartImage } from './SmartImage'
import './PhotoGrid.css'

interface PhotoGridProps {
  items: GalleryItemWithProduct[]
  onSelect: (item: GalleryItemWithProduct) => void
  selectedId?: string | null
}

export function PhotoGrid({ items, onSelect, selectedId }: PhotoGridProps) {
  if (items.length === 0) {
    return (
      <p className="photo-grid__empty">
        No photos in this category yet. Try another filter or visit us in store.
      </p>
    )
  }

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
  const displayName =
    item.products.length > 1
      ? item.products.map((p) => p.name).join(' · ')
      : (item.product?.name ?? item.title)

  return (
    <article
      className={`photo-tile${isSelected ? ' photo-tile--selected' : ''}`}
      role="listitem"
    >
      <button
        type="button"
        className="photo-tile__button"
        onClick={onSelect}
        aria-label={displayName}
      >
        <SmartImage
          thumb={item.thumb}
          filename={item.filename}
          alt={item.title}
          className="photo-tile__image"
        />
      </button>
      <div className="photo-tile__meta">
        <h3 className="photo-tile__title">{displayName}</h3>
        {item.products.length === 1 && item.product && (
          <p className="photo-tile__price">
            {item.product.price !== null
              ? `$${item.product.price.toFixed(2)} / ${item.product.unit}`
              : 'Ask in store'}
          </p>
        )}
        {item.products.length > 1 && (
          <p className="photo-tile__price">{item.products.length} items · tap for details</p>
        )}
        {item.product?.note && item.products.length === 1 && (
          <p className="photo-tile__note">{item.product.note}</p>
        )}
        {!item.product && item.kind === 'shop' && (
          <p className="photo-tile__note">Our shop in Takaka</p>
        )}
      </div>
    </article>
  )
}
