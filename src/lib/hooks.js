import { useEffect, useRef, useState } from 'react'

/** Adds .is-visible once an element scrolls into view. One-shot: no replay on
 *  scroll-up, which reads as twitchy on a long page. */
export function useReveal(options = {}) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    // Reveals the container and any nested .reveal children, so a grid can
    // stagger its cards off a single observer.
    const show = () => {
      el.classList.add('is-visible')
      el.querySelectorAll('.reveal').forEach((n) => n.classList.add('is-visible'))
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      show()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show()
          io.disconnect()
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px', ...options }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return ref
}

/** Staggers children of a revealed container by index. */
export function revealDelay(i, step = 70) {
  return { transitionDelay: `${i * step}ms` }
}

export function useScrolled(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])
  return scrolled
}

/** Which section is currently under the header. Drives the nav underline. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(null)
  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean)
    if (!sections.length) return
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5] }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [ids.join('|')])
  return active
}

export function useBodyLock(locked) {
  useEffect(() => {
    if (!locked) return
    const { overflow, paddingRight } = document.body.style
    const gap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    if (gap > 0) document.body.style.paddingRight = `${gap}px`
    return () => {
      document.body.style.overflow = overflow
      document.body.style.paddingRight = paddingRight
    }
  }, [locked])
}

/** Reads the OS motion preference on the first render so nothing flashes. */
export function useReducedMotion() {
  const [reduce, setReduce] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduce(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduce
}

/**
 * Slow vertical drift for a hero image. Transform only, so the layout box
 * never moves. Skipped on small screens and when reduced motion is requested.
 */
export function useParallax(ref, speed = 0.08) {
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)')
    const desktop = window.matchMedia('(min-width: 768px)')
    let raf = 0

    const paint = () => {
      const y = Math.min(window.scrollY, window.innerHeight) * speed
      el.style.transform = `translate3d(0, ${y.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (reduce.matches || !desktop.matches) {
        el.style.transform = ''
        return
      }
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(paint)
    }

    paint()
    window.addEventListener('scroll', onScroll, { passive: true })
    reduce.addEventListener('change', onScroll)
    desktop.addEventListener('change', onScroll)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', onScroll)
      reduce.removeEventListener('change', onScroll)
      desktop.removeEventListener('change', onScroll)
      el.style.transform = ''
    }
  }, [speed])
}

export function usePageMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title
    if (!description) return
    const el = document.querySelector('meta[name="description"]')
    if (el) el.setAttribute('content', description)
  }, [title, description])
}
