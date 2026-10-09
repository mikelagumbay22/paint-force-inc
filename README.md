# Northpage Premium template

A seven-page client site for the Northpage Premium package, demonstrated with Paint Force in Mississauga. React, Vite, and Tailwind.

Business facts, colours, and images live in [`src/site.config.js`](src/site.config.js). Rebrand steps are in [`TEMPLATE.md`](TEMPLATE.md).

```bash
npm install
npm run dev      # http://localhost:5173/paint-force-inc/
npm run build    # production bundle in dist/
node build-preview.mjs   # optional standalone preview.html
```

This demo sends `noindex` and shows a “Demo concept” banner. It is not the live Paint Force website. The published sample is https://mikelagumbay22.github.io/paint-force-inc/. Vite `base` is `/paint-force-inc/`, and `.github/workflows/pages.yml` deploys `dist/` on pushes to `main`.

## Pages

Home, Services, Gallery, About, Reviews, FAQ, and Contact. The nav is a real page list, not one long scroll.

The contact page has the quote form, a map for the street address on file, placeholder hours, and a “Leave us a Google review” button. The review link stays empty until a real URL is added in the config.

## What is confirmed

Kept from the existing project: the Paint Force name, phone `(416) 627-3948`, and address `6545 Cedar Rapids Crescent, Mississauga, ON`, plus the three service descriptions. Prices, hours, the wider service area, testimonials, and the photography are labelled as placeholders or illustrative. No personal email address is published.

## Motion

Page transitions, scroll reveals, desktop-only parallax, card tilt, a before/after slider, counters, and button and nav feedback. The home hero scrubs `public/hero-video/` from the cursor (scroll, then a slow ping-pong, on touch) and does not autoplay. Below it, a pinned scene in `public/scroll-scene/` wipes primer to paint. `prefers-reduced-motion: reduce` shows the hero poster and the finished room only. Motion uses opacity and transform so the layout box does not move.

## Backend

Server calls go through `src/lib/api.js`. Replace the function bodies with `fetch` and keep throwing `ApiError`. Sample tracker codes for this demo: `PF-2481`, `PF-7752`, `PF-1039`.
