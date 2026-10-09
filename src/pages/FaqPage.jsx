import { useState } from 'react'
import { site } from '../site.config'
import { usePageMeta } from '../lib/hooks'
import { Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'

export default function FaqPage() {
  usePageMeta(site.seo.faq.title, site.seo.faq.description)
  const [open, setOpen] = useState(0)

  return (
    <>
      <PageHero
        eyebrow={`FAQ · ${site.business.city}`}
        lead="Short answers from the details already on file: the Mississauga address, the three services, and the quote form. Hours and the wider service area stay marked until they are confirmed."
        title="Questions before a visit."
      />
      <section className="py-section">
        <div className="mx-auto flex max-w-3xl flex-col px-gutter">
          {site.faq.map((item, i) => {
            const isOpen = open === i
            return (
              <div className="hairline-b" key={item.q}>
                <button
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  type="button"
                >
                  <span className="t-h3 c-on">{item.q}</span>
                  <span
                    className="c-primary shrink-0"
                    style={{
                      transform: isOpen ? 'none' : 'rotate(45deg)',
                      transition: 'transform .25s ease',
                    }}
                  >
                    <Icon name="close" size={16} />
                  </span>
                </button>
                <div
                  className="grid"
                  style={{
                    gridTemplateRows: isOpen ? '1fr' : '0fr',
                    transition: 'grid-template-rows .3s ease',
                  }}
                >
                  <div className="overflow-hidden">
                    <p className="t-body c-variant pb-5">{item.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
