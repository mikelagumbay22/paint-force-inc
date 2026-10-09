/**
 * Public-folder paths under the Vite `base` (GitHub Pages project site).
 * `import.meta.env.BASE_URL` is `/` in local preview.html and `/paint-force-inc/`
 * in the Pages build.
 */
export function publicUrl(path) {
  if (!path || /^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const base = import.meta.env.BASE_URL || '/'
  return `${base}${String(path).replace(/^\//, '')}`
}

/** App route (`/gallery`) from a browser pathname that includes the base. */
export function appPath(pathname) {
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  let bare = String(pathname || '/').split('?')[0].split('#')[0]
  if (base && (bare === base || bare.startsWith(`${base}/`))) {
    bare = bare.slice(base.length) || '/'
  }
  if (!bare.startsWith('/')) bare = `/${bare}`
  if (bare.length > 1 && bare.endsWith('/')) bare = bare.slice(0, -1)
  return bare || '/'
}

/** Browser href for an app route, including the Pages subpath. */
export function appHref(to) {
  const next = appPath(to)
  const base = (import.meta.env.BASE_URL || '/').replace(/\/$/, '')
  if (next === '/') return base ? `${base}/` : '/'
  return `${base}${next}`
}
