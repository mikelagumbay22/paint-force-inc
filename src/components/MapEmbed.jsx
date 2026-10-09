import { site } from '../site.config'

export function MapEmbed() {
  const query = encodeURIComponent(site.business.address)
  return (
    <div className="card overflow-hidden">
      <div className="relative aspect-[4/3] min-h-[260px] w-full bg-[var(--surface-container)]">
        <iframe
          className="absolute inset-0 h-full w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://maps.google.com/maps?q=${query}&z=15&output=embed`}
          title={`Map of ${site.business.address}`}
        />
      </div>
      <p className="t-caps c-variant px-4 py-3 text-[10px] opacity-70">
        Pin shows the street address on file.
      </p>
    </div>
  )
}
