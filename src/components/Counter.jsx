import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../lib/hooks'

export function Counter({ value, label, note }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (reduce) {
      setN(value)
      return
    }
    const el = ref.current
    if (!el) return
    let raf = 0
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        io.disconnect()
        const start = performance.now()
        const tick = (now) => {
          const t = Math.min(1, (now - start) / 900)
          const eased = 1 - Math.pow(1 - t, 3)
          setN(Math.round(value * eased))
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.45 }
    )
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [reduce, value])

  return (
    <div ref={ref}>
      <span
        className="t-display c-on tabular inline-block"
        style={{ minWidth: `${String(value).length}ch` }}
      >
        {n}
      </span>
      <span className="t-h3 c-on mt-2 block">{label}</span>
      {note && <span className="t-caps c-variant mt-2 block text-[10px] opacity-60">{note}</span>}
    </div>
  )
}
