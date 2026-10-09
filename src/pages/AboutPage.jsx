import { publicUrl } from '../lib/asset'
import { site } from '../site.config'
import { revealDelay, usePageMeta, useReveal } from '../lib/hooks'
import { Link } from '../lib/router'
import { PageHero } from '../components/PageHero'
import { Placeholder } from '../components/Badges'
import { Tilt } from '../components/Tilt'
import { Icon } from '../components/Icon'

export default function AboutPage() {
  usePageMeta(site.seo.about.title, site.seo.about.description)
  const ref = useReveal()

  return (
    <>
      <PageHero
        eyebrow={`About · ${site.business.city}`}
        lead={site.business.summary}
        title="A mobile unit, one driveway, one visit."
      />

      <section className="py-section">
        <div className="mx-auto grid max-w-container gap-4 px-gutter md:grid-cols-3" ref={ref}>
          {site.process.map((step, i) => (
            <article className="reveal h-full" key={step.n} style={revealDelay(i)}>
              <Tilt className="h-full">
                <div className="card card-interactive h-full p-6">
                  <span className="t-mono c-primary text-[13px]">{step.n}</span>
                  <h2 className="t-h2 c-on mt-4">{step.title}</h2>
                  <p className="t-body c-variant mt-3">{step.body}</p>
                  <p className="t-caps c-variant mt-5 text-[10px] opacity-60">{step.meta}</p>
                </div>
              </Tilt>
            </article>
          ))}
        </div>
      </section>

      <section className="s-low py-section">
        <div className="mx-auto grid max-w-container gap-10 px-gutter lg:grid-cols-2">
          <div>
            <h2 className="t-h1 c-on">Where the work starts.</h2>
            <p className="t-body-lg c-variant mt-4">
              The address on file is {site.business.address}. Call {site.business.phone}. Owner
              story, year founded, and team photos were not in the source material.
            </p>
            <p className="mt-4">
              <Placeholder>Add the studio story</Placeholder>
            </p>
            <dl className="mt-8 flex flex-col gap-4">
              <div>
                <dt className="t-caps c-variant text-[10px] opacity-60">Confirmed base</dt>
                <dd className="c-on mt-1">{site.serviceArea.confirmed}</dd>
              </div>
              <div>
                <dt className="t-caps c-variant text-[10px] opacity-60">Service area</dt>
                <dd className="c-variant mt-1">{site.serviceArea.note}</dd>
                <dd className="mt-2">
                  <Placeholder>Placeholder area</Placeholder>
                </dd>
              </div>
            </dl>
            <Link className="btn btn-ghost mt-8 px-5 py-3" to="/contact">
              Map, hours, and quote
              <Icon className="nudge" name="arrowRight" size={14} />
            </Link>
          </div>

          <div className="card flex flex-col items-start gap-5 p-6 sm:p-8">
            <div>
              <h2 className="t-h2 c-on">Logo and photos</h2>
              <p className="t-body c-variant mt-3">
                Swap <span className="t-mono text-[13px]">public/logo.png</span> for the client logo.
                Gallery frames are sized for professional before-and-after photos. The images in this
                demo are illustrative.
              </p>
            </div>
            <img
              alt={site.business.logoAlt}
              className="s-lowest hairline max-h-40 w-full object-contain p-4"
              src={publicUrl(site.business.logo)}
            />
            <Placeholder>Room for professional photos</Placeholder>
          </div>
        </div>
      </section>
    </>
  )
}
