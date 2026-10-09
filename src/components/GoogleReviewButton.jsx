import { site } from '../site.config'
import { Stars } from './Icon'
import { Placeholder } from './Badges'

export function GoogleReviewButton({ className = '' }) {
  const url = site.business.googleReviewUrl
  const label = (
    <>
      <Stars size={12} />
      Leave us a Google review
    </>
  )

  if (!url) {
    return (
      <span className={`inline-flex flex-col items-start gap-2 ${className}`}>
        <span className="btn btn-ghost px-5 py-3">{label}</span>
        <Placeholder>Placeholder link</Placeholder>
      </span>
    )
  }

  return (
    <a className={`btn btn-ghost px-5 py-3 ${className}`} href={url} rel="noreferrer" target="_blank">
      {label}
    </a>
  )
}
