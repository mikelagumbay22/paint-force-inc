/**
 * Inline SVG icons. The original export pulled Material Symbols over the
 * network, which flashes unstyled ligature text on slow connections; these
 * ship with the bundle instead.
 */

const paths = {
  wand: (
    <>
      <path d="M5 21 21 5" />
      <path d="m14.5 5.5 4 4" />
      <path d="M6 3v4M4 5h4M17 15v3M15.5 16.5h3" />
    </>
  ),
  paint: (
    <>
      <rect height="8" rx="1.5" width="14" x="4" y="3" />
      <path d="M11 11v3a2 2 0 0 0 2 2h4a2 2 0 0 1 2 2v3" />
      <rect height="5" rx="1" width="5" x="8.5" y="16" />
    </>
  ),
  car: (
    <>
      <path d="M4 16v3M20 16v3" />
      <path d="M3 16v-3.2a2 2 0 0 1 .3-1l1.9-3A2 2 0 0 1 6.9 8h10.2a2 2 0 0 1 1.7.9l1.9 3a2 2 0 0 1 .3 1V16z" />
      <path d="M6.5 13h2M15.5 13h2" />
    </>
  ),
  arrowRight: (
    <>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </>
  ),
  arrowLeft: (
    <>
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </>
  ),
  chevronRight: <path d="m9 6 6 6-6 6" />,
  chevronLeft: <path d="m15 6-6 6 6 6" />,
  check: <path d="m4 12.5 5 5L20 6.5" />,
  close: (
    <>
      <path d="M6 6 18 18" />
      <path d="M18 6 6 18" />
    </>
  ),
  menu: (
    <>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </>
  ),
  phone: (
    <path d="M15.5 21A12.5 12.5 0 0 1 3 8.5 2.5 2.5 0 0 1 5.5 6h1.6a1 1 0 0 1 1 .8l.6 2.6a1 1 0 0 1-.5 1.1l-1.3.7a10 10 0 0 0 4.9 4.9l.7-1.3a1 1 0 0 1 1.1-.5l2.6.6a1 1 0 0 1 .8 1v1.6A2.5 2.5 0 0 1 15.5 21z" />
  ),
  upload: (
    <>
      <path d="M12 16V4" />
      <path d="m7.5 8.5 4.5-4.5 4.5 4.5" />
      <path d="M4 15v3a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-3" />
    </>
  ),
  send: (
    <>
      <path d="M21 3 10.5 13.5" />
      <path d="M21 3 14.5 21l-4-8-8-4z" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5.2l3 1.8" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s7-5.7 7-11a7 7 0 1 0-14 0c0 5.3 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m16.5 16.5 4 4" />
    </>
  ),
  calendar: (
    <>
      <rect height="16" rx="2" width="18" x="3" y="5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v5.5c0 4.3 3 8.2 7 9.5 4-1.3 7-5.2 7-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sliders: (
    <>
      <path d="M12 3v18" />
      <path d="M7 8 3 12l4 4M17 8l4 4-4 4" />
    </>
  ),
}

export function Icon({ name, size = 20, className = '', strokeWidth = 1.6, ...rest }) {
  const d = paths[name]
  if (!d) return null
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      height={size}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={strokeWidth}
      viewBox="0 0 24 24"
      width={size}
      {...rest}
    >
      {d}
    </svg>
  )
}

export function Stars({ count = 5, size = 14, className = '' }) {
  return (
    <span aria-label={`${count} out of 5 stars`} className={`inline-flex gap-[3px] ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} aria-hidden="true" fill="currentColor" height={size} viewBox="0 0 24 24" width={size}>
          <path d="m12 3 2.6 5.6 6.1.8-4.5 4.2 1.2 6-5.4-3-5.4 3 1.2-6L3.3 9.4l6.1-.8z" />
        </svg>
      ))}
    </span>
  )
}

export function Spinner({ size = 16, className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      height={size}
      style={{ animation: 'spin 700ms linear infinite' }}
      viewBox="0 0 24 24"
      width={size}
    >
      <circle cx="12" cy="12" fill="none" opacity="0.25" r="9" stroke="currentColor" strokeWidth="2.5" />
      <path
        d="M21 12a9 9 0 0 0-9-9"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2.5"
      />
      <style>{'@keyframes spin{to{transform:rotate(360deg)}}'}</style>
    </svg>
  )
}
