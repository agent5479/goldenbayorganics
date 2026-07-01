import { useEffect, useRef, useState } from 'react'
import { assetUrl, thumbUrl } from '../../lib/assets'

interface SmartImageProps {
  thumb: string
  filename: string
  alt: string
  loading?: 'lazy' | 'eager'
  className?: string
}

export function SmartImage({ thumb, filename, alt, loading = 'lazy', className = '' }: SmartImageProps) {
  const imgRef = useRef<HTMLImageElement>(null)
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading')
  const [src, setSrc] = useState(() => thumbUrl(thumb))

  useEffect(() => {
    const img = imgRef.current
    if (img?.complete && img.naturalWidth > 0) {
      setStatus('loaded')
    }
  }, [src])

  return (
    <div className={`smart-image${status === 'loaded' ? ' smart-image--loaded' : ''}${className ? ` ${className}` : ''}`}>
      {status === 'loading' && <div className="smart-image__skeleton" aria-hidden="true" />}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        loading={loading}
        decoding="async"
        onLoad={() => setStatus('loaded')}
        onError={() => {
          if (src.includes('/thumbs/')) {
            setSrc(assetUrl(filename))
          } else {
            setStatus('error')
          }
        }}
      />
      {status === 'error' && (
        <div className="smart-image__fallback" aria-hidden="true">
          <span className="label">Photo unavailable</span>
        </div>
      )}
    </div>
  )
}
