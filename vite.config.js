import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { site, theme } from './src/site.config.js'

/** Brand colours and header offsets are injected from site.config.js so the
 *  first paint matches the config without a second copy of the hex values. */
function brandTheme() {
  const banner = site.demo.show ? '34px' : '0px'
  const lines = Object.entries(theme).map(([key, value]) => `${key}:${value}`)
  lines.push(`--banner-h:${banner}`, '--nav-h:68px', '--header-h:calc(var(--banner-h) + var(--nav-h))')
  const css = `:root{${lines.join(';')}}`
  return {
    name: 'brand-theme',
    transform(code, id) {
      const file = id.split('?')[0].replace(/\\/g, '/')
      if (!file.endsWith('/src/index.css')) return null
      // Appended, not prepended: the Google font @import contains semicolons,
      // and an unlayered :root at the end still overrides the layered fallbacks.
      return { code: `${code}\n${css}\n`, map: null }
    },
    transformIndexHtml(html) {
      return html.replace(
        /name="theme-color" content="[^"]*"/,
        `name="theme-color" content="${theme['--background']}"`
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), brandTheme()],
})
