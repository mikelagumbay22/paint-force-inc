import { site } from '../site.config'
import { revealDelay, usePageMeta, useReveal } from '../lib/hooks'
import { Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'
import { Placeholder } from '../components/Badges'
import { Tilt } from '../components/Tilt'

export default function ServicesPage({ onBook }) {
  usePageMeta(site.seo.services.title, site.seo.services.description)
  const ref = useReveal()

  return (
    <>
      <PageHero
        eyebrow={`Price list · ${site.business.city}`}
        lead="Three repairs cover most of what a daily-driven car picks up. Each one is described as a single visit. The dollar amounts are placeholders from the previous draft."
        title="Services and starting prices."
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-gutter">
          <div className="reveal grid gap-4 lg:grid-cols-3" ref={ref}>
            {site.services.map((service, i) => {
              return (
                <article className="reveal h-full" key={service.id} style={revealDelay(i)}>
                  <Tilt className="h-full">
                    <div className="card card-interactive flex h-full flex-col p-6">
                      <div className="flex items-start justify-between gap-3">
                        <span className="s-container hairline flex h-11 w-11 items-center justify-center rounded" style={{ color: 'var(--primary)' }}>
                          <Icon name={service.icon} size={20} />
                        </span>
                        <span className="chip">{service.est}</span>
                      </div>
                      <h2 className="t-h2 c-on mt-6">{service.name}</h2>
                      <p className="t-body c-variant mt-3">{service.blurb}</p>
                      <ul className="mt-5 flex flex-col gap-2">
                        {service.detail.map((line) => (
                          <li className="t-body c-variant flex gap-3 text-[15px]" key={line}>
                            <span className="c-primary mt-1 shrink-0">
                              <Icon name="check" size={13} strokeWidth={2.4} />
                            </span>
                            {line}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 flex flex-wrap items-center gap-2">
                        <span className="t-mono c-on text-[14px]">{service.price}</span>
                        {service.pricePlaceholder && <Placeholder>Placeholder price</Placeholder>}
                      </div>
                      <div className="mt-auto pt-6">
                        <button className="btn btn-ghost px-3 py-2" onClick={() => onBook(service.id)} type="button">
                          Book
                          <Icon className="nudge" name="arrowRight" size={13} />
                        </button>
                      </div>
                    </div>
                  </Tilt>
                </article>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
