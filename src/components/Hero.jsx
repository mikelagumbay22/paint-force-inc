import { HERO_IMAGE, PHONE, PHONE_HREF } from '../lib/data'
import { Icon, Stars } from './Icon'
import { SmartImage } from './SmartImage'

const RAIL = [
  { k: 'SERVICE AREA', v: 'MISSISSAUGA · OAKVILLE · ETOBICOKE' },
  { k: 'NEXT AVAILABLE', v: 'THU 08:00' },
  { k: 'COLOUR MATCH', v: 'VIN-CODED' },
  { k: 'WARRANTY', v: 'LIFETIME ON WORKMANSHIP' },
]

export function Hero({ onBook }) {
  return (
    <header className="relative flex min-h-[92vh] items-center overflow-hidden pt-24" id="top">
      <div className="absolute inset-0 z-0">
        <SmartImage
          alt="A technician machine-polishing a black panel under controlled lighting"
          className="h-full w-full object-cover"
          label={false}
          src={HERO_IMAGE}
          style={{ opacity: 0.42 }}
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
      </div>

      <div className="relative z-10 mx-auto w-full max-w-container px-gutter pb-44 pt-8 md:pb-36">
        <div className="max-w-3xl">
          <div className="fade" style={{ animationDelay: '80ms' }}>
            <span className="s-high hairline inline-flex items-center gap-2 rounded-full px-3.5 py-2">
              <span className="c-primary flex">
                <Stars size={12} />
              </span>
              <span className="t-caps c-variant text-[11px]">4.9 ON GOOGLE · 990+ REVIEWS</span>
            </span>
          </div>

          <h1 className="t-display c-on mt-6">
            <span className="fade block" style={{ animationDelay: '160ms' }}>
              Showroom finish,
            </span>
            <span className="fade block c-primary" style={{ animationDelay: '260ms' }}>
              in your driveway.
            </span>
          </h1>

          <p
            className="t-body-lg c-variant fade mt-6 max-w-xl"
            style={{ animationDelay: '360ms' }}
          >
            Paint and scratch repair that comes to you. A fully equipped mobile unit handles the work
            at your home or office — no body-shop queue, no week without your car.
          </p>

          <div className="fade mt-9 flex flex-wrap items-center gap-3" style={{ animationDelay: '440ms' }}>
            <button className="btn btn-primary px-7 py-4" onClick={onBook} type="button">
              Book a repair
              <Icon name="arrowRight" size={15} />
            </button>
            <a
              className="btn btn-ghost px-7 py-4"
              href="#work"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              See the work
            </a>
            <a className="btn btn-quiet px-3 py-4" href={PHONE_HREF}>
              <Icon name="phone" size={15} />
              {PHONE}
            </a>
          </div>
        </div>
      </div>

      {/* Signature: a technical readout strip, set in the mono utility face */}
      <div
        className="fade absolute inset-x-0 bottom-0 z-10 hairline-t"
        style={{ animationDelay: '600ms', background: 'rgba(11,15,18,.55)', backdropFilter: 'blur(8px)' }}
      >
        <dl className="mx-auto grid max-w-container grid-cols-2 px-gutter md:grid-cols-4">
          {RAIL.map((item, i) => (
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
              <dd className="t-mono c-on mt-2 text-[11px] leading-tight tracking-wide md:text-[12px]">
                {item.v}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <style>{`
        .fade { opacity: 0; animation: hero-fade .7s cubic-bezier(.2,.7,.3,1) both; }
        @keyframes hero-fade { from { opacity:0; transform: translateY(18px) } to { opacity:1; transform:none } }
        @media (prefers-reduced-motion: reduce) { .fade { animation: none; opacity: 1 } }
      `}</style>
    </header>
  )
}
