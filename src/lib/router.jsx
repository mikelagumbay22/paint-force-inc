import { useEffect, useState } from 'react'
import { appHref, appPath } from './asset'

/**
 * pushState plus a listener set. Routes stay root-shaped (`/gallery`);
 * the browser path includes the Vite base so GitHub Pages project sites work.
 */
const listeners = new Set()

export function normalizePath(path) {
  return appPath(path)
}

export { appHref }

export function navigate(to) {
  const next = appPath(to)
  if (next !== appPath(window.location.pathname)) {
    window.history.pushState({}, '', appHref(next))
    listeners.forEach((l) => l())
  }
  window.scrollTo(0, 0)
}

export function useRoute() {
  const [path, setPath] = useState(() => appPath(window.location.pathname))
  useEffect(() => {
    const onChange = () => setPath(appPath(window.location.pathname))
    listeners.add(onChange)
    window.addEventListener('popstate', onChange)
    return () => {
      listeners.delete(onChange)
      window.removeEventListener('popstate', onChange)
    }
  }, [])
  return path
}

export function Link({ to, onClick, children, ...rest }) {
  return (
    <a
      href={appHref(to)}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
        e.preventDefault()
        navigate(to)
      }}
      {...rest}
    >
      {children}
    </a>
  )
}
