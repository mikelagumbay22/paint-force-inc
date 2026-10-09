import { site } from '../site.config'
import { usePageMeta, useReveal, revealDelay } from '../lib/hooks'
import { Link } from '../lib/router'
import { BeforeAfter } from '../components/BeforeAfter'
import { Counter } from '../components/Counter'
import { HeroScrub } from '../components/HeroScrub'
import { Icon } from '../components/Icon'
import { PaintRoom } from '../components/PaintRoom'
import { Tilt } from '../components/Tilt'
import { Placeholder } from '../components/Badges'

const RAIL = [
  { k: 'Based in', v: `${site.business.city}, ${site.business.region}` },
  { k: 'Phone', v: site.business.phone },
  { k: 'Colour match', v: 'VIN-coded' },
  { k: 'Prices', v: 'Placeholder', placeholder: true },
]

export default function Home({ onBook }) {
  usePageMeta(site.seo.home.title, site.seo.home.description)
  const servicesRef = useReveal()
  const workRef = useReveal()
  const featured = site.portfolio[0]

  return (
    <>
      <header className="relative md:flex md:min-h-[calc(100svh-var(--header-h))] md:flex-col md:justify-end md:overflow-hidden">
        <div className="relative h-[42vh] min-h-[220px] overflow-hidden md:absolute md:inset-0 md:h-auto md:min-h-0">
          <HeroScrub />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to top, var(--background) 4%, rgba(16,20,23,.45) 42%, rgba(16,20,23,.12) 100%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'linear-gradient(to right, var(--background) 0%, rgba(16,20,23,.28) 36%, transparent 68%)',
            }}
          />
          <p className="chip badge-illustrative chip-wrap pointer-events-none absolute right-3 top-3 z-20 max-w-[15rem] sm:right-6 sm:top-5 sm:max-w-[20rem]">
            Illustrative video, not footage of Paint Force&apos;s work
          </p>
        </div>

        <div className="relative z-10 mx-auto w-full max-w-container px-gutter py-8 md:shrink-0 md:pb-40 md:pt-16">
          <div className="max-w-3xl">
            <p className="rise s-high hairline inline-flex items-center gap-2 rounded-full px-3.5 py-2" style={{ animationDelay: '40ms' }}>
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--primary-container)' }} />
              <span className="t-caps c-variant text-[11px]">
                Mobile repair · {site.business.city}
              </span>
            </p>
            <h1 className="t-display c-on mt-6">
              <span className="rise block" style={{ animationDelay: '120ms' }}>
                Showroom finish,
              </span>
              <span className="rise c-primary block" style={{ animationDelay: '200ms' }}>
                in your driveway.
              </span>
            </h1>
            <p className="t-body-lg c-variant rise mt-6 max-w-xl" style={{ animationDelay: '300ms' }}>
              Paint and scratch repair that comes to you in {site.business.city}. A mobile unit handles
              scratch removal, paint touch-up, and bumper repair at your home or office.
            </p>
            <div className="rise mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '380ms' }}>
              <button className="btn btn-primary px-7 py-4" onClick={() => onBook()} type="button">
                Book a repair
                <Icon className="nudge" name="arrowRight" size={15} />
              </button>
              <Link className="btn btn-ghost px-7 py-4" to="/gallery">
                See the work
              </Link>
              <a className="btn btn-quiet px-3 py-4" href={site.business.phoneHref}>
                <Icon name="phone" size={15} />
                {site.business.phone}
              </a>
            </div>
          </div>
        </div>

        <div
          className="rise relative z-10 w-full hairline-t md:absolute md:inset-x-0 md:bottom-0 md:shrink-0"
          style={{ animationDelay: '480ms', background: 'rgba(11,15,18,.72)', backdropFilter: 'blur(8px)' }}
        >
          <dl className="mx-auto grid max-w-container grid-cols-2 gap-px md:grid-cols-4" style={{ background: 'color-mix(in srgb, var(--outline-variant) 28%, transparent)' }}>
            {RAIL.map((item) => (
              <div className="px-gutter py-4 md:py-5" key={item.k} style={{ background: 'rgba(11,15,18,.92)' }}>
                <dt className="t-caps text-[10px]" style={{ color: 'color-mix(in srgb, var(--on-surface-variant) 70%, transparent)' }}>
                  {item.k}
                </dt>
                <dd className="t-mono c-on mt-2 flex flex-wrap items-center gap-2 text-[12px] leading-tight tracking-wide">
                  {item.v}
                  {item.placeholder && <Placeholder>Placeholder</Placeholder>}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </header>

      <PaintRoom />

      <section className="s-low py-section">
        <div className="mx-auto grid max-w-container gap-10 px-gutter sm:grid-cols-3">
          {site.counters.map((item) => (
            <Counter key={item.label} label={item.label} note={item.note} value={item.value} />
          ))}
        </div>
      </section>

      <section className="py-section">
        <div className="mx-auto max-w-container px-gutter">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-xl">
              <p className="t-caps c-primary">Services</p>
              <h2 className="t-h1 c-on mt-3">What we fix in {site.business.city}.</h2>
            </div>
            <Link className="btn btn-ghost px-5 py-3" to="/services">
              Full price list
              <Icon className="nudge" name="arrowRight" size={14} />
            </Link>
          </div>
          <div className="reveal mt-10 grid gap-4 md:grid-cols-3" ref={servicesRef}>
            {site.services.map((service, i) => (
              <article className="reveal h-full" key={service.id} style={revealDelay(i)}>
                <Tilt className="h-full">
                  <div className="card card-interactive flex h-full flex-col p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="s-container hairline flex h-11 w-11 items-center justify-center rounded" style={{ color: 'var(--primary)' }}>
                        <Icon name={service.icon} size={20} />
                      </span>
                      <span className="chip">{service.est}</span>
                    </div>
                    <h3 className="t-h2 c-on mt-6">{service.name}</h3>
                    <p className="t-body c-variant mt-3 flex-1">{service.blurb}</p>
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
                      <span className="t-mono c-on text-[13px]">{service.price}</span>
                      {service.pricePlaceholder && <Placeholder>Placeholder price</Placeholder>}
                    </div>
                  </div>
                </Tilt>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="s-lowest py-section">
        <div className="mx-auto grid max-w-container items-center gap-10 px-gutter lg:grid-cols-2">
          <div className="reveal" ref={workRef}>
            <p className="t-caps c-primary">Gallery</p>
            <h2 className="t-h1 c-on mt-3">Drag across a repair.</h2>
            <p className="t-body-lg c-variant mt-4">
              Before-and-after panels show the kind of scratch, paint, and bumper work Paint Force
              describes. These photos are illustrative stand-ins, not confirmed jobs from the shop.
            </p>
            <Link className="btn btn-primary mt-8 px-6 py-4" to="/gallery">
              Open the gallery
              <Icon className="nudge" name="arrowRight" size={15} />
            </Link>
          </div>
          {featured && (
            <BeforeAfter alt={featured.vehicle} className="aspect-[4/3] w-full rounded" src={featured.src} />
          )}
        </div>
      </section>

      <section className="s-container relative overflow-hidden py-section">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 80% at 80% 0%, color-mix(in srgb, var(--primary-container) 16%, transparent), transparent 60%)',
          }}
        />
        <div className="relative mx-auto flex max-w-container flex-col items-start justify-between gap-8 px-gutter md:flex-row md:items-center">
          <div className="max-w-xl">
            <h2 className="t-h1 c-on">Ask for a price.</h2>
            <p className="t-body-lg c-variant mt-4">{site.business.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link className="btn btn-primary px-7 py-4" to="/contact">
              Request a quote
              <Icon className="nudge" name="arrowRight" size={15} />
            </Link>
            <button className="btn btn-ghost px-7 py-4" onClick={() => onBook()} type="button">
              Book a window
            </button>
          </div>
        </div>
      </section>
    </>
  )
}
