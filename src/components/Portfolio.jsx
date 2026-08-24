import { PORTFOLIO } from '../lib/data'
import { revealDelay, useReveal } from '../lib/hooks'
import { BeforeAfter } from './BeforeAfter'
import { Icon, Stars } from './Icon'
import { SectionHead } from './SectionHead'

export function Portfolio() {
  const ref = useReveal()

  return (
    <section className="s-lowest py-section" id="work">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          eyebrow="Recent work"
          lead="See the panel before and after. Every one of these was finished on a driveway, not in a shop."
          title="Real cars. Real panels."
        />

        <div ref={ref} className="reveal mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {PORTFOLIO.map((item, i) => (
            <article
              key={item.id}
              className="reveal card card-interactive flex flex-col overflow-hidden"
              style={revealDelay(i, 90)}
            >
              <BeforeAfter
                alt={item.vehicle}
                className="aspect-[4/3] w-full"
                composite={item.composite}
                src={item.src}
              />

              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="t-caps c-primary text-[10px]">{item.tag}</span>
                  <span className="t-mono c-variant flex items-center gap-1.5 text-[11px] opacity-70">
                    <Icon name="clock" size={12} />
                    {item.duration}
                  </span>
                </div>

                <p className="t-h3 c-on mt-2 text-[16px]">{item.vehicle}</p>

                <p className="t-body c-variant mt-4 flex-1 text-[15px] italic">“{item.quote}”</p>

                <div className="hairline-t mt-5 flex items-center gap-3 pt-4">
                  <span
                    className="s-highest flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-semibold"
                    style={{ color: 'var(--on-surface-variant)' }}
                  >
                    {item.initials}
                  </span>
                  <span className="flex-1">
                    <span className="c-on block text-[14px] font-medium">{item.author}</span>
                    <span className="t-caps c-variant block text-[9px] opacity-60">Verified customer</span>
                  </span>
                  <span className="c-primary">
                    <Stars size={12} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
