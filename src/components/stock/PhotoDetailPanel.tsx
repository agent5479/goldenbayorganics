import { useEffect } from 'react'
import type { GalleryItemWithProduct } from '../../lib/gallery'
import { fullUrl } from '../../lib/assets'
import './PhotoDetailPanel.css'

interface PhotoDetailPanelProps {
  item: GalleryItemWithProduct | null
  onClose: () => void
}

export function PhotoDetailPanel({ item, onClose }: PhotoDetailPanelProps) {
  useEffect(() => {
    if (!item) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [item, onClose])

  if (!item) return null

  return (
    <div className="photo-panel-backdrop" onClick={onClose} role="presentation">
      <div
        className="photo-panel"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="photo-panel-title"
      >
        <button type="button" className="photo-panel__close" onClick={onClose} aria-label="Close">
          ×
        </button>
        <div className="photo-panel__image-wrap">
          <img src={fullUrl(item.filename)} alt={item.title} />
        </div>
        <div className="photo-panel__body">
          <h2 id="photo-panel-title">{item.product?.name ?? item.title}</h2>
          {item.product ? (
            <>
              <p className="photo-panel__price">
                {item.product.price !== null
                  ? `$${item.product.price.toFixed(2)} / ${item.product.unit}`
                  : 'Ask in store for price'}
              </p>
              <p className="photo-panel__note">{item.product.note}</p>
            </>
          ) : (
            <p className="photo-panel__note">Available in store — call or visit to check stock.</p>
          )}
        </div>
      </div>
    </div>
  )
}
