import { useState } from 'react'
import { Icon } from './Icon'

/**
 * The design export references images on a CDN that expires them. Rather than
 * leaving a broken-image glyph on a dark page, a failed load falls back to a
 * tonal panel that still reads as part of the layout.
 */
export function SmartImage({ src, alt, className = '', style, label, ...rest }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={`s-container flex items-center justify-center ${className}`}
        role="img"
        style={style}
      >
        <div className="c-variant flex flex-col items-center gap-2 px-4 text-center opacity-45">
          <Icon name="car" size={26} />
          {label !== false && <span className="t-caps text-[10px]">{label || 'IMAGE UNAVAILABLE'}</span>}
        </div>
      </div>
    )
  }

  return (
    <img
      alt={alt}
      className={className}
      loading="lazy"
      onError={() => setFailed(true)}
      src={src}
      style={style}
      {...rest}
    />
  )
}
