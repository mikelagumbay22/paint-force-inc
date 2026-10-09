import { useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

/** Pointer tilt for fine pointers. The transform stays on this wrapper so it
 *  never fights a scroll-reveal transform on the parent, and it does not
 *  change the layout box. */
export function Tilt({ children, className = '' }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const onMove = (e) => {
    if (reduce || window.matchMedia('(pointer: coarse)').matches) return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${(-y * 5).toFixed(2)}deg) rotateY(${(x * 6).toFixed(2)}deg)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <div className={className} onPointerLeave={reset} onPointerMove={onMove} ref={ref} style={{ transition: reduce ? 'none' : 'transform .16s ease-out' }}>
      {children}
    </div>
  )
}
