import { useState } from 'react'
import { SERVICES } from '../lib/data'
import { revealDelay, useReveal } from '../lib/hooks'
import { Icon } from './Icon'
import { SectionHead } from './SectionHead'

export function Services({ onBook }) {
  const ref = useReveal()
  const [open, setOpen] = useState(null)

  return (
    <section className="s-low py-section" id="services">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          eyebrow="Services"
          lead="Three repairs cover most of what a daily-driven car picks up. Each one is priced up front and finished in a single visit."
          title="What we fix."
        />

        <div ref={ref} className="reveal mt-14 grid gap-4 md:grid-cols-3">
          {SERVICES.map((s, i) => {
            const isOpen = open === s.id
            return (
              <article
                key={s.id}
                className="reveal card card-interactive group relative flex flex-col overflow-hidden p-6"
                style={revealDelay(i)}
              >
                <span
                  className="absolute inset-x-0 top-0 h-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: 'linear-gradient(to right, var(--primary-container), transparent)' }}
                />

                <div className="flex items-start justify-between">
                  <span
                    className="s-container hairline flex h-11 w-11 items-center justify-center rounded"
                    style={{ color: 'var(--primary)' }}
                  >
                    <Icon name={s.icon} size={20} />
                  </span>
                  <span className="chip">{s.est}</span>
                </div>

                <h3 className="t-h2 c-on mt-6">{s.name}</h3>
                <p className="t-body c-variant mt-3 flex-1">{s.blurb}</p>

                <div
                  className="grid transition-all duration-300"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    opacity: isOpen ? 1 : 0,
                    marginTop: isOpen ? 20 : 0,
                  }}
                >
                  <ul className="overflow-hidden">
                    {s.detail.map((d) => (
                      <li key={d} className="t-body c-variant flex gap-3 py-1.5 text-[15px]">
                        <span className="c-primary mt-[5px] shrink-0">
                          <Icon name="check" size={13} strokeWidth={2.4} />
                        </span>
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hairline-t mt-6 flex items-center justify-between pt-5">
                  <span className="t-mono c-on text-[13px]">{s.price}</span>
                  <div className="flex items-center gap-1">
                    <button
                      aria-expanded={isOpen}
                      className="btn btn-quiet px-2 py-2"
                      onClick={() => setOpen(isOpen ? null : s.id)}
                      type="button"
                    >
                      {isOpen ? 'Less' : 'Details'}
                      <span
                        className="transition-transform duration-300"
                        style={{ transform: isOpen ? 'rotate(-90deg)' : 'rotate(90deg)' }}
                      >
                        <Icon name="chevronRight" size={13} />
                      </span>
                    </button>
                    <button
                      className="btn btn-ghost px-3 py-2"
                      onClick={() => onBook(s.id)}
                      type="button"
                    >
                      Book
                    </button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
