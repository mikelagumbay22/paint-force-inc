import { useEffect, useRef } from 'react'
import { publicUrl } from '../lib/asset'
import { useReducedMotion } from '../lib/hooks'

const clamp = (n, a, b) => Math.min(b, Math.max(a, n))

function SceneImage({ base, fallback }) {
  return (
    <picture className="pointer-events-none absolute inset-0 block h-full w-full">
      <source media="(max-width: 767px)" srcSet={publicUrl(`/scroll-scene/mobile/${base}.webp`)} type="image/webp" />
      <source media="(max-width: 767px)" srcSet={publicUrl(`/scroll-scene/mobile/${base}.${fallback}`)} />
      <source srcSet={publicUrl(`/scroll-scene/desktop/${base}.webp`)} type="image/webp" />
      <img
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        decoding="async"
        draggable={false}
        src={publicUrl(`/scroll-scene/desktop/${base}.${fallback}`)}
      />
    </picture>
  )
}

/**
 * Pinned 200vh scene. The damaged panel stays put, the repaired panel wipes
 * on left to right like a spray pass, the gun moves at 0.8×, and the cart
 * and tape drift outward. Reduced motion shows the repaired panel only.
 */
export function PaintRoom() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const pinRef = useRef(null)
  const wipeRef = useRef(null)
  const gunRef = useRef(null)
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
      if (gunRef.current) {
        gunRef.current.style.transform = `translate3d(0, ${(progress * unit * 0.8).toFixed(2)}px, 0)`
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
      aria-label="Illustrative panel repair"
      className="paint-track relative h-[200vh]"
      ref={sectionRef}
    >
      <div
        className="paint-pin sticky z-0 overflow-hidden"
        ref={pinRef}
        style={{ top: 'var(--header-h)', height: 'calc(100svh - var(--header-h))' }}
      >
        <SceneImage base="bg-panel-damaged" fallback="jpg" />
        <div className="paint-wipe pointer-events-none absolute inset-0" ref={wipeRef}>
          <SceneImage base="bg-panel-repaired" fallback="jpg" />
        </div>
        <div className="paint-layer pointer-events-none absolute inset-0" ref={gunRef}>
          <SceneImage base="mid-spraygun" fallback="png" />
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
              <span className="block">From dents and scratches</span>
              <span className="c-primary mt-1 block" ref={lineRef} style={{ opacity: reduce ? 1 : 0.35 }}>
                to a factory finish.
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
