# Paint Force — booking portal

React + Vite + Tailwind. Built from the "Precision & Velocity" design spec.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
node build-preview.mjs   # regenerates the standalone preview.html
```

## What's interactive

| Feature | Where |
| --- | --- |
| Sticky nav, scroll spy, mobile drawer, smooth scroll | `components/Nav.jsx` |
| Staggered scroll reveals, reduced-motion respected | `lib/hooks.js` + `.reveal` in `index.css` |
| Service cards with expandable detail, book prefilled | `components/Services.jsx` |
| Before/after sliders — drag, click, or arrow keys | `components/BeforeAfter.jsx` |
| 4-step booking flow with live availability | `components/BookingModal.jsx` |
| Repair status tracker | `components/TrackModal.jsx` |
| Quote form: validation, photo previews, success state | `components/QuoteForm.jsx` |
| Toasts | `components/Toast.jsx` |
| Pinned booking bar (mobile only) | `App.jsx` |

Try the tracker with `PF-2481` (mid-repair), `PF-7752` (scheduled) or `PF-1039` (finished).

## Swapping in a real backend

Every server call goes through `src/lib/api.js`. Replace the four exported
function bodies with `fetch` calls and nothing else changes — the components
already consume the exact response shapes.

```js
export async function createBooking(payload) {
  const res = await fetch('/api/bookings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  if (!res.ok) throw new ApiError(await res.text())
  return res.json()
}
```

Throw `ApiError(message, field)` on failure. The UI prints `message` verbatim
and focuses the input named by `field`, so server-side validation messages show
up in the right place without extra wiring.

Two knobs at the top of the file for testing: `LATENCY` (simulated round-trip)
and `FAILURE_RATE` — set it to `0.25` to exercise every error path.

The store is in-memory, so bookings reset on reload. That's deliberate: no
storage APIs means the same build runs anywhere.

## Design tokens

Tokens live as CSS custom properties in `src/index.css`, and
`tailwind.config.js` points at those variables. Change a hex in one place and
both the Tailwind classes and the semantic helpers (`.t-display`, `.card`,
`.btn-primary`, `.s-low`) update.

Type roles map to the spec: Montserrat for display, Inter for body, JetBrains
Mono for labels, status chips and anything technical.

The helper classes exist so the same JSX renders in `preview.html` without a
build step. `build-preview.mjs` concatenates the real component files, so the
two versions can't drift.

## Before you launch

- **Images.** `src/lib/data.js` points at the design tool's CDN, which expires
  URLs. Swap in your own photography. Failed loads fall back to a tonal panel
  rather than a broken-image icon.
- **Portfolio pairs.** Those shots are single side-by-side files, so
  `<BeforeAfter composite />` crops each half out of one image. With separate
  photos, drop the flag and pass `before` and `after` instead.
- **Copy.** Prices, hours, service area and the "next available" line in the
  hero rail are placeholders.
- **Uploaded photos** are previewed locally and counted, but not transmitted —
  wire them to your storage when you connect the API.
