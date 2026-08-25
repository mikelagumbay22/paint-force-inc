import { useState } from 'react'
import { Footer } from '../components/Footer'
import { Icon, Spinner } from '../components/Icon'
import { SectionHead } from '../components/SectionHead'
import { SmartImage } from '../components/SmartImage'
import { useToast } from '../components/Toast'
import { formatPhone, submitFranchiseInquiry } from '../lib/api'
import {
  FRANCHISE_ADVANTAGES,
  FRANCHISE_FACTS,
  FRANCHISE_FLEET_IMAGE,
  FRANCHISE_HERO_IMAGE,
  FRANCHISE_SUPPORT,
  FRANCHISE_TRAINING_IMAGE,
  PHONE,
  PHONE_HREF,
  TERRITORIES,
  TERRITORY_OPTIONS,
} from '../lib/data'
import { revealDelay, useReveal, useScrolled } from '../lib/hooks'
import { Link, navigate } from '../lib/router'

const scrollTo = (e, href) => {
  e.preventDefault()
  document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function Franchise() {
  return (
    <>
      <FranchiseNav />
      <main id="main">
        <FranchiseHero />
        <Advantages />
        <Support />
        <TerritoryLedger />
        <Apply />
      </main>
      <Footer onTrack={() => navigate('/?track=1')} />
    </>
  )
}

/* --- Header ----------------------------------------------------------------
   A slimmer relative of the site nav: this audience is prospective operators,
   not repair customers, so "Book now" is replaced with "Request info". */

function FranchiseNav() {
  const scrolled = useScrolled(20)
  const [open, setOpen] = useState(false)

  return (
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
        <Link className="flex items-center gap-2.5" to="/">
          <img alt="" className="w-9 object-contain" draggable={false} src="/logo.png" />
          <span className="t-h3 c-on leading-none tracking-tight">
            Paint Force<span className="c-primary">.</span>
          </span>
        </Link>

        <div className="hidden items-center gap-7 lg:flex">
          <Link className="t-caps c-variant transition-colors hover:opacity-80" to="/">
            Home
          </Link>
          <a className="t-caps c-variant transition-colors hover:opacity-80" href="#advantage" onClick={(e) => scrollTo(e, '#advantage')}>
            Why franchise
          </a>
          <a className="t-caps c-variant transition-colors hover:opacity-80" href="#territories" onClick={(e) => scrollTo(e, '#territories')}>
            Territories
          </a>
        </div>

        <div className="flex items-center gap-2">
          <a className="btn btn-ghost hidden px-4 py-3 sm:inline-flex" href={PHONE_HREF}>
            <Icon name="phone" size={14} />
            {PHONE}
          </a>
          <a className="btn btn-primary px-5 py-3" href="#apply" onClick={(e) => scrollTo(e, '#apply')}>
            Request info
          </a>
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

      <div
        className="lg:hidden"
        style={{
          maxHeight: open ? 220 : 0,
          overflow: 'hidden',
          transition: 'max-height .3s cubic-bezier(.2,.7,.3,1)',
        }}
      >
        <div className="s-low hairline-t flex flex-col px-gutter py-2">
          <Link className="t-body c-on hairline-b py-3" onClick={() => setOpen(false)} to="/">
            Home
          </Link>
          <a
            className="t-body c-on hairline-b py-3"
            href="#advantage"
            onClick={(e) => {
              scrollTo(e, '#advantage')
              setOpen(false)
            }}
          >
            Why franchise
          </a>
          <a
            className="t-body c-on py-3"
            href="#territories"
            onClick={(e) => {
              scrollTo(e, '#territories')
              setOpen(false)
            }}
          >
            Territories
          </a>
        </div>
      </div>
    </nav>
  )
}

/* --- Hero -------------------------------------------------------------- */

function FranchiseHero() {
  return (
    <header className="relative flex min-h-[86vh] items-center overflow-hidden pt-24" id="top">
      <div className="absolute inset-0 z-0">
        <SmartImage
          alt="An operator reviewing the Paint Force franchise prospectus"
          className="h-full w-full object-cover"
          label={false}
          src={FRANCHISE_HERO_IMAGE}
          style={{ opacity: 0.38 }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, var(--background) 6%, rgba(16,20,23,.86) 45%, rgba(16,20,23,.35) 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to right, var(--background) 0%, rgba(16,20,23,.55) 48%, transparent 78%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 70% at 50% -10%, color-mix(in srgb, var(--primary-container) 12%, transparent), transparent 60%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-gutter pb-28 pt-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3">
            <span className="h-px w-6" style={{ background: 'var(--primary-container)' }} />
            <span className="t-caps c-primary">Franchise opportunity</span>
          </div>

          <h1 className="t-display c-on mt-6">
            The body shop,
            <br />
            <span className="c-primary">minus the shop.</span>
          </h1>

          <p className="t-body-lg c-variant mt-6 max-w-xl">
            Paint Force turns a four-day body-shop wait into a two-hour driveway visit — VIN-coded
            colour, fixed pricing, a live repair tracker. We're licensing that exact playbook,
            territory by territory, to operators who want to run it.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a className="btn btn-primary px-7 py-4" href="#apply" onClick={(e) => scrollTo(e, '#apply')}>
              Request the info pack
              <Icon name="arrowRight" size={15} />
            </a>
            <a className="btn btn-ghost px-7 py-4" href="#territories" onClick={(e) => scrollTo(e, '#territories')}>
              Check your territory
            </a>
          </div>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 z-10 hairline-t"
        style={{ background: 'rgba(11,15,18,.55)', backdropFilter: 'blur(8px)' }}
      >
        <dl className="mx-auto grid max-w-container grid-cols-2 px-gutter md:grid-cols-4">
          {FRANCHISE_FACTS.map((item, i) => (
            <div
              key={item.k}
              className="py-4 md:py-5"
              style={{
                borderLeft: i === 0 ? 'none' : '1px solid color-mix(in srgb, var(--outline-variant) 22%, transparent)',
                paddingLeft: i === 0 ? 0 : '20px',
              }}
            >
              <dt className="t-caps text-[10px]" style={{ color: 'color-mix(in srgb, var(--on-surface-variant) 55%, transparent)' }}>
                {item.k}
              </dt>
              <dd className="t-mono c-on mt-2 text-[11px] leading-tight tracking-wide md:text-[12px]">{item.v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  )
}

/* --- Advantage bento --------------------------------------------------- */

function Advantages() {
  const ref = useReveal()
  return (
    <section className="s-low py-section" id="advantage">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          eyebrow="Why franchise"
          lead="Three things an operator gets on day one that would otherwise take years to build alone."
          title="Buy the playbook, not a guess."
        />

        <div ref={ref} className="reveal mt-14 grid gap-4 md:grid-cols-3">
          <div className="reveal card group relative min-h-[380px] overflow-hidden md:col-span-2 md:row-span-2">
            <SmartImage
              alt="A fleet of navy-blue Paint Force mobile repair vans parked at a service center"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              label={false}
              src={FRANCHISE_FLEET_IMAGE}
            />
            <div
              className="absolute inset-0"
              style={{ background: 'linear-gradient(to top, var(--background) 10%, rgba(16,20,23,.55) 48%, transparent 88%)' }}
            />
            <div className="absolute inset-x-0 bottom-0 p-7">
              <span className="chip mb-4 inline-block" style={{ color: 'var(--primary)' }}>
                Scalability
              </span>
              <h3 className="t-h2 c-on">{FRANCHISE_ADVANTAGES[0].title}</h3>
              <p className="t-body c-variant mt-2 max-w-md">{FRANCHISE_ADVANTAGES[0].body}</p>
            </div>
          </div>

          {FRANCHISE_ADVANTAGES.slice(1).map((a, i) => (
            <article key={a.title} className="reveal card card-interactive group relative flex flex-col p-6" style={revealDelay(i)}>
              <span
                className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{ background: 'linear-gradient(to right, var(--primary-container), transparent)' }}
              />
              <span className="s-container hairline flex h-11 w-11 items-center justify-center rounded" style={{ color: 'var(--primary)' }}>
                <Icon name={a.icon} size={20} />
              </span>
              <h3 className="t-h2 c-on mt-6">{a.title}</h3>
              <p className="t-body c-variant mt-3">{a.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}



function Support() {
  const ref = useReveal()
  return (
    <section className="py-section" id="support">
      <div className="mx-auto max-w-container px-gutter">
        <div ref={ref} className="reveal grid gap-14 md:grid-cols-2 md:items-center">
          <div className="relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-2xl blur-2xl"
              style={{ background: 'linear-gradient(to top right, color-mix(in srgb, var(--primary-container) 10%, transparent), transparent)' }}
            />
            <SmartImage
              alt="Paint Force franchise trainers and operators reviewing the dispatch system"
              className="relative hairline aspect-[4/3] w-full rounded-xl object-cover shadow-2xl"
              label={false}
              src={FRANCHISE_TRAINING_IMAGE}
            />
            <div className="s-highest hairline absolute -bottom-6 -right-6 hidden rounded-lg p-6 shadow-xl md:block">
              <div className="t-caps c-primary mb-1">Certification</div>
              <div className="t-h2 c-on">4-Week Program</div>
            </div>
          </div>

          <div>
            <SectionHead eyebrow="Support" title="Run on our system, from day one." />
            <p className="t-body c-variant mt-5 max-w-md">
              Booking, dispatch, VIN colour lookup and the live repair tracker your future
              customers already use on paintforce.ca — it ships with the territory.
            </p>

            <div className="mt-8 flex flex-col">
              {FRANCHISE_SUPPORT.map((s, i) => (
                <div key={s.title} className="reveal hairline-b flex items-start gap-4 py-6 first:pt-0" style={revealDelay(i)}>
                  <div className="s-container mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded" style={{ color: 'var(--primary)' }}>
                    <Icon name={s.icon} size={18} />
                  </div>
                  <div>
                    <h4 className="t-h3 c-on">{s.title}</h4>
                    <p className="t-body c-variant mt-2">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



function TerritoryLedger() {
  const ref = useReveal()
  const dot = { active: 'var(--primary)', opening: 'var(--secondary)', available: 'var(--outline)' }
  const label = { active: 'ACTIVE', opening: 'OPENING', available: 'AVAILABLE' }

  return (
    <section className="s-container py-section" id="territories">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          eyebrow="Footprint"
          lead="Every territory below is exclusive to one operator. Not listed doesn't mean unavailable — it means unmapped."
          title="Where the fleet runs."
        />

        <div ref={ref} className="reveal hairline mt-12 overflow-hidden rounded">
          <div className="s-lowest hairline-b t-caps c-variant grid grid-cols-[1fr_auto] gap-6 px-6 py-3 opacity-60 sm:grid-cols-[2fr_auto_3fr]">
            <span>Territory</span>
            <span>Status</span>
            <span className="hidden sm:block">Note</span>
          </div>
          {TERRITORIES.map((t, i) => (
            <div
              key={t.name}
              className="hairline-b grid grid-cols-[1fr_auto] items-center gap-6 px-6 py-4 last:border-b-0 sm:grid-cols-[2fr_auto_3fr]"
              style={{ background: i % 2 ? 'transparent' : 'color-mix(in srgb, var(--surface-container-lowest) 45%, transparent)' }}
            >
              <span className="t-mono c-on text-[13px] sm:text-[14px]">{t.name}</span>
              <span className="t-caps flex items-center gap-2 text-[10px]" style={{ color: dot[t.status] }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: dot[t.status] }} />
                {label[t.status]}
              </span>
              <span className="t-body c-variant col-span-2 text-[13px] opacity-80 sm:col-span-1">{t.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* --- Apply / inquiry form ------------------------------------------------ */

const EMPTY = { name: '', email: '', phone: '', territory: '', readiness: '', message: '' }

function Apply() {
  const ref = useReveal()
  const toast = useToast()
  const [values, setValues] = useState(EMPTY)
  const [error, setError] = useState(null)
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)

  const set = (key) => (e) => {
    const raw = e.target.value
    setValues((v) => ({ ...v, [key]: key === 'phone' ? formatPhone(raw) : raw }))
    if (error?.field === key) setError(null)
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await submitFranchiseInquiry(values)
      setDone(res.reference)
      toast(`Inquiry sent. Reference ${res.reference}.`)
    } catch (err) {
      setError({ message: err.message, field: err.field })
      toast(err.message, 'error')
      if (err.field) document.getElementById(`f-${err.field}`)?.focus()
    } finally {
      setBusy(false)
    }
  }

  return (
    <section className="s-lowest py-section" id="apply">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          eyebrow="Apply"
          lead="Tell us the territory you want and where you're at. A franchise lead — not a technician — replies directly."
          title="Tell us where."
        />

        <div ref={ref} className="reveal mt-12 max-w-2xl">
          {done ? (
            <div className="card flex flex-col items-center px-6 py-16 text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'color-mix(in srgb, var(--primary-container) 18%, transparent)', color: 'var(--primary)' }}
              >
                <Icon name="check" size={26} strokeWidth={2.2} />
              </span>
              <h3 className="t-h2 c-on mt-6">Inquiry sent.</h3>
              <p className="t-body c-variant mt-3 max-w-md">
                A member of the franchise team will reach out within two business days with the
                info pack and territory availability.
              </p>
              <p className="t-mono c-primary mt-6 text-[24px] tracking-[0.15em]">{done}</p>
            </div>
          ) : (
            <form className="flex flex-col gap-5" noValidate onSubmit={onSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field error={error} id="f-name" label="Full name">
                  <input className="field" id="f-name" aria-invalid={error?.field === 'name'} onChange={set('name')} placeholder="Jordan Mills" value={values.name} />
                </Field>
                <Field error={error} id="f-email" label="Email">
                  <input className="field" id="f-email" aria-invalid={error?.field === 'email'} onChange={set('email')} placeholder="jordan@example.com" type="email" value={values.email} />
                </Field>
                <Field error={error} id="f-phone" label="Phone">
                  <input className="field" id="f-phone" aria-invalid={error?.field === 'phone'} inputMode="tel" onChange={set('phone')} placeholder="(416) 000-0000" value={values.phone} />
                </Field>
                <Field error={error} id="f-territory" label="Territory of interest">
                  <select className="field" id="f-territory" aria-invalid={error?.field === 'territory'} onChange={set('territory')} value={values.territory}>
                    <option value="">Choose a territory</option>
                    {TERRITORY_OPTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </Field>
              </div>

              <Field error={error} id="f-readiness" label="Timeline">
                <select className="field" id="f-readiness" aria-invalid={error?.field === 'readiness'} onChange={set('readiness')} value={values.readiness}>
                  <option value="">Where are you at?</option>
                  <option value="exploring">Just exploring</option>
                  <option value="6-months">Ready within 6 months</option>
                  <option value="now">Ready now</option>
                </select>
              </Field>

              <Field error={error} id="f-message" label="Anything we should know">
                <textarea className="field min-h-[110px] resize-y" id="f-message" onChange={set('message')} placeholder="Background, capital you're working with, timeline — whatever's relevant." value={values.message} />
              </Field>

              {error && !error.field && (
                <p className="t-body text-[14px]" role="alert" style={{ color: 'var(--error)' }}>
                  {error.message}
                </p>
              )}

              <button className="btn btn-primary w-full py-4 sm:w-auto sm:px-9" disabled={busy} type="submit">
                {busy ? <Spinner /> : <Icon name="send" size={15} />}
                {busy ? 'Sending' : 'Send inquiry'}
              </button>
              <p className="t-caps c-variant text-[9px] opacity-45">No obligation · Financials detailed in our Franchise Disclosure Document</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  const invalid = error?.field === id.replace('f-', '')
  return (
    <div className="flex flex-col gap-2">
      <label className="t-caps c-variant" htmlFor={id}>
        {label}
      </label>
      {children}
      {invalid && (
        <span className="text-[13px]" role="alert" style={{ color: 'var(--error)' }}>
          {error.message}
        </span>
      )}
    </div>
  )
}
