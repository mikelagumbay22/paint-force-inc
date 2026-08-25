import { ADDRESS, PHONE, PHONE_HREF } from '../lib/data'
import { Icon } from './Icon'

export function Footer({ onTrack }) {
  return (
    <footer className="s-lowest hairline-t py-16">
      <div className="mx-auto max-w-container px-gutter">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <span className="flex items-center gap-2.5">
              <img alt="" className="h-9 w-9 object-contain" draggable={false} src="/logo.png" />
              <span className="t-h2 c-on">
                Paint Force<span className="c-primary">.</span>
              </span>
            </span>
            <p className="t-body c-variant mt-4 max-w-sm">
              Mobile paint and scratch repair across the western GTA. Same finish as a body shop,
              without leaving your driveway.
            </p>
            <button className="btn btn-ghost mt-6 px-5 py-3" onClick={onTrack} type="button" disabled>
              <Icon name="search" size={14} />
              Track a repair
            </button>
          </div>

          <div className="md:col-span-3">
            <span className="t-caps c-variant opacity-55">Contact</span>
            <ul className="mt-4 flex flex-col gap-3">
              <li>
                <a className="c-on flex items-center gap-2 text-[15px] transition-colors hover:opacity-75" href={PHONE_HREF}>
                  <span className="c-primary">
                    <Icon name="phone" size={15} />
                  </span>
                  {PHONE}
                </a>
              </li>
              <li className="c-variant flex items-start gap-2 text-[15px]">
                <span className="c-primary mt-0.5">
                  <Icon name="pin" size={15} />
                </span>
                {ADDRESS}
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 md:text-right">
            <span className="t-caps c-variant opacity-55">Hours</span>
            <dl className="mt-4 flex flex-col gap-2">
              {[
                ['MON – FRI', '07:00 – 18:00'],
                ['SATURDAY', '08:00 – 16:00'],
                ['SUNDAY', 'CLOSED'],
              ].map(([d, h]) => (
                <div key={d} className="flex justify-between gap-6 md:justify-end">
                  <dt className="t-caps c-variant text-[10px] opacity-60">{d}</dt>
                  <dd className="t-mono c-on w-[110px] text-[12px] md:text-right">{h}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="hairline-t mt-12 flex flex-col gap-4 pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-caps c-variant text-[9px] opacity-45">
            © {new Date().getFullYear()} Paint Force, Inc. · Lifetime workmanship warranty
          </p>
          <div className="flex gap-6">
            <a className="t-caps c-variant text-[9px] opacity-45 transition-opacity hover:opacity-90" href="#">
              Terms
            </a>
            <a className="t-caps c-variant text-[9px] opacity-45 transition-opacity hover:opacity-90" href="#">
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
