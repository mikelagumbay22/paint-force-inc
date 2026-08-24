import { useEffect, useMemo, useState } from 'react'
import { createBooking, formatPhone, getAvailability } from '../lib/api'
import { SERVICES } from '../lib/data'
import { Icon, Spinner } from './Icon'
import { Modal } from './Modal'
import { useToast } from './Toast'

const STEPS = [
  { id: 'service', label: 'Service' },
  { id: 'vehicle', label: 'Vehicle' },
  { id: 'schedule', label: 'Schedule' },
  { id: 'contact', label: 'Contact' },
]

const BLANK = {
  service: '',
  vehicle: '',
  colour: '',
  notes: '',
  date: '',
  time: '',
  name: '',
  email: '',
  phone: '',
  address: '',
}

/** Next 14 days, starting tomorrow — nothing is bookable same-day. */
function upcomingDays() {
  const out = []
  const start = new Date()
  start.setHours(12, 0, 0, 0)
  for (let i = 1; i <= 14; i++) {
    const d = new Date(start)
    d.setDate(start.getDate() + i)
    out.push({
      iso: d.toISOString().slice(0, 10),
      weekday: d.toLocaleDateString('en-CA', { weekday: 'short' }).toUpperCase(),
      day: d.getDate(),
      month: d.toLocaleDateString('en-CA', { month: 'short' }).toUpperCase(),
      closed: d.getDay() === 0,
      label: d.toLocaleDateString('en-CA', { weekday: 'short', day: 'numeric', month: 'short' }),
    })
  }
  return out
}

