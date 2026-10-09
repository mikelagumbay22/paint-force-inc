import { site } from '../site.config'
import { revealDelay, usePageMeta, useReveal } from '../lib/hooks'
import { BeforeAfter } from '../components/BeforeAfter'
import { Icon } from '../components/Icon'
import { PageHero } from '../components/PageHero'
import { Placeholder } from '../components/Badges'
import { Tilt } from '../components/Tilt'

export default function GalleryPage() {
  usePageMeta(site.seo.gallery.title, site.seo.gallery.description)
  const ref = useReveal()

  return (
    <>
      <PageHero
        eyebrow={`Gallery · ${site.business.city}`}
        lead="Drag the handle, click the frame, or focus it and use the arrow keys. Captions and photos are from the previous draft and are marked illustrative until real job photography replaces them."
        title="Before and after paint work."
      />
      <section className="py-section">
        <div className="reveal mx-auto grid max-w-container gap-6 px-gutter md:grid-cols-2 lg:grid-cols-3" ref={ref}>
          {site.portfolio.map((item, i) => (
            <article className="reveal h-full" key={item.id} style={revealDelay(i, 80)}>
              <Tilt className="h-full">
                <div className="card card-interactive flex h-full flex-col overflow-hidden">
                  <BeforeAfter alt={`${item.vehicle}, illustrative before and after`} className="aspect-[4/3] w-full" src={item.src} />
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center justify-between gap-3">
                      <span className="t-caps c-primary text-[10px]">{item.tag}</span>
                      <span className="t-mono c-variant flex items-center gap-1.5 text-[11px] opacity-70">
                        <Icon name="clock" size={12} />
                        {item.duration}
                      </span>
                    </div>
                    <h2 className="t-h3 c-on mt-2">{item.vehicle}</h2>
                    <p className="t-body c-variant mt-4 flex-1 text-[15px] italic">“{item.quote}”</p>
                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                      <span className="c-on text-[14px]">{item.author}</span>
                      <Placeholder>Sample caption</Placeholder>
                    </div>
                  </div>
                </div>
              </Tilt>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
