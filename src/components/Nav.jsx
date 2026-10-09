import { useEffect, useState } from 'react'
import { site } from '../site.config'
import { publicUrl } from '../lib/asset'
import { useBodyLock, useScrolled } from '../lib/hooks'
import { Link, useRoute } from '../lib/router'
import { Icon } from './Icon'

export function Nav({ onBook, onTrack }) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(8)
  const path = useRoute()
  useBodyLock(open)

  useEffect(() => {
    setOpen(false)
  }, [path])

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  return (
    <>
      <a
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:z-[120] focus:px-4 focus:py-2"
        href="#main"
        style={{ top: 'calc(var(--header-h) + 12px)' }}
      >
        Skip to content
      </a>

      <nav
        className="site-nav transition-colors duration-300"
          style={{
          background: scrolled || open
            ? 'color-mix(in srgb, var(--background) 90%, transparent)'
            : 'color-mix(in srgb, var(--background) 62%, transparent)',
          backdropFilter: 'blur(14px)',
          borderBottom: '1px solid color-mix(in srgb, var(--outline-variant) 22%, transparent)',
        }}
      >
        <div className="mx-auto flex h-full max-w-container items-center justify-between gap-4 px-gutter">
          <Link aria-label={site.business.name} className="flex min-w-0 items-center gap-2.5" to="/">
            <img
              alt=""
              className="h-9 w-9 shrink-0 object-contain"
              draggable={false}
              src={publicUrl(site.business.logo)}
            />
            <span className="t-h3 c-on truncate leading-none tracking-tight">
              {site.business.name}
              <span className="c-primary">.</span>
            </span>
          </Link>

          <div className="hidden items-center gap-5 xl:flex">
            {site.pages.map((page) => {
              const current = path === page.path
              return (
                <Link
                  aria-current={current ? 'page' : undefined}
                  className="nav-link t-caps py-2"
                  key={page.path}
                  style={{ color: current ? 'var(--primary)' : 'var(--on-surface-variant)' }}
                  to={page.path}
                >
                  {page.label}
                </Link>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-ghost hidden px-4 py-3 lg:inline-flex" onClick={onTrack} type="button">
              <Icon name="search" size={14} />
              Track repair
            </button>
            <button className="btn btn-primary px-3.5 py-3 sm:px-5" onClick={onBook} type="button">
              <span className="sm:hidden">Book</span>
              <span className="hidden sm:inline">Book now</span>
              <Icon className="nudge" name="arrowRight" size={14} />
            </button>
            <button
              aria-expanded={open}
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="btn btn-ghost px-3 py-3 xl:hidden"
              onClick={() => setOpen((value) => !value)}
              type="button"
            >
              <Icon name={open ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </div>
      </nav>

      {open && (
      <div
        className="menu-open fixed inset-x-0 bottom-0 z-[79] xl:hidden"
        style={{ top: 'var(--header-h)' }}
      >
        <div className="absolute inset-0 bg-black/55" onClick={() => setOpen(false)} />
        <div className="menu-panel s-low hairline-b absolute inset-x-0 top-0 max-h-full overflow-y-auto px-gutter pb-6 pt-2">
          <div className="flex flex-col">
            {site.pages.map((page, i) => (
              <Link
                aria-current={path === page.path ? 'page' : undefined}
                className="menu-item t-h3 hairline-b py-3.5"
                key={page.path}
                style={{
                  color: path === page.path ? 'var(--primary)' : 'var(--on-surface)',
                  transitionDelay: open ? `${i * 35}ms` : '0ms',
                }}
                to={page.path}
              >
                {page.label}
              </Link>
            ))}
            <button
              className="btn btn-ghost mt-4 w-full py-4"
              onClick={() => {
                setOpen(false)
                onTrack()
              }}
              type="button"
            >
              <Icon name="search" size={14} />
              Track a repair
            </button>
          </div>
        </div>
      </div>
      )}
    </>
  )
}
