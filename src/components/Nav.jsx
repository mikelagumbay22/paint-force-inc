import { useEffect, useState } from 'react'
import { NAV_LINKS } from '../lib/data'
import { useActiveSection, useBodyLock, useScrolled } from '../lib/hooks'
import { Icon } from './Icon'

const SECTION_IDS = NAV_LINKS.map((l) => l.href.slice(1))

export function Nav({ onBook, onTrack }) {
  const [open, setOpen] = useState(false)
  const scrolled = useScrolled(20)
  const active = useActiveSection(SECTION_IDS)
  useBodyLock(open)

  useEffect(() => {
    const close = () => setOpen(false)
    window.addEventListener('resize', close)
    return () => window.removeEventListener('resize', close)
  }, [])

  const go = (e, href) => {
    e.preventDefault()
    setOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <>
      <a
        className="btn btn-primary sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[120] focus:px-4 focus:py-2"
        href="#main"
      >
        Skip to content
      </a>

      <nav
        className="fixed inset-x-0 top-0 z-[80] transition-all duration-300"
        style={{
          background: scrolled ? 'rgba(16,20,23,.88)' : 'transparent',
          backdropFilter: scrolled ? 'blur(14px)' : 'none',
          borderBottom: `1px solid ${
            scrolled ? 'color-mix(in srgb, var(--outline-variant) 22%, transparent)' : 'transparent'
          }`,
        }}
      >
        <div className="mx-auto flex max-w-container items-center justify-between px-gutter py-4">
          <a
            className="flex items-center gap-3"
            href="#top"
            onClick={(e) => {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <Wordmark />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((l) => {
              const isActive = active === l.href.slice(1)
              return (
                <a
                  key={l.href}
                  className="t-caps relative py-2 transition-colors"
                  href={l.href}
                  onClick={(e) => go(e, l.href)}
                  style={{ color: isActive ? 'var(--primary)' : 'var(--on-surface-variant)' }}
                >
                  {l.label}
                  <span
                    className="absolute -bottom-px left-0 h-px transition-all duration-300"
                    style={{
                      width: isActive ? '100%' : '0%',
                      background: 'var(--primary-container)',
                    }}
                  />
                </a>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button className="btn btn-ghost hidden px-4 py-3 sm:inline-flex" onClick={onTrack} type="button">
              <Icon name="search" size={14} />
              Track repair
            </button>
            <button className="btn btn-primary px-5 py-3" onClick={onBook} type="button">
              Book now
            </button>
            <button
              aria-expanded={open}
              aria-label="Menu"
              className="btn btn-ghost px-3 py-3 lg:hidden"
              onClick={() => setOpen((o) => !o)}
              type="button"
            >
              <Icon name={open ? 'close' : 'menu'} size={18} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile drawer */}
      <div
        className="fixed inset-0 z-[79] lg:hidden"
        style={{
          pointerEvents: open ? 'auto' : 'none',
          opacity: open ? 1 : 0,
          transition: 'opacity .25s ease',
        }}
      >
        <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
        <div
          className="s-low hairline-b absolute inset-x-0 top-0 px-gutter pb-6 pt-24"
          style={{
            transform: open ? 'none' : 'translateY(-12px)',
            transition: 'transform .3s cubic-bezier(.2,.7,.3,1)',
          }}
        >
          <div className="flex flex-col">
            {NAV_LINKS.map((l, i) => (
              <a
                key={l.href}
                className="t-h3 c-on hairline-b py-4 transition-colors"
                href={l.href}
                onClick={(e) => go(e, l.href)}
                style={{ transitionDelay: `${i * 20}ms` }}
              >
                {l.label}
              </a>
            ))}
            <button
              className="btn btn-ghost mt-5 w-full py-4"
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
    </>
  )
}

function Wordmark() {
  return (
    <span className="flex items-center gap-2.5">
      <img alt="" className="w-9 object-contain" draggable={false} src="/logo.png" />
      <span className="t-h3 c-on leading-none tracking-tight">
        Paint Force<span className="c-primary">.</span>
      </span>
    </span>
  )
}
