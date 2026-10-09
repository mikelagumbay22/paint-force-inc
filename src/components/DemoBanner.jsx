import { site } from '../site.config'

export function DemoBanner() {
  if (!site.demo.show) return null
  return (
    <div className="demo-banner" role="note">
      <span className="t-caps text-[10px]">{site.demo.label}</span>
      <span className="hidden text-[12.5px] leading-none sm:inline">{site.demo.message}</span>
      <span className="truncate text-[12px] leading-none sm:hidden">Northpage Premium sample</span>
    </div>
  )
}
