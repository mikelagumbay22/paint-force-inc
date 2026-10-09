import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

const clamp = (n, a, b) => Math.min(b, Math.max(a, n))

function SceneImage({ base, fallback }) {
  return (
    <picture className="pointer-events-none absolute inset-0 block h-full w-full">
      <source media="(max-width: 767px)" srcSet={`/scroll-scene/mobile/${base}.webp`} type="image/webp" />
      <source media="(max-width: 767px)" srcSet={`/scroll-scene/mobile/${base}.${fallback}`} />
      <source srcSet={`/scroll-scene/desktop/${base}.webp`} type="image/webp" />
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        draggable={false}
        src={`/scroll-scene/desktop/${base}.${fallback}`}
      />
    </picture>
  )
}

/**
 * Pinned 200vh scene. Primer stays put, the painted wall wipes on like a
 * roller, the sofa lags at 0.6×, and the foreground props drift outward.
 * Reduced motion renders the finished room at its natural height.
 */
export function PaintRoom() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const wipeRef = useRef(null)
  const sofaRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const lineRef = useRef(null)

  useEffect(() => {
    if (reduce) return undefined
    const section = sectionRef.current
    const pin = pinRef.current
    if (!section || !pin) return undefined

    let raf = 0
    const paint = () => {
      const header = Number.parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--header-h')
      ) || 0
      const top = section.getBoundingClientRect().top
      const travel = section.offsetHeight - pin.offsetHeight
      const progress = travel > 0 ? clamp((header - top) / travel, 0, 1) : 1
      const unit = Math.min(window.innerHeight * 0.1, 96)
      if (wipeRef.current) {
        wipeRef.current.style.clipPath = `inset(0 ${(1 - progress) * 100}% 0 0)`
      }
      if (sofaRef.current) {
        sofaRef.current.style.transform = `translate3d(0, ${(progress * unit * 0.6).toFixed(2)}px, 0)`
      }
      if (leftRef.current) {
        leftRef.current.style.transform = `translate3d(${(-progress * unit * 1.25).toFixed(2)}px, ${(progress * unit * 0.2).toFixed(2)}px, 0)`
      }
      if (rightRef.current) {
        rightRef.current.style.transform = `translate3d(${(progress * unit * 1.4).toFixed(2)}px, ${(progress * unit * 0.15).toFixed(2)}px, 0)`
      }
      if (lineRef.current) lineRef.current.style.opacity = String(0.35 + progress * 0.65)
    }

    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [reduce])

  return (
    <section
      aria-label="Illustrative paint study"
      className="paint-track relative h-[200vh]"
      ref={sectionRef}
    >
      <div
        className="paint-pin sticky z-0 overflow-hidden"
        ref={pinRef}
        style={{ top: 'var(--header-h)', height: 'calc(100svh - var(--header-h))' }}
      >
        <SceneImage base="bg-wall-primer" fallback="jpg" />
        <div className="paint-wipe pointer-events-none absolute inset-0" ref={wipeRef}>
          <SceneImage base="bg-wall-painted" fallback="jpg" />
        </div>
        <div className="paint-layer pointer-events-none absolute inset-0" ref={sofaRef}>
          <SceneImage base="mid-sofa" fallback="png" />
        </div>
        <div className="paint-layer pointer-events-none absolute inset-0" ref={leftRef}>
          <SceneImage base="fg-left" fallback="png" />
        </div>
        <div className="paint-layer pointer-events-none absolute inset-0" ref={rightRef}>
          <SceneImage base="fg-right" fallback="png" />
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 flex items-end px-gutter pb-24 md:items-center md:pb-16">
          <div className="max-w-xl">
            <p className="t-caps c-primary">Motion study</p>
            <h2 className="t-h1 c-on mt-3">
              <span className="block">From bare walls</span>
              <span className="c-primary mt-1 block" ref={lineRef} style={{ opacity: reduce ? 1 : 0.35 }}>
                to a finished room.
              </span>
            </h2>
          </div>
        </div>

        <p className="chip badge-illustrative chip-wrap pointer-events-none absolute left-3 top-3 z-20 max-w-[16rem] sm:bottom-4 sm:left-6 sm:top-auto sm:max-w-xs">
          Illustrative image, not a photo of Paint Force&apos;s work
        </p>
      </div>
    </section>
  )
}
