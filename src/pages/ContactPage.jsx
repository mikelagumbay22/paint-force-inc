import { site } from '../site.config'
import { usePageMeta, useReveal } from '../lib/hooks'
import { GoogleReviewButton } from '../components/GoogleReviewButton'
import { Icon } from '../components/Icon'
import { MapEmbed } from '../components/MapEmbed'
import { PageHero } from '../components/PageHero'
import { Placeholder } from '../components/Badges'
import { QuoteForm } from '../components/QuoteForm'

export default function ContactPage({ onBook }) {
  usePageMeta(site.seo.contact.title, site.seo.contact.description)
  const ref = useReveal()

  return (
    <>
      <PageHero
        eyebrow={`Contact · ${site.business.city}`}
        lead="Send photos for a quote, or call the number on file. The map uses the street address. Hours stay badged until someone confirms them."
        title="Get a price, then pick a window."
      />
      <section className="py-section">
        <div className="reveal mx-auto grid max-w-container gap-6 px-gutter lg:grid-cols-5" ref={ref}>
          <div className="flex flex-col gap-6 lg:col-span-2">
            <div className="card p-6">
              <h2 className="t-h3 c-on">Call</h2>
              <a className="t-h2 c-primary mt-3 inline-flex items-center gap-2" href={site.business.phoneHref}>
                <Icon name="phone" size={18} />
                {site.business.phone}
              </a>
              <p className="t-body c-variant mt-4">{site.business.address}</p>
              <button className="btn btn-primary mt-6 px-5 py-3" onClick={() => onBook()} type="button">
                Book a repair
                <Icon className="nudge" name="arrowRight" size={14} />
              </button>
            </div>

            <div className="card p-6">
              <div className="flex items-center justify-between gap-3">
                <h2 className="t-h3 c-on">Hours</h2>
                {site.hours.placeholder && <Placeholder>Placeholder</Placeholder>}
              </div>
              <dl className="mt-4 flex flex-col gap-2">
                {site.hours.rows.map(([day, hours]) => (
                  <div className="flex justify-between gap-4" key={day}>
                    <dt className="t-caps c-variant text-[10px] opacity-70">{day}</dt>
                    <dd className="t-mono c-on text-[13px]">{hours}</dd>
                  </div>
                ))}
              </dl>
              <p className="t-body c-variant mt-4 text-[14px]">{site.hours.note}</p>
            </div>

            <GoogleReviewButton />
            <MapEmbed />
          </div>
          <div className="lg:col-span-3">
            <QuoteForm heading={false} />
          </div>
        </div>
      </section>
    </>
  )
}
