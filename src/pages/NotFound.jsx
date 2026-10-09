import { usePageMeta } from '../lib/hooks'
import { Link } from '../lib/router'
import { site } from '../site.config'

export default function NotFound() {
  usePageMeta(`Page not found | ${site.business.name}`, site.seo.home.description)
  return (
    <section className="mx-auto flex min-h-[50vh] max-w-container flex-col items-start justify-center px-gutter py-section">
      <p className="t-caps c-primary">404</p>
      <h1 className="t-h1 c-on mt-3">That page is not on this site.</h1>
      <p className="t-body c-variant mt-4 max-w-md">
        The Premium layout uses seven pages. Head back to the home page and pick one from the menu.
      </p>
      <Link className="btn btn-primary mt-8 px-6 py-3" to="/">
        Back home
      </Link>
    </section>
  )
}
