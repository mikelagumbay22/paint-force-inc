import { PHONE, PHONE_HREF } from '../lib/data'
import { useReveal } from '../lib/hooks'
import { Icon } from './Icon'

export function CTA({ onBook }) {
  const ref = useReveal()

  return (
    <section className="s-container relative overflow-hidden py-section">
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(120% 80% at 50% 0%, color-mix(in srgb, var(--primary-container) 12%, transparent), transparent 60%)',
        }}
      />
      <div ref={ref} className="reveal relative mx-auto flex max-w-3xl flex-col items-center px-gutter text-center">
        <span className="t-caps c-primary">Next slot Thursday 08:00</span>
        <h2 className="t-h1 c-on mt-5">Book the visit.</h2>
        <p className="t-body-lg c-variant mt-4 max-w-xl">
          Pick a two-hour window and a technician comes to you. Most jobs are quoted the same day.
        </p>
        <div className="mt-9 flex flex-col items-center gap-5 sm:flex-row">
          <button className="btn btn-primary px-9 py-4" onClick={() => onBook()} type="button" disabled>
            Choose a time
            <Icon name="arrowRight" size={15} />
          </button>
          <span className="t-caps c-variant opacity-50">or</span>
          <a className="t-h2 c-primary flex items-center gap-2.5 transition-colors hover:opacity-80" href={PHONE_HREF}>
            <Icon name="phone" size={19} />
            {PHONE}
          </a>
        </div>
      </div>
    </section>
  )
}
