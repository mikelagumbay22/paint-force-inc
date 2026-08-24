import { useEffect, useRef } from 'react'
import { useBodyLock } from '../lib/hooks'
import { Icon } from './Icon'

const FOCUSABLE =
  'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex]:not([tabindex="-1"])'

export function Modal({ open, onClose, label, children, width = 'max-w-3xl' }) {
  const panel = useRef(null)
  const restore = useRef(null)
  useBodyLock(open)

  useEffect(() => {
    if (!open) return
    restore.current = document.activeElement

    const first = panel.current?.querySelector(FOCUSABLE)
    // Delay a frame so the entry animation doesn't fight the scroll-into-view.
    const t = setTimeout(() => (first || panel.current)?.focus(), 40)

    const onKey = (e) => {
      if (e.key === 'Escape') return onClose()
      if (e.key !== 'Tab') return
      const nodes = [...(panel.current?.querySelectorAll(FOCUSABLE) || [])]
      if (!nodes.length) return
      const [start, end] = [nodes[0], nodes[nodes.length - 1]]
      if (e.shiftKey && document.activeElement === start) {
        e.preventDefault()
        end.focus()
      } else if (!e.shiftKey && document.activeElement === end) {
        e.preventDefault()
        start.focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      restore.current?.focus?.()
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        style={{ animation: 'fade .2s ease both' }}
      />
      <div
        ref={panel}
        aria-label={label}
        aria-modal="true"
        className={`s-low hairline relative flex max-h-[92vh] w-full ${width} flex-col overflow-hidden rounded-t-lg sm:rounded-lg`}
        role="dialog"
        style={{
          animation: 'panel-in .32s cubic-bezier(.2,.7,.3,1) both',
          boxShadow: '0 40px 80px -30px #000',
        }}
        tabIndex={-1}
      >
        <button
          aria-label="Close"
          className="c-variant absolute right-3 top-3 z-10 rounded p-2 transition-colors hover:bg-white/5 hover:text-white"
          onClick={onClose}
          type="button"
        >
          <Icon name="close" size={18} />
        </button>
        {children}
      </div>
      <style>{`
        @keyframes fade{from{opacity:0}to{opacity:1}}
        @keyframes panel-in{from{opacity:0;transform:translateY(24px) scale(.99)}to{opacity:1;transform:none}}
        @media (prefers-reduced-motion: reduce){
          [role=dialog]{animation:none !important}
        }
      `}</style>
    </div>
  )
}
