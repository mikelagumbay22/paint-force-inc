import { useReveal } from '../lib/hooks'

export function SectionHead({ eyebrow, title, lead, center = false, className = '' }) {
  const ref = useReveal()
  return (
    <div
      ref={ref}
      className={`reveal max-w-2xl ${center ? 'mx-auto text-center' : ''} ${className}`}
    >
      {eyebrow && (
        <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          <span className="h-px w-6" style={{ background: 'var(--primary-container)' }} />
          <span className="t-caps c-primary">{eyebrow}</span>
        </div>
      )}
      <h2 className="t-h1 c-on mt-4">{title}</h2>
      {lead && <p className="t-body-lg c-variant mt-4">{lead}</p>}
    </div>
  )
}
