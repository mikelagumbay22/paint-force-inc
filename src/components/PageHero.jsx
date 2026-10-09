import { useReveal } from '../lib/hooks'

export function PageHero({ eyebrow, title, lead }) {
  const ref = useReveal()
  return (
    <header className="hairline-b">
      <div className="reveal mx-auto max-w-container px-gutter py-12 md:py-16" ref={ref}>
        <div className="flex items-center gap-3">
          <span className="h-px w-6 shrink-0" style={{ background: 'var(--primary-container)' }} />
          <p className="t-caps c-primary">{eyebrow}</p>
        </div>
        <h1 className="t-h1 c-on mt-4 max-w-3xl">{title}</h1>
        {lead && <p className="t-body-lg c-variant mt-4 max-w-2xl">{lead}</p>}
      </div>
    </header>
  )
}
