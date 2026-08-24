import { REVIEWS } from '../lib/data'
import { revealDelay, useReveal } from '../lib/hooks'
import { Stars } from './Icon'
import { SectionHead } from './SectionHead'

export function Reviews() {
  const ref = useReveal()

  return (
    <section className="s-low py-section" id="reviews">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead eyebrow="Reviews" title="What owners say." />

        <div ref={ref} className="reveal mt-12 grid gap-5 md:grid-cols-2">
          {REVIEWS.map((r, i) => (
            <figure
              key={r.author}
              className="reveal card flex flex-col p-7 md:p-8"
              style={{
                ...revealDelay(i, 110),
                borderLeft: '2px solid color-mix(in srgb, var(--primary-container) 70%, transparent)',
              }}
            >
              <span className="c-primary">
                <Stars size={15} />
              </span>
              <blockquote className="t-body-lg c-on mt-5 flex-1">“{r.quote}”</blockquote>
              <figcaption className="hairline-t mt-6 flex items-end justify-between gap-4 pt-5">
                <span>
                  <span className="t-h3 c-on block text-[16px]">{r.author}</span>
                  <span className="t-caps c-variant mt-1.5 block text-[10px] opacity-65">
                    {r.location}
                  </span>
                </span>
                <span className="t-mono c-variant text-right text-[10px] tracking-widest opacity-50">
                  {r.vehicle}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
