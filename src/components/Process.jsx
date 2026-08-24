import { PROCESS } from '../lib/data'
import { revealDelay, useReveal } from '../lib/hooks'
import { SectionHead } from './SectionHead'

export function Process({ onBook }) {
  const ref = useReveal()

  return (
    <section className="hairline-t hairline-b py-section" id="process">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          center
          eyebrow="How it works"
          lead="Three steps, one visit. Order matters here — nothing starts until the price is agreed."
          title="From photo to finished."
        />

        <ol ref={ref} className="reveal relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
          {/* Connector: a thin silver rule the markers sit on */}
          <span
            aria-hidden="true"
            className="absolute hidden md:block"
            style={{
              top: 22,
              left: '16.6%',
              right: '16.6%',
              height: 1,
              background:
                'linear-gradient(to right, transparent, color-mix(in srgb, var(--secondary) 30%, transparent) 12%, color-mix(in srgb, var(--secondary) 30%, transparent) 88%, transparent)',
            }}
          />

          {PROCESS.map((step, i) => (
            <li
              key={step.n}
              className="reveal relative flex flex-col md:items-center md:text-center"
              style={revealDelay(i, 110)}
            >
              <span
                className="s-container flex h-11 w-11 shrink-0 items-center justify-center rounded-full"
                style={{
                  border: '1px solid color-mix(in srgb, var(--secondary) 40%, transparent)',
                  color: 'var(--primary)',
                }}
              >
                <span className="t-mono text-[13px] font-bold tracking-wider">{step.n}</span>
              </span>

              <span className="t-caps mt-5 text-[10px]" style={{ color: 'color-mix(in srgb, var(--on-surface-variant) 60%, transparent)' }}>
                {step.meta}
              </span>
              <h3 className="t-h2 c-on mt-2">{step.title}</h3>
              <p className="t-body c-variant mt-3 max-w-xs md:mx-auto">{step.body}</p>
            </li>
          ))}
        </ol>

        <div className="mt-14 flex justify-center">
          <button className="btn btn-primary px-7 py-4" onClick={() => onBook()} type="button">
            Start with step one
          </button>
        </div>
      </div>
    </section>
  )
}
