import { publicUrl } from '../lib/asset'
import { site } from '../site.config'
import { Link } from '../lib/router'
import { GoogleReviewButton } from './GoogleReviewButton'
import { Icon } from './Icon'
import { Placeholder } from './Badges'

export function Footer({ onTrack }) {
  const year = new Date().getFullYear()
  return (
    <footer className="s-lowest hairline-t py-16 pb-28 sm:pb-16">
      <div className="mx-auto max-w-container px-gutter">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <span className="flex items-center gap-2.5">
              <img alt="" className="h-9 w-9 object-contain" draggable={false} src={publicUrl(site.business.logo)} />
              <span className="t-h2 c-on">
                {site.business.name}
                <span className="c-primary">.</span>
              </span>
            </span>
            <p className="t-body c-variant mt-4 max-w-sm">
              Mobile paint and scratch repair based in {site.business.city}. Same visit model as a
              body shop, finished in the driveway.
            </p>
            <button className="btn btn-ghost mt-6 px-5 py-3" onClick={onTrack} type="button">
              <Icon name="search" size={14} />
              Track a repair
            </button>
          </div>

          <div className="md:col-span-2">
            <span className="t-caps c-variant opacity-55">Pages</span>
            <ul className="mt-4 flex flex-col gap-2.5">
              {site.pages.map((page) => (
                <li key={page.path}>
                  <Link className="c-on text-[15px] transition-opacity hover:opacity-70" to={page.path}>
                    {page.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-3">
            <span className="t-caps c-variant opacity-55">Contact</span>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a className="c-on flex items-center gap-2 text-[15px] transition-opacity hover:opacity-75" href={site.business.phoneHref}>
                  <span className="c-primary">
                    <Icon name="phone" size={15} />
                  </span>
                  {site.business.phone}
                </a>
              </li>
              <li className="c-variant flex items-start gap-2 text-[15px]">
                <span className="c-primary mt-0.5">
                  <Icon name="pin" size={15} />
                </span>
                {site.business.address}
              </li>
            </ul>
            <div className="mt-5">
              <GoogleReviewButton />
            </div>
          </div>

          <div className="md:col-span-3">
            <div className="flex items-center justify-between gap-3 md:justify-end">
              <span className="t-caps c-variant opacity-55">Hours</span>
              {site.hours.placeholder && <Placeholder>Placeholder</Placeholder>}
            </div>
            <dl className="mt-4 flex flex-col gap-2">
              {site.hours.rows.map(([day, hours]) => (
                <div className="flex justify-between gap-4" key={day}>
                  <dt className="t-caps c-variant text-[10px] opacity-60">{day}</dt>
                  <dd className="t-mono c-on text-[12px]">{hours}</dd>
                </div>
              ))}
            </dl>
            <p className="t-body c-variant mt-3 text-[13px] opacity-70">{site.hours.note}</p>
          </div>
        </div>

        <div className="hairline-t mt-12 flex flex-col gap-3 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-caps c-variant text-[10px] opacity-55">
            © {year} {site.business.name}
            {site.business.warranty ? ` · ${site.business.warranty}` : ''}
          </p>
          {site.demo.show && (
            <p className="t-caps c-variant text-[10px] opacity-55">
              {site.studio.name} {site.studio.package} demo
            </p>
          )}
        </div>
      </div>
    </footer>
  )
}
