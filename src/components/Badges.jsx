export function Placeholder({ children = 'Placeholder' }) {
  return <span className="chip badge-placeholder">{children}</span>
}

export function Illustrative({ className = '' }) {
  return <span className={`chip badge-illustrative ${className}`}>Illustrative</span>
}
