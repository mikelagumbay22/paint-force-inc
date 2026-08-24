import { SmartImage } from './SmartImage'


export function BeforeAfter({ before, after, src, composite = false, alt = '', className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {composite ? (
        <SmartImage alt={alt} className="h-full w-full object-cover" label="BEFORE / AFTER" src={src} />
      ) : (
        <div className="flex h-full w-full">
          <div className="h-full w-1/2 overflow-hidden">
            <SmartImage alt={`${alt} before repair`} className="h-full w-full object-cover" label="BEFORE" src={before} />
          </div>
          <div className="h-full w-1/2 overflow-hidden">
            <SmartImage alt={`${alt} after repair`} className="h-full w-full object-cover" label="AFTER" src={after} />
          </div>
        </div>
      )}

      <span
        className="t-caps pointer-events-none absolute left-3 top-3 rounded-sm px-2 py-1 text-[20px]"
        style={{ background: 'rgba(11,15,18,.72)', color: 'var(--on-surface)', backdropFilter: 'blur(4px)' }}
      >
        Before
      </span>
      <span
        className="t-caps pointer-events-none absolute right-3 top-3 rounded-sm px-2 py-1 text-[20px]"
        style={{ background: 'rgba(11,15,18,.72)', color: 'var(--primary)', backdropFilter: 'blur(4px)' }}
      >
        After
      </span>
    </div>
  )
}
