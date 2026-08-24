import { useState } from 'react'
import { getRepair } from '../lib/api'
import { Icon, Spinner } from './Icon'
import { Modal } from './Modal'

export function TrackModal({ open, onClose }) {
  const [reference, setReference] = useState('')
  const [job, setJob] = useState(null)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState(null)

  const lookup = async (e) => {
    e?.preventDefault()
    setBusy(true)
    setError(null)
    setJob(null)
    try {
      setJob(await getRepair(reference))
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy(false)
    }
  }

  const reset = () => {
    setJob(null)
    setError(null)
    setReference('')
  }

  return (
    <Modal label="Track a repair" onClose={onClose} open={open} width="max-w-2xl">
      <div className="px-6 py-9 sm:px-9">
        <h2 className="t-h1 c-on">Track a repair.</h2>
        <p className="t-body c-variant mt-3">
          Enter the reference from your confirmation email.
        </p>

        <form className="mt-6 flex flex-col gap-3 sm:flex-row" onSubmit={lookup}>
          <input
            aria-invalid={!!error}
            aria-label="Repair reference"
            className="field t-mono flex-1 uppercase tracking-[0.14em]"
            onChange={(e) => {
              setReference(e.target.value)
              setError(null)
            }}
            placeholder="PF-0000"
            value={reference}
          />
          <button className="btn btn-primary px-6 py-3" disabled={busy || !reference.trim()} type="submit">
            {busy ? <Spinner /> : <Icon name="search" size={14} />}
            {busy ? 'Looking' : 'Find job'}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-[14px]" role="alert" style={{ color: 'var(--error)' }}>
            {error}
          </p>
        )}

        {!job && !busy && (
          <p className="t-caps c-variant mt-6 text-[10px] opacity-45">
            Demo references · PF-2481 · PF-7752 · PF-1039
          </p>
        )}

        {job && <Timeline job={job} onReset={reset} />}
      </div>
    </Modal>
  )
}

function Timeline({ job, onReset }) {
  return (
    <div className="mt-9" style={{ animation: 'track-in .35s cubic-bezier(.2,.7,.3,1) both' }}>
      <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
        <div>
          <span className="t-mono c-primary text-[18px] tracking-[0.14em]">{job.reference}</span>
          <p className="c-on mt-1.5 text-[15px]">{job.vehicle}</p>
          <p className="t-caps c-variant mt-2 text-[9px] opacity-60">{job.colour}</p>
        </div>
        <div className="text-right">
          <span className="chip">{job.service}</span>
          <p className="t-mono c-variant mt-2.5 text-[11px]">
            {job.date} · {job.window}
          </p>
          <p className="t-caps c-variant mt-1.5 text-[9px] opacity-60">TECH · {job.tech}</p>
        </div>
      </div>

      <ol className="mt-7">
        {job.stages.map((stage, i) => {
          const state = i < job.stageIndex ? 'done' : i === job.stageIndex ? 'current' : 'todo'
          const last = i === job.stages.length - 1
          return (
            <li key={stage.id} className="relative flex gap-4 pb-7 last:pb-0">
              {!last && (
                <span
                  className="absolute left-[11px] top-6 w-px"
                  style={{
                    bottom: 6,
                    background:
                      state === 'done'
                        ? 'color-mix(in srgb, var(--primary) 45%, transparent)'
                        : 'color-mix(in srgb, var(--secondary) 20%, transparent)',
                  }}
                />
              )}

              <span
                className="relative z-10 mt-0.5 flex h-[23px] w-[23px] shrink-0 items-center justify-center rounded-full"
                style={{
                  background: state === 'current' ? 'var(--primary-container)' : 'var(--surface-container)',
                  border:
                    state === 'todo'
                      ? '1px solid color-mix(in srgb, var(--secondary) 22%, transparent)'
                      : `1px solid ${state === 'current' ? 'var(--primary-container)' : 'color-mix(in srgb, var(--primary) 45%, transparent)'}`,
                  color: state === 'current' ? '#fff' : 'var(--primary)',
                }}
              >
                {state === 'done' && <Icon name="check" size={11} strokeWidth={3} />}
                {state === 'current' && (
                  <span
                    className="h-1.5 w-1.5 rounded-full bg-white"
                    style={{ animation: 'pulse 1.8s ease-in-out infinite' }}
                  />
                )}
              </span>

              <div className="flex-1 pt-px">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="t-caps text-[10px]"
                    style={{
                      color:
                        state === 'todo'
                          ? 'color-mix(in srgb, var(--on-surface-variant) 45%, transparent)'
                          : state === 'current'
                            ? 'var(--primary)'
                            : 'var(--on-surface)',
                    }}
                  >
                    {stage.label}
                  </span>
                  {state === 'current' && <span className="chip">IN PROGRESS</span>}
                </div>
                <p
                  className="mt-2 text-[14px] leading-relaxed"
                  style={{
                    color:
                      state === 'todo'
                        ? 'color-mix(in srgb, var(--on-surface-variant) 40%, transparent)'
                        : 'var(--on-surface-variant)',
                  }}
                >
                  {stage.note}
                </p>
              </div>
            </li>
          )
        })}
      </ol>

      <button className="btn btn-ghost mt-8 w-full py-3" onClick={onReset} type="button">
        Look up another
      </button>

      <style>{`
        @keyframes track-in{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}
        @keyframes pulse{0%,100%{opacity:1;transform:scale(1)}50%{opacity:.45;transform:scale(.75)}}
      `}</style>
    </div>
  )
}
