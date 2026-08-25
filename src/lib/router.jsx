import { useEffect, useState } from 'react'

/**
 * Two pages, no dependency. pushState + a listener set is all `useRoute`
 * needs; reaching for react-router here would be the site's first dependency
 * added for a single fork in the road.
 */
const listeners = new Set()

export function navigate(to) {
  if (to !== window.location.pathname) {
    window.history.pushState({}, '', to)
    listeners.forEach((l) => l())
  }
  window.scrollTo(0, 0)
}

export function useRoute() {
  const [path, setPath] = useState(window.location.pathname)
  useEffect(() => {
    const onChange = () => setPath(window.location.pathname)
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
      href={to}
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
