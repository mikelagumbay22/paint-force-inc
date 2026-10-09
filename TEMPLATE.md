# Rebrand this Premium template

This repo is the starting point for a Northpage Premium client site. Business-specific content lives in one file:

`src/site.config.js`

Change that file, then run the site. You should not have to hunt through components for the name, phone, hours, services, colours, or image URLs.

## 1. Business facts

In `site.business`, set:

- `name`, `phone`, `phoneHref` (`tel:` plus digits)
- `street`, `city`, `region`, `country`, `address`
- `logo` (path under `public/`, usually `/logo.png`) and `logoAlt`
- `tagline`, `summary`, `warranty`
- `googleReviewUrl` — the real “write a review” link. Leave it as `''` until you have it. Do not invent a Google URL, and do not publish a personal email address anywhere in the config or the pages.

Replace `hours.rows` with confirmed hours and set `hours.placeholder` to `false`. Update `hours.note` so it no longer says the hours are unconfirmed.

Set `serviceArea.confirmed` to the cities you can actually name. Set `serviceArea.placeholder` to `false` once that list is real, and rewrite `serviceArea.note`.

## 2. Services, gallery, reviews, FAQ

- `services` — name, blurb, detail lines, time estimate, and price. Set `pricePlaceholder` to `false` only when the price is approved.
- `process` — the three steps on the About page.
- `portfolio` — before/after photos. Use a single side-by-side image (`left = before`, `right = after`) and set `illustrative` to `false` when the photo is the client’s own work. Drop the “Sample caption” treatment in `src/pages/GalleryPage.jsx` once the quotes are real.
- `reviews` — replace the sample quotes. Set `reviews.placeholder` to `false` and rewrite `reviews.note` when they are reviews you have permission to publish. Do not add a star rating or review count you have not verified.
- `faq` — rewrite answers so they only state confirmed facts.
- `seo` — one title and description per page. Mention the city and the real services. Keep claims limited to what the client approved.
- `counters` — only numbers you can stand behind. The demo counts services, the stated visit window, and the number of sample panels.

`sampleJobs` in the config matches the in-memory tracker in `src/lib/api.js`. Replace those records when a real backend is connected.

## 3. Colours

Edit the `theme` object in `src/site.config.js`. Keys are the CSS variables the layout already uses (`--background`, `--primary`, `--primary-container`, and the rest).

Vite injects them into the stylesheet, and `npm run build` plus `node build-preview.mjs` both read the same object. You do not copy hex values into `src/index.css`.

A useful pair:

- `--primary-container` — buttons and the demo banner
- `--on-primary-container` — text on those buttons and the banner
- `--background` / `--on-surface` — page and body text

The browser theme colour in `index.html` is updated from `--background` during dev and build.

Fonts stay in `src/index.css` (`--font-display`, `--font-body`, `--font-mono`).

## 4. Logo and photos

- Put the logo at `public/logo.png` (or change `business.logo`).
- Hero and gallery URLs are `heroImage.src` and `portfolio[].src`.
- While a photo is stock or generated, leave `illustrative: true`. The site badges it “Illustrative”.
- The About page has a slot that explains where the logo and job photos go.

Failed image URLs fall back to a plain panel instead of a broken icon.

## 5. Pages

The nav is `site.pages`. Premium is up to seven pages. The demo uses:

| Path | Role |
| --- | --- |
| `/` | Home |
| `/services` | Price list |
| `/gallery` | Before/after work |
| `/about` | Process, address, logo and photo slot |
| `/reviews` | Testimonials and the Google review button |
| `/faq` | Questions |
| `/contact` | Quote form, map, hours |

Add or rename a page by editing `site.pages`, creating a component under `src/pages/`, and registering it in `ROUTES` inside `src/App.jsx`. Keep the count at seven or fewer for a Premium build.

## 6. Turn off the demo

When the site is ready to publish:

1. Set `demo.show` to `false` in `src/site.config.js`. That removes the “Demo concept” banner and the Northpage footer line. Header spacing follows the same flag.
2. Remove the robots tag from `index.html`:

```html
<meta content="noindex, nofollow" name="robots" />
```

3. Re-read every `placeholder: true` and `illustrative: true` flag. Publish only confirmed hours, prices, service area, reviews, and photography.

Do not enable GitHub Pages from this template unless the client has asked for that hosting.

## 7. Preview

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production bundle in dist/
node build-preview.mjs   # optional single-file preview.html
```

The quote form and booking flow talk to `src/lib/api.js`. Swap those function bodies for real `fetch` calls when a backend exists. The UI already handles `ApiError`.
