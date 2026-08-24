import { useCallback, useState } from 'react'
import { BookingModal } from './components/BookingModal'
import { CTA } from './components/CTA'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Icon } from './components/Icon'
import { Nav } from './components/Nav'
import { Portfolio } from './components/Portfolio'
import { Process } from './components/Process'
import { QuoteForm } from './components/QuoteForm'
import { Reviews } from './components/Reviews'
import { Services } from './components/Services'
import { ToastProvider } from './components/Toast'
import { TrackModal } from './components/TrackModal'
import { PHONE_HREF } from './lib/data'
import { useScrolled } from './lib/hooks'

export default function App() {
  return (
    <ToastProvider>
      <Site />
    </ToastProvider>
  )
}

function Site() {
  const [booking, setBooking] = useState(false)
  const [tracking, setTracking] = useState(false)
  const [preset, setPreset] = useState('')

  const openBooking = useCallback((serviceId = '') => {
    setPreset(serviceId || '')
    setBooking(true)
  }, [])

  return (
    <>
      <Nav onBook={() => openBooking()} onTrack={() => setTracking(true)} />

      <main id="main">
        <Hero onBook={() => openBooking()} />
        <Services onBook={openBooking} />
        <Process onBook={openBooking} />
        <Portfolio />
        <Reviews />
        <CTA onBook={openBooking} />
        <QuoteForm />
      </main>

      <Footer onTrack={() => setTracking(true)} />

      <BookingBar onBook={() => openBooking()} />

      <BookingModal onClose={() => setBooking(false)} open={booking} presetService={preset} />
      <TrackModal onClose={() => setTracking(false)} open={tracking} />
    </>
  )
}

/** The brief asks for a pinned booking widget. On phones it earns its keep as a
 *  bottom bar; on desktop the header CTA is always visible, so it stays out. */
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
        <a className="btn btn-ghost flex-1 py-3.5" href={PHONE_HREF}>
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
