import { site } from '../site.config'
import { revealDelay, usePageMeta, useReveal } from '../lib/hooks'
import { PageHero } from '../components/PageHero'
import { GoogleReviewButton } from '../components/GoogleReviewButton'
import { Placeholder } from '../components/Badges'
import { Stars } from '../components/Icon'
import { Tilt } from '../components/Tilt'

export default function ReviewsPage() {
  usePageMeta(site.seo.reviews.title, site.seo.reviews.description)
  const ref = useReveal()

  return (
    <>
      <PageHero
        eyebrow={`Reviews · ${site.business.city}`}
        lead={site.reviews.note}
        title="What the previous draft said."
      />
      <section className="py-section">
        <div className="mx-auto max-w-container px-gutter">
          <div className="reveal grid gap-5 md:grid-cols-2" ref={ref}>
            {site.reviews.items.map((review, i) => (
              <Tilt className="h-full" key={review.author}>
                <figure
                  className="reveal card flex h-full flex-col p-7"
                  style={{
                    ...revealDelay(i, 90),
                    borderLeft: '2px solid color-mix(in srgb, var(--primary-container) 70%, transparent)',
                  }}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="c-primary">
                      <Stars size={14} />
                    </span>
                    <Placeholder>Sample</Placeholder>
                  </div>
                  <blockquote className="t-body-lg c-on mt-5 flex-1">“{review.quote}”</blockquote>
                  <figcaption className="hairline-t mt-6 flex items-end justify-between gap-4 pt-5">
                    <span>
                      <span className="t-h3 c-on block">{review.author}</span>
                      <span className="t-caps c-variant mt-1.5 block text-[10px] opacity-65">{review.location}</span>
                    </span>
                    <span className="t-mono c-variant text-right text-[10px] tracking-widest opacity-50">
                      {review.vehicle}
                    </span>
                  </figcaption>
                </figure>
              </Tilt>
            ))}
          </div>

          <div className="card mt-8 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="t-h3 c-on">Google reviews</h2>
              <p className="t-body c-variant mt-2 max-w-xl">
                A live rating is not published here. Add the client’s Google review link and the
                button below starts working.
              </p>
            </div>
            <GoogleReviewButton />
          </div>
        </div>
      </section>
    </>
  )
}
