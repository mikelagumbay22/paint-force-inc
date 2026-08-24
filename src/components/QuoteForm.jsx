import { useEffect, useRef, useState } from 'react'
import { formatPhone, submitQuote } from '../lib/api'
import { SERVICES } from '../lib/data'
import { useReveal } from '../lib/hooks'
import { Icon, Spinner } from './Icon'
import { SectionHead } from './SectionHead'
import { useToast } from './Toast'

const EMPTY = { name: '', email: '', phone: '', vehicle: '', service: '', description: '' }

export function QuoteForm() {
  const ref = useReveal()
  const toast = useToast()
  const [values, setValues] = useState(EMPTY)
  const [error, setError] = useState(null) // { message, field }
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState(null)
  const [photos, setPhotos] = useState([])
  const [dragging, setDragging] = useState(false)
  const fileInput = useRef(null)

  useEffect(() => () => photos.forEach((p) => URL.revokeObjectURL(p.url)), [photos])

  const set = (key) => (e) => {
    const raw = e.target.value
    setValues((v) => ({ ...v, [key]: key === 'phone' ? formatPhone(raw) : raw }))
    if (error?.field === key) setError(null)
  }

  const addFiles = (list) => {
    const next = [...list]
      .filter((f) => f.type.startsWith('image/'))
      .slice(0, 6 - photos.length)
      .map((f) => ({ id: `${f.name}-${f.size}-${Math.random()}`, name: f.name, url: URL.createObjectURL(f) }))
    if (!next.length) return
    setPhotos((p) => [...p, ...next])
  }

  const removePhoto = (id) =>
    setPhotos((p) => {
      const hit = p.find((x) => x.id === id)
      if (hit) URL.revokeObjectURL(hit.url)
      return p.filter((x) => x.id !== id)
    })

  const onSubmit = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError(null)
    try {
      const res = await submitQuote({ ...values, photoCount: photos.length })
      setDone(res.reference)
      toast(`Quote request sent. Reference ${res.reference}.`)
    } catch (err) {
      setError({ message: err.message, field: err.field })
      toast(err.message, 'error')
      if (err.field) document.getElementById(`q-${err.field}`)?.focus()
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url))
    setPhotos([])
    setValues(EMPTY)
    setDone(null)
  }

  return (
    <section className="s-lowest py-section" id="quote">
      <div className="mx-auto max-w-container px-gutter">
        <SectionHead
          eyebrow="Estimate"
          lead="Send photos of the damage and a technician replies with a fixed price, usually within two hours."
          title="Get a price."
        />

        <div ref={ref} className="reveal mt-12">
          {done ? (
            <div className="card flex flex-col items-center px-6 py-16 text-center">
              <span
                className="flex h-14 w-14 items-center justify-center rounded-full"
                style={{ background: 'color-mix(in srgb, var(--primary-container) 18%, transparent)', color: 'var(--primary)' }}
              >
                <Icon name="check" size={26} strokeWidth={2.2} />
              </span>
              <h3 className="t-h2 c-on mt-6">Request sent.</h3>
              <p className="t-body c-variant mt-3 max-w-md">
                A technician is reviewing your photos. Keep this reference — it also works in the
                repair tracker.
              </p>
              <p className="t-mono c-primary mt-6 text-[24px] tracking-[0.15em]">{done}</p>
              <button className="btn btn-ghost mt-8 px-6 py-3" onClick={reset} type="button">
                Send another
              </button>
            </div>
          ) : (
            <form className="grid gap-6 md:grid-cols-12" noValidate onSubmit={onSubmit}>
              <div className="flex flex-col gap-5 md:col-span-7">
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field error={error} id="q-name" label="Full name">
                    <input
                      className="field"
                      id="q-name"
                      aria-invalid={error?.field === 'name'}
                      onChange={set('name')}
                      placeholder="Jordan Mills"
                      value={values.name}
                    />
                  </Field>
                  <Field error={error} id="q-email" label="Email">
                    <input
                      className="field"
                      id="q-email"
                      aria-invalid={error?.field === 'email'}
                      onChange={set('email')}
                      placeholder="jordan@example.com"
                      type="email"
                      value={values.email}
                    />
                  </Field>
                  <Field error={error} id="q-phone" label="Phone">
                    <input
                      className="field"
                      id="q-phone"
                      aria-invalid={error?.field === 'phone'}
                      inputMode="tel"
                      onChange={set('phone')}
                      placeholder="(416) 000-0000"
                      value={values.phone}
                    />
                  </Field>
                  <Field error={error} id="q-vehicle" label="Vehicle">
                    <input
                      className="field"
                      id="q-vehicle"
                      aria-invalid={error?.field === 'vehicle'}
                      onChange={set('vehicle')}
                      placeholder="2021 Tesla Model 3"
                      value={values.vehicle}
                    />
                  </Field>
                </div>

                <Field error={error} id="q-service" label="Service">
                  <select
                    className="field"
                    id="q-service"
                    aria-invalid={error?.field === 'service'}
                    onChange={set('service')}
                    value={values.service}
                  >
                    <option value="">Choose the closest match</option>
                    {SERVICES.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name}
                      </option>
                    ))}
                    <option value="other">Something else</option>
                  </select>
                </Field>

                <Field error={error} id="q-description" label="What happened">
                  <textarea
                    className="field min-h-[130px] resize-y"
                    id="q-description"
                    aria-invalid={error?.field === 'description'}
                    onChange={set('description')}
                    placeholder="Where the damage is, roughly how big, and whether it catches a fingernail."
                    value={values.description}
                  />
                </Field>
              </div>

              <div className="flex flex-col gap-5 md:col-span-5">
                <div className="flex flex-1 flex-col gap-2">
                  <span className="t-caps c-variant">Photos · {photos.length}/6</span>

                  <div
                    className="relative flex flex-1 flex-col items-center justify-center rounded p-8 text-center transition-colors"
                    onDragLeave={() => setDragging(false)}
                    onDragOver={(e) => {
                      e.preventDefault()
                      setDragging(true)
                    }}
                    onDrop={(e) => {
                      e.preventDefault()
                      setDragging(false)
                      addFiles(e.dataTransfer.files)
                    }}
                    style={{
                      border: `1px dashed ${
                        dragging
                          ? 'var(--primary-container)'
                          : 'color-mix(in srgb, var(--outline-variant) 40%, transparent)'
                      }`,
                      background: dragging
                        ? 'color-mix(in srgb, var(--primary-container) 7%, transparent)'
                        : 'var(--surface-container-lowest)',
                      minHeight: 190,
                    }}
                  >
                    <input
                      accept="image/*"
                      className="absolute inset-0 cursor-pointer opacity-0"
                      multiple
                      onChange={(e) => {
                        addFiles(e.target.files)
                        e.target.value = ''
                      }}
                      ref={fileInput}
                      type="file"
                    />
                    <span className="c-primary">
                      <Icon name="upload" size={26} />
                    </span>
                    <p className="c-on mt-4 text-[15px]">Drop photos here</p>
                    <p className="c-variant mt-1 text-[13px] opacity-70">or click to browse</p>
                    <p className="t-caps c-variant mt-4 text-[9px] opacity-45">
                      Daylight, straight on, one close-up
                    </p>
                  </div>

                  {photos.length > 0 && (
                    <ul className="grid grid-cols-4 gap-2">
                      {photos.map((p) => (
                        <li key={p.id} className="group relative aspect-square overflow-hidden rounded">
                          <img alt={p.name} className="h-full w-full object-cover" src={p.url} />
                          <button
                            aria-label={`Remove ${p.name}`}
                            className="absolute inset-0 flex items-center justify-center bg-black/65 opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
                            onClick={() => removePhoto(p.id)}
                            type="button"
                          >
                            <Icon name="close" size={16} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {error && !error.field && (
                  <p className="t-body text-[14px]" style={{ color: 'var(--error)' }} role="alert">
                    {error.message}
                  </p>
                )}

                <button className="btn btn-primary w-full py-4" disabled={busy} type="submit">
                  {busy ? <Spinner /> : <Icon name="send" size={15} />}
                  {busy ? 'Sending' : 'Send request'}
                </button>
                <p className="t-caps c-variant text-center text-[9px] opacity-45">
                  No obligation · No card required
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ id, label, error, children }) {
  const invalid = error?.field === id.replace('q-', '')
  return (
    <div className="flex flex-col gap-2">
      <label className="t-caps c-variant" htmlFor={id}>
        {label}
      </label>
      {children}
      {invalid && (
        <span className="text-[13px]" role="alert" style={{ color: 'var(--error)' }}>
          {error.message}
        </span>
      )}
    </div>
  )
}
