import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { Icon } from './Icon'

const ToastContext = createContext(() => {})
export const useToast = () => useContext(ToastContext)

let id = 0

export function ToastProvider({ children }) {
  const [items, setItems] = useState([])

  const dismiss = useCallback((key) => setItems((t) => t.filter((i) => i.key !== key)), [])

  const push = useCallback(
    (message, tone = 'info') => {
      const key = ++id
      setItems((t) => [...t, { key, message, tone }])
      setTimeout(() => dismiss(key), 5200)
    },
    [dismiss]
  )

  const value = useMemo(() => push, [push])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 left-1/2 z-[100] flex w-[calc(100%-32px)] max-w-sm -translate-x-1/2 flex-col gap-2 sm:left-auto sm:right-6 sm:translate-x-0"
      >
        {items.map((t) => (
          <div
            key={t.key}
            className="s-high hairline flex items-start gap-3 rounded px-4 py-3 shadow-[0_18px_40px_-20px_#000]"
            style={{
              animation: 'toast-in .28s cubic-bezier(.2,.7,.3,1) both',
              borderLeft: `2px solid ${
                t.tone === 'error' ? 'var(--error)' : 'var(--primary-container)'
              }`,
            }}
          >
            <span
              className="mt-[2px] shrink-0"
              style={{ color: t.tone === 'error' ? 'var(--error)' : 'var(--primary)' }}
            >
              <Icon name={t.tone === 'error' ? 'close' : 'check'} size={16} strokeWidth={2.2} />
            </span>
            <p className="c-on flex-1 text-[14px] leading-snug">{t.message}</p>
            <button
              aria-label="Dismiss"
              className="c-variant shrink-0 opacity-60 transition-opacity hover:opacity-100"
              onClick={() => dismiss(t.key)}
              type="button"
            >
              <Icon name="close" size={15} />
            </button>
          </div>
        ))}
      </div>
      <style>{`@keyframes toast-in{from{opacity:0;transform:translateY(14px) scale(.98)}to{opacity:1;transform:none}}`}</style>
    </ToastContext.Provider>
  )
}
