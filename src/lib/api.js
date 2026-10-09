/**
 * Mock API layer.
 * =============================================================================
 * Everything the UI needs to talk to a server goes through this one file, so
 * swapping in a real backend means rewriting four function bodies and nothing
 * else. Each function already returns the exact shape the components expect.
 *
 * To go live, replace the body of each function with a fetch, e.g.
 *
 *   export async function createBooking(payload) {
 *     const res = await fetch('/api/bookings', {
 *       method: 'POST',
 *       headers: { 'Content-Type': 'application/json' },
 *       body: JSON.stringify(payload),
 *     })
 *     if (!res.ok) throw new ApiError(await res.text())
 *     return res.json()
 *   }
 *
 * Keep throwing ApiError on failure — the UI catches it and shows the message
 * verbatim, so whatever the server says is what the customer reads.
 */

const LATENCY = [420, 900] // simulated round-trip, ms
const FAILURE_RATE = 0 // bump to 0.25 to exercise the error states

export class ApiError extends Error {
  constructor(message, field) {
    super(message)
    this.name = 'ApiError'
    this.field = field // lets the form highlight the offending input
  }
}

const wait = () =>
  new Promise((r) => setTimeout(r, LATENCY[0] + Math.random() * (LATENCY[1] - LATENCY[0])))

async function transport() {
  await wait()
  if (Math.random() < FAILURE_RATE) {
    throw new ApiError("The request didn't reach our dispatch system. Try again.")
  }
}

/* --- Store ---------------------------------------------------------------
   In-memory on purpose: no storage APIs, so this drops into any sandbox
   unchanged. Point it at your database and the rest of the file still works. */

export const STAGES = [
  { id: 'received', label: 'Request received', note: 'Damage photos logged and reviewed.' },
  { id: 'scheduled', label: 'Appointment set', note: 'Technician and mobile unit assigned.' },
  { id: 'enroute', label: 'Technician en route', note: 'Live ETA sent by text on the day.' },
  { id: 'progress', label: 'Repair underway', note: 'Colour matched, panel prepped, work started.' },
  { id: 'complete', label: 'Complete', note: 'Final inspection passed. Invoice sent.' },
]

const bookings = new Map()

// Seeded jobs so the tracker has something real to show on a cold start.
;[
  {
    reference: 'PF-2481',
    name: 'Mark R.',
    vehicle: '2022 Tesla Model 3',
    colour: 'PPSW — Pearl White Multi-Coat',
    service: 'Scratch removal',
    stage: 'progress',
    date: 'Thu 27 Aug',
    window: '10:00 – 12:00',
    tech: 'D. Okafor',
    address: 'Erin Mills, Mississauga',
  },
  {
    reference: 'PF-7752',
    name: 'Sarah J.',
    vehicle: '2019 Porsche Macan',
    colour: 'M5X — Volcano Grey Metallic',
    service: 'Bumper repair',
    stage: 'scheduled',
    date: 'Mon 31 Aug',
    window: '08:00 – 10:00',
    tech: 'A. Bianchi',
    address: 'Oakville, ON',
  },
  {
    reference: 'PF-1039',
    name: 'David T.',
    vehicle: '2021 BMW M340i',
    colour: 'C4A — Portimao Blue',
    service: 'Paint touch-up',
    stage: 'complete',
    date: 'Fri 15 Aug',
    window: '13:00 – 15:00',
    tech: 'D. Okafor',
    address: 'Streetsville, Mississauga',
  },
].forEach((b) => bookings.set(b.reference, b))

let counter = 3100
const nextReference = () => `PF-${++counter}`

/* --- Availability -------------------------------------------------------- */

const HOURS = ['08:00', '10:00', '12:00', '14:00', '16:00']

// Deterministic hash so a given date always returns the same slots. Random
// availability that reshuffles on every render feels broken to a user.
function hash(str) {
  let h = 0
  for (let i = 0; i < str.length; i++) h = (h * 31 + str.charCodeAt(i)) | 0
  return Math.abs(h)
}

export async function getAvailability(dateISO) {
  await transport()
  const seed = hash(dateISO)
  const day = new Date(dateISO + 'T12:00:00').getDay()
  return HOURS.map((time, i) => ({
    time,
    // Sundays closed; otherwise about a third of slots are already taken.
    available: day === 0 ? false : (seed >> (i * 2)) % 3 !== 0,
  }))
}

/* --- Bookings ------------------------------------------------------------ */

export async function createBooking(payload) {
  await transport()

  if (!payload.service) throw new ApiError('Choose a service first.', 'service')
  if (!payload.vehicle?.trim()) throw new ApiError('Tell us the vehicle make and model.', 'vehicle')
  if (!payload.date || !payload.time) throw new ApiError('Pick a date and arrival window.', 'date')
  if (!payload.name?.trim()) throw new ApiError('Add a name for the appointment.', 'name')
  if (!isEmail(payload.email)) throw new ApiError('That email address looks incomplete.', 'email')
  if (digits(payload.phone).length < 10)
    throw new ApiError('A 10-digit phone number lets the tech text an ETA.', 'phone')

  const reference = nextReference()
  const booking = {
    ...payload,
    reference,
    stage: 'scheduled',
    tech: 'Assigning',
    window: windowFor(payload.time),
    createdAt: new Date().toISOString(),
  }
  bookings.set(reference, booking)
  return booking
}

export async function getRepair(reference) {
  await transport()
  const key = String(reference || '').trim().toUpperCase()
  const booking = bookings.get(key)
  if (!booking) {
    throw new ApiError(`No job found for ${key || 'that reference'}. Check the code on your confirmation email.`)
  }
  const index = STAGES.findIndex((s) => s.id === booking.stage)
  return { ...booking, stageIndex: index, stages: STAGES }
}

/* --- Quote requests ------------------------------------------------------ */

export async function submitQuote(payload) {
  await transport()
  if (!payload.name?.trim()) throw new ApiError('Add your name so we know who to reply to.', 'name')
  if (!isEmail(payload.email)) throw new ApiError('That email address looks incomplete.', 'email')
  if (digits(payload.phone).length < 10) throw new ApiError('Add a 10-digit phone number.', 'phone')
  if (!payload.vehicle?.trim()) throw new ApiError('Which vehicle are we quoting?', 'vehicle')
  if (!payload.service) throw new ApiError('Pick the closest service.', 'service')
  if (!payload.description?.trim() || payload.description.trim().length < 12)
    throw new ApiError('A sentence or two about the damage speeds up the estimate.', 'description')

  const reference = nextReference()
  bookings.set(reference, {
    ...payload,
    reference,
    stage: 'received',
    date: 'Pending',
    window: 'Pending',
    tech: 'Unassigned',
  })
  return { reference }
}

/* --- Helpers ------------------------------------------------------------- */

const digits = (v) => String(v || '').replace(/\D/g, '')
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(v || '').trim())

function windowFor(time) {
  const [h] = time.split(':').map(Number)
  return `${time} – ${String(h + 2).padStart(2, '0')}:00`
}

export function formatPhone(value) {
  const d = digits(value).slice(0, 10)
  if (d.length < 4) return d
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`
}