export function BookingModal({ open, onClose, presetService }) {
  const toast = useToast()
  const [step, setStep] = useState(0)
  const [values, setValues] = useState(BLANK)
  const [slots, setSlots] = useState(null)
  const [loadingSlots, setLoadingSlots] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)
  const [confirmed, setConfirmed] = useState(null)

  const days = useMemo(upcomingDays, [])

  // Reset when the dialog reopens, honouring a service chosen from a card.
  useEffect(() => {
    if (!open) return
    setValues({ ...BLANK, service: presetService || '' })
    setStep(presetService ? 1 : 0)
    setConfirmed(null)
    setError(null)
    setSlots(null)
  }, [open, presetService])

  useEffect(() => {
    if (!values.date) return
    let cancelled = false
    setLoadingSlots(true)
    setSlots(null)
    getAvailability(values.date)
      .then((s) => !cancelled && setSlots(s))
      .catch(() => !cancelled && setSlots([]))
      .finally(() => !cancelled && setLoadingSlots(false))
    return () => {
      cancelled = true
    }
  }, [values.date])

  const set = (key, value) => {
    setValues((v) => ({ ...v, [key]: key === 'phone' ? formatPhone(value) : value }))
    setError(null)
  }

  const canAdvance = {
    0: !!values.service,
    1: values.vehicle.trim().length > 1,
    2: !!values.date && !!values.time,
    3: values.name.trim() && values.email.trim() && values.phone.trim() && values.address.trim(),
  }[step]

  const submit = async () => {
    setBusy(true)
    setError(null)
    try {
      const booking = await createBooking(values)
      setConfirmed(booking)
      toast(`Booked. Reference ${booking.reference}.`)
    } catch (err) {
      setError(err.message)
      toast(err.message, 'error')
    } finally {
      setBusy(false)
    }
  }

  const service = SERVICES.find((s) => s.id === values.service)
  const chosenDay = days.find((d) => d.iso === values.date)

  return (
    <Modal label="Book a repair" onClose={onClose} open={open} width="max-w-4xl">
      {confirmed ? (
        <Confirmation booking={confirmed} day={chosenDay} onClose={onClose} service={service} />
      ) : (
        <>
          <Stepper current={step} onJump={(i) => i < step && setStep(i)} />

          <div className="flex-1 overflow-y-auto px-6 py-7 sm:px-8">
            {step === 0 && <StepService onPick={(id) => { set('service', id); setStep(1) }} value={values.service} />}
            {step === 1 && <StepVehicle set={set} values={values} />}
            {step === 2 && (
              <StepSchedule
                days={days}
                loading={loadingSlots}
                set={set}
                slots={slots}
                values={values}
              />
            )}
            {step === 3 && <StepContact error={error} set={set} values={values} />}
          </div>

          <div className="s-lowest hairline-t flex items-center justify-between gap-4 px-6 py-4 sm:px-8">
            <button
              className="btn btn-quiet px-2 py-3"
              onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
              type="button"
            >
              <Icon name="arrowLeft" size={14} />
              {step === 0 ? 'Cancel' : 'Back'}
            </button>

            <div className="flex items-center gap-4">
              <Summary service={service} values={values} />
              {step < 3 ? (
                <button
                  className="btn btn-primary px-6 py-3"
                  disabled={!canAdvance}
                  onClick={() => setStep((s) => s + 1)}
                  type="button"
                >
                  Continue
                  <Icon name="arrowRight" size={14} />
                </button>
              ) : (
                <button
                  className="btn btn-primary px-6 py-3"
                  disabled={!canAdvance || busy}
                  onClick={submit}
                  type="button"
                >
                  {busy ? <Spinner /> : null}
                  {busy ? 'Booking' : 'Confirm booking'}
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </Modal>
  )
}

/* --- Stepper -------------------------------------------------------------- */

function Stepper({ current, onJump }) {
  return (
    <div className="s-lowest hairline-b px-6 pb-5 pt-6 sm:px-8">
      <div className="flex items-center gap-2 sm:gap-3">
        {STEPS.map((s, i) => {
          const state = i < current ? 'done' : i === current ? 'current' : 'todo'
          return (
            <div key={s.id} className="flex flex-1 items-center gap-2 sm:gap-3">
              <button
                className="flex items-center gap-2 whitespace-nowrap"
                disabled={i >= current}
                onClick={() => onJump(i)}
                type="button"
              >
                <span
                  className="t-mono flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold"
                  style={{
                    background: state === 'current' ? 'var(--primary-container)' : 'transparent',
                    color:
                      state === 'current'
                        ? '#fff'
                        : state === 'done'
                          ? 'var(--primary)'
                          : 'color-mix(in srgb, var(--on-surface-variant) 45%, transparent)',
                    border:
                      state === 'current'
                        ? '1px solid var(--primary-container)'
                        : `1px solid color-mix(in srgb, var(--secondary) ${state === 'done' ? 45 : 22}%, transparent)`,
                  }}
                >
                  {state === 'done' ? <Icon name="check" size={11} strokeWidth={3} /> : String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className="t-caps hidden text-[10px] sm:inline"
                  style={{
                    color:
                      state === 'todo'
                        ? 'color-mix(in srgb, var(--on-surface-variant) 45%, transparent)'
                        : 'var(--on-surface)',
                  }}
                >
                  {s.label}
                </span>
              </button>
              {i < STEPS.length - 1 && (
                <span
                  className="h-px flex-1"
                  style={{
                    background:
                      i < current
                        ? 'color-mix(in srgb, var(--primary) 45%, transparent)'
                        : 'color-mix(in srgb, var(--secondary) 20%, transparent)',
                    transition: 'background .3s ease',
                  }}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

/* --- Steps ---------------------------------------------------------------- */

function StepService({ value, onPick }) {
  return (
    <fieldset>
      <legend className="t-h2 c-on">What needs work?</legend>
      <p className="t-body c-variant mt-2">Not sure? Pick the closest and add a note on the next screen.</p>
      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        {SERVICES.map((s) => {
          const selected = value === s.id
          return (
            <button
              key={s.id}
              className="card flex flex-col items-start p-5 text-left transition-all"
              onClick={() => onPick(s.id)}
              style={{
                borderColor: selected
                  ? 'var(--primary-container)'
                  : 'color-mix(in srgb, var(--outline-variant) 22%, transparent)',
                background: selected
                  ? 'color-mix(in srgb, var(--primary-container) 8%, var(--surface))'
                  : 'var(--surface)',
              }}
              type="button"
            >
              <span className="c-primary">
                <Icon name={s.icon} size={22} />
              </span>
              <span className="t-h3 c-on mt-4 text-[16px]">{s.name}</span>
              <span className="t-mono c-variant mt-2 text-[12px]">{s.price}</span>
              <span className="chip mt-4">{s.est}</span>
            </button>
          )
        })}
      </div>
    </fieldset>
  )
}

function StepVehicle({ values, set }) {
  return (
    <div>
      <h3 className="t-h2 c-on">Tell us about the car.</h3>
      <p className="t-body c-variant mt-2">
        The paint code is on the door jamb sticker. If you can’t find it, leave it blank — the tech
        will scan it on arrival.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Labelled label="Make and model">
          <input
            autoFocus
            className="field"
            onChange={(e) => set('vehicle', e.target.value)}
            placeholder="2021 Tesla Model 3"
            value={values.vehicle}
          />
        </Labelled>
        <Labelled label="Paint code (optional)">
          <input
            className="field t-mono"
            onChange={(e) => set('colour', e.target.value)}
            placeholder="PPSW"
            value={values.colour}
          />
        </Labelled>
      </div>
      <Labelled className="mt-5" label="Damage notes (optional)">
        <textarea
          className="field min-h-[110px] resize-y"
          onChange={(e) => set('notes', e.target.value)}
          placeholder="Rear passenger door, about 15 cm, catches a fingernail."
          value={values.notes}
        />
      </Labelled>
    </div>
  )
}

function StepSchedule({ days, values, set, slots, loading }) {
  return (
    <div>
      <h3 className="t-h2 c-on">Pick a window.</h3>
      <p className="t-body c-variant mt-2">
        Each slot is a two-hour arrival window. You’ll get a live ETA by text on the day.
      </p>

      <div className="no-scrollbar -mx-1 mt-6 flex gap-2 overflow-x-auto px-1 pb-2">
        {days.map((d) => {
          const selected = values.date === d.iso
          return (
            <button
              key={d.iso}
              className="card flex w-[68px] shrink-0 flex-col items-center py-3 transition-all"
              disabled={d.closed}
              onClick={() => {
                set('date', d.iso)
                set('time', '')
              }}
              style={{
                borderColor: selected
                  ? 'var(--primary-container)'
                  : 'color-mix(in srgb, var(--outline-variant) 22%, transparent)',
                background: selected ? 'color-mix(in srgb, var(--primary-container) 12%, var(--surface))' : 'var(--surface)',
                opacity: d.closed ? 0.32 : 1,
              }}
              type="button"
            >
              <span className="t-caps text-[9px]" style={{ color: selected ? 'var(--primary)' : 'var(--on-surface-variant)' }}>
                {d.weekday}
              </span>
              <span className="t-mono c-on mt-1.5 text-[18px] font-bold leading-none">{d.day}</span>
              <span className="t-caps c-variant mt-1.5 text-[8px] opacity-55">{d.month}</span>
            </button>
          )
        })}
      </div>

      <div className="mt-7 min-h-[120px]">
        {!values.date && (
          <p className="t-caps c-variant flex items-center gap-2 opacity-50">
            <Icon name="calendar" size={14} />
            Choose a date to see open windows
          </p>
        )}

        {loading && (
          <div className="flex items-center gap-3">
            <span className="c-primary">
              <Spinner size={15} />
            </span>
            <span className="t-caps c-variant">Checking the dispatch board</span>
          </div>
        )}

        {slots && !loading && (
          <>
            <span className="t-caps c-variant">Arrival window</span>
            <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-5">
              {slots.map((s) => {
                const selected = values.time === s.time
                return (
                  <button
                    key={s.time}
                    className="card t-mono py-3 text-[13px] transition-all"
                    disabled={!s.available}
                    onClick={() => set('time', s.time)}
                    style={{
                      borderColor: selected
                        ? 'var(--primary-container)'
                        : 'color-mix(in srgb, var(--outline-variant) 22%, transparent)',
                      background: selected
                        ? 'var(--primary-container)'
                        : 'var(--surface)',
                      color: selected ? '#fff' : s.available ? 'var(--on-surface)' : 'var(--on-surface-variant)',
                      opacity: s.available ? 1 : 0.3,
                      textDecoration: s.available ? 'none' : 'line-through',
                    }}
                    type="button"
                  >
                    {s.time}
                  </button>
                )
              })}
            </div>
            {slots.every((s) => !s.available) && (
              <p className="t-body c-variant mt-4 text-[14px]">
                That day is fully booked. Try another date, or call and we’ll find room.
              </p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

function StepContact({ values, set, error }) {
  return (
    <div>
      <h3 className="t-h2 c-on">Where should we meet you?</h3>
      <p className="t-body c-variant mt-2">
        The unit needs a flat spot and about three metres of clearance around the panel.
      </p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Labelled label="Name">
          <input autoFocus className="field" onChange={(e) => set('name', e.target.value)} value={values.name} placeholder="Jordan Mills" />
        </Labelled>
        <Labelled label="Email">
          <input className="field" onChange={(e) => set('email', e.target.value)} placeholder="jordan@example.com" type="email" value={values.email} />
        </Labelled>
        <Labelled label="Phone">
          <input className="field" inputMode="tel" onChange={(e) => set('phone', e.target.value)} placeholder="(416) 000-0000" value={values.phone} />
        </Labelled>
        <Labelled label="Address">
          <input className="field" onChange={(e) => set('address', e.target.value)} placeholder="Street, city" value={values.address} />
        </Labelled>
      </div>
      {error && (
        <p className="mt-5 text-[14px]" role="alert" style={{ color: 'var(--error)' }}>
          {error}
        </p>
      )}
    </div>
  )
}

/* --- Confirmation --------------------------------------------------------- */

function Confirmation({ booking, service, day, onClose }) {
  const rows = [
    ['Service', service?.name || booking.service],
    ['Vehicle', booking.vehicle],
    ['When', `${day?.label || booking.date} · ${booking.window}`],
    ['Where', booking.address],
    ['Technician', booking.tech],
  ]
  return (
    <div className="px-6 py-12 text-center sm:px-10">
      <span
        className="mx-auto flex h-14 w-14 items-center justify-center rounded-full"
        style={{ background: 'color-mix(in srgb, var(--primary-container) 18%, transparent)', color: 'var(--primary)' }}
      >
        <Icon name="check" size={26} strokeWidth={2.2} />
      </span>
      <h3 className="t-h1 c-on mt-6">You’re booked.</h3>
      <p className="t-body c-variant mx-auto mt-3 max-w-md">
        A confirmation is on its way to {booking.email}. Track progress any time with this reference.
      </p>

      <p className="t-mono c-primary mt-7 text-[28px] tracking-[0.16em]">{booking.reference}</p>

      <dl className="card mx-auto mt-8 max-w-md divide-y overflow-hidden text-left">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-baseline justify-between gap-6 px-5 py-3.5">
            <dt className="t-caps c-variant text-[10px]">{k}</dt>
            <dd className="c-on text-right text-[14px]">{v}</dd>
          </div>
        ))}
      </dl>

      <button className="btn btn-primary mt-9 px-8 py-4" onClick={onClose} type="button">
        Done
      </button>
    </div>
  )
}

/* --- Bits ----------------------------------------------------------------- */

function Labelled({ label, children, className = '' }) {
  return (
    <label className={`flex flex-col gap-2 ${className}`}>
      <span className="t-caps c-variant">{label}</span>
      {children}
    </label>
  )
}

function Summary({ service, values }) {
  if (!service) return null
  return (
    <span className="t-mono c-variant hidden text-[11px] opacity-60 md:inline">
      {service.name}
      {values.time ? ` · ${values.time}` : ''}
    </span>
  )
}
