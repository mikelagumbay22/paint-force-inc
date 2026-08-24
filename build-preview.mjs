/**
 * Bundles the app into one self-contained HTML file for previewing without a
 * build step. Run: node build-preview.mjs
 *
 * The component source is reused verbatim — imports are stripped and the
 * modules are concatenated in dependency order — so the preview and the Vite
 * app can't drift apart.
 */
import { readFileSync, writeFileSync } from 'node:fs'

const ORDER = [
  'src/lib/data.js',
  'src/lib/api.js',
  'src/lib/hooks.js',
  'src/components/Icon.jsx',
  'src/components/SmartImage.jsx',
  'src/components/Toast.jsx',
  'src/components/Modal.jsx',
  'src/components/BeforeAfter.jsx',
  'src/components/SectionHead.jsx',
  'src/components/Nav.jsx',
  'src/components/Hero.jsx',
  'src/components/Services.jsx',
  'src/components/Process.jsx',
  'src/components/Portfolio.jsx',
  'src/components/Reviews.jsx',
  'src/components/CTA.jsx',
  'src/components/QuoteForm.jsx',
  'src/components/BookingModal.jsx',
  'src/components/TrackModal.jsx',
  'src/components/Footer.jsx',
  'src/App.jsx',
]

const strip = (code) =>
  code
    .replace(/^import[\s\S]*?from\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    .replace(/^import\s+['"][^'"]+['"]\s*;?\s*$/gm, '')
    .replace(/^export\s+default\s+function/gm, 'function')
    .replace(/^export\s+/gm, '')
    .trim()

const js = ORDER.map((f) => `/* ===== ${f} ===== */\n${strip(readFileSync(f, 'utf8'))}`).join('\n\n')

// Reuse the token stylesheet, minus the Tailwind directives and layer wrappers
// (there is no build step here, so plain CSS is what's needed).
let css = readFileSync('src/index.css', 'utf8')
  .replace(/@import[^;]+;/g, '')
  .replace(/@tailwind [a-z]+;/g, '')

/** Removes `@layer name { ... }` wrappers by matching braces, keeping the body. */
function unwrapLayers(input) {
  const open = /@layer\s+[\w\s,]+\{/
  let out = input
  let hit
  while ((hit = open.exec(out))) {
    const start = hit.index
    const bodyStart = start + hit[0].length
    let depth = 1
    let i = bodyStart
    while (i < out.length && depth > 0) {
      if (out[i] === '{') depth++
      else if (out[i] === '}') depth--
      i++
    }
    // i now sits one past the layer's closing brace
    out = out.slice(0, start) + out.slice(bodyStart, i - 1) + out.slice(i)
  }
  return out
}

css = unwrapLayers(css)

const tailwindConfig = `
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: 'var(--background)', surface: 'var(--surface)',
        'surface-lowest': 'var(--surface-container-lowest)',
        'surface-low': 'var(--surface-container-low)',
        'surface-container': 'var(--surface-container)',
        'surface-high': 'var(--surface-container-high)',
        'surface-highest': 'var(--surface-container-highest)',
        'on-surface': 'var(--on-surface)', 'on-surface-variant': 'var(--on-surface-variant)',
        primary: 'var(--primary)', 'primary-container': 'var(--primary-container)',
        secondary: 'var(--secondary)', outline: 'var(--outline)',
        'outline-variant': 'var(--outline-variant)', error: 'var(--error)',
      },
      fontFamily: {
        display: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      borderRadius: { DEFAULT: '4px', sm: '2px', md: '6px', lg: '8px', xl: '12px' },
      spacing: { gutter: '24px', section: '80px' },
      maxWidth: { container: '1280px' },
    },
  },
}`

const html = `<!doctype html>
<html class="dark" lang="en">
<head>
<meta charset="utf-8">
<meta content="width=device-width, initial-scale=1.0" name="viewport">
<title>Paint Force — Mobile paint &amp; scratch repair</title>
<link href="https://fonts.googleapis.com" rel="preconnect">
<link crossorigin href="https://fonts.gstatic.com" rel="preconnect">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&family=Montserrat:wght@600;700;800;900&display=swap" rel="stylesheet">

<!-- Token stylesheet loads first so Tailwind's utilities win on equal specificity -->
<style>
${css}
</style>

<script src="https://cdn.tailwindcss.com"></script>
<script>${tailwindConfig}</script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.3.1/umd/react.production.min.js"></script>
<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.3.1/umd/react-dom.production.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/babel-standalone/7.26.4/babel.min.js"></script>
</head>
<body>
<div id="root"></div>
<script type="text/babel" data-type="module">
const { useState, useEffect, useRef, useMemo, useCallback, createContext, useContext } = React

${js}

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
</script>
</body>
</html>
`

writeFileSync('preview.html', html)
console.log(`preview.html written — ${(html.length / 1024).toFixed(0)} kB`)
