import { useCallback, useEffect, useState } from 'react'
import { BookingModal } from './components/BookingModal'
import { DemoBanner } from './components/DemoBanner'
import { Footer } from './components/Footer'
import { Icon } from './components/Icon'
import { Nav } from './components/Nav'
import { ToastProvider } from './components/Toast'
import { TrackModal } from './components/TrackModal'
import { useScrolled } from './lib/hooks'
import { publicUrl } from './lib/asset'
import { appHref, useRoute } from './lib/router'
import { site } from './site.config'
import AboutPage from './pages/AboutPage'
import ContactPage from './pages/ContactPage'
import FaqPage from './pages/FaqPage'
import GalleryPage from './pages/GalleryPage'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import ReviewsPage from './pages/ReviewsPage'
import ServicesPage from './pages/ServicesPage'

const ROUTES = {
  '/': Home,
  '/services': ServicesPage,
  '/gallery': GalleryPage,
  '/about': AboutPage,
  '/reviews': ReviewsPage,
  '/faq': FaqPage,
  '/contact': ContactPage,
}

export default function App() {
  return (
    <ToastProvider>
      <Shell />
    </ToastProvider>
  )
}

function Shell() {
  const path = useRoute()
  const [booking, setBooking] = useState(false)
  const [tracking, setTracking] = useState(false)
  const [preset, setPreset] = useState('')
  const Page = ROUTES[path] || NotFound

  const openBooking = useCallback((serviceId = '') => {
    setPreset(serviceId || '')
    setBooking(true)
  }, [])

  useEffect(() => {
    if (new URLSearchParams(window.location.search).get('track') === '1') {
      setTracking(true)
      window.history.replaceState({}, '', appHref(path))
    }
  }, [path])

  useEffect(() => {
    const main = document.getElementById('main')
    if (!main) return
    main.tabIndex = -1
    main.focus({ preventScroll: true })
  }, [path])

  return (
    <>
      <JsonLd />
      <DemoBanner />
      <Nav onBook={() => openBooking()} onTrack={() => setTracking(true)} />
      <main className="page-enter" id="main" key={path}>
        <Page onBook={openBooking} />
      </main>
      <Footer onTrack={() => setTracking(true)} />
      <BookingBar onBook={() => openBooking()} />
      <BookingModal onClose={() => setBooking(false)} open={booking} presetService={preset} />
      <TrackModal onClose={() => setTracking(false)} open={tracking} />
    </>
  )
}

function JsonLd() {
  const { business } = site
  const data = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: business.name,
    telephone: '+1-416-627-3948',
    image: publicUrl(business.logo),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.street,
      addressLocality: business.city,
      addressRegion: business.region,
      addressCountry: business.country,
    },
    areaServed: business.city,
  }
  return <script dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} type="application/ld+json" />
}

function BookingBar({ onBook }) {
  const shown = useScrolled(560)
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-[70] px-3 pb-3 sm:hidden"
      style={{
        transform: shown ? 'none' : 'translateY(120%)',
        transition: 'transform .35s cubic-bezier(.2,.7,.3,1)',
        pointerEvents: shown ? 'auto' : 'none',
      }}
    >
      <div
        className="hairline flex items-center gap-2 rounded p-2"
        style={{
          background: 'rgba(28,32,36,.92)',
          backdropFilter: 'blur(14px)',
          boxShadow: '0 -8px 30px -12px #000',
        }}
      >
        <a className="btn btn-ghost flex-1 py-3.5" href={site.business.phoneHref}>
          <Icon name="phone" size={14} />
          Call
        </a>
        <button className="btn btn-primary flex-[1.4] py-3.5" onClick={onBook} type="button">
          Book a repair
        </button>
      </div>
    </div>
  )
}
