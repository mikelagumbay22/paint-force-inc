import { useEffect, useRef, useState } from 'react'
import { Icon } from './Icon'

/**
 * Drag, click, or arrow-key comparison. Composite files are side-by-side
 * before | after shots, so each half is cropped to fill the frame.
 */
export function BeforeAfter({ src, alt = '', className = '' }) {
  const box = useRef(null)
  const [pos, setPos] = useState(58)
  const [width, setWidth] = useState(0)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    const el = box.current
    if (!el || failed) return
    const measure = () => setWidth(el.clientWidth)
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [failed])

  const setFromX = (clientX) => {
    const rect = box.current?.getBoundingClientRect()
    if (!rect?.width) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(94, Math.max(6, next)))
  }

  const onKey = (e) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setPos((p) => Math.max(6, p - 4))
    } else if (e.key === 'ArrowRight') {
      e.preventDefault()
      setPos((p) => Math.min(94, p + 4))
    }
  }

  if (failed || !src) {
    return (
      <div
        aria-label={alt || 'Illustrative photo unavailable'}
        className={`s-container relative flex items-center justify-center ${className}`}
        role="img"
      >
        <span className="t-caps c-variant px-4 text-center text-[10px] opacity-70">
          Illustrative photo unavailable
        </span>
      </div>
    )
  }

  return (
    <div
      aria-label={alt}
      className={`relative touch-none select-none overflow-hidden ${className}`}
      onPointerDown={(e) => {
        if (e.button !== 0) return
        e.currentTarget.setPointerCapture(e.pointerId)
        setFromX(e.clientX)
      }}
      onPointerMove={(e) => {
        if (!e.currentTarget.hasPointerCapture(e.pointerId)) return
        setFromX(e.clientX)
      }}
      ref={box}
      role="group"
    >
      <img
        alt=""
        className="pointer-events-none absolute h-px w-px opacity-0"
        onError={() => setFailed(true)}
        src={src}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage: `url("${src}")`,
          backgroundPosition: 'right center',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '200% 100%',
        }}
      />
      <div className="absolute inset-y-0 left-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <div
          className="absolute inset-y-0 left-0 h-full"
          style={{
            width: width ? `${width}px` : '100%',
            backgroundImage: `url("${src}")`,
            backgroundPosition: 'left center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: width ? `${width * 2}px 100%` : '200% 100%',
          }}
        />
      </div>

      <span
        className="t-caps pointer-events-none absolute left-3 top-3 rounded-sm px-2 py-1 text-[10px]"
        style={{ background: 'rgba(11,15,18,.72)', color: 'var(--on-surface)' }}
      >
        Before
      </span>
      <span
        className="t-caps pointer-events-none absolute right-3 top-3 rounded-sm px-2 py-1 text-[10px]"
        style={{ background: 'rgba(11,15,18,.72)', color: 'var(--primary)' }}
      >
        After
      </span>
      <span className="chip badge-illustrative pointer-events-none absolute bottom-3 left-3">Illustrative</span>

      <div
        aria-label="Compare before and after"
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={Math.round(pos)}
        aria-valuetext={`${Math.round(pos)} percent across the repair`}
        className="absolute inset-y-0 z-10 w-11 -translate-x-1/2 cursor-ew-resize focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
        onKeyDown={onKey}
        role="slider"
        style={{ left: `${pos}%` }}
        tabIndex={0}
      >
        <span className="absolute inset-y-0 left-1/2 w-0.5 -translate-x-1/2 bg-white" />
        <span
          className="absolute left-1/2 top-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
          style={{ background: '#fff', color: '#1c2024' }}
        >
          <Icon name="sliders" size={16} />
        </span>
      </div>
    </div>
  )
}
