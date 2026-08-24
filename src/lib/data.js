

export const HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3ndOaeU9PS4l-7uTTilPy3mIBektPOxZQ_wGrl0l14xsdNKsZKyoV_Uli9o_Ww4eDJBRKy0Zm2yQ5uFSyKCrgUcuoCzDYc0FTmFg33OZz5DryEW5fTLx800R6MwqqnOWzoQc2JNwfgfPwFrRcK43fYLBYLRxOViWbTawlH7JfUSgkY0TjoVgL8bd-8lj1uhamsfTtarvGfxeLaaXAvxtlKquGBBR2hizHR7BFjTIPvO3gKVF7GOqKA'

export const LOGO = '/logo.png'

export const SERVICES = [
  {
    id: 'scratch',
    icon: 'wand',
    name: 'Scratch removal',
    est: '1–2 HRS',
    price: 'from $189',
    blurb:
      'Clear-coat correction with graded micro-abrasives. Removes the scratch instead of filling it, so the panel keeps its factory depth.',
    detail: [
      'Depth-tested with a paint gauge before any cutting',
      'Machine polish through 3 abrasive grades',
      'Sealed with a ceramic-infused protectant',
    ],
  },
  {
    id: 'touchup',
    icon: 'paint',
    name: 'Paint touch-up',
    est: '2–3 HRS',
    price: 'from $240',
    blurb:
      'Rock chips and scuffs filled with paint mixed to your VIN code, then levelled flush so the repair disappears at arm’s length.',
    detail: [
      'Colour matched to your VIN, not a chart',
      'Spectrophotometer check under three light temperatures',
      'Blended into adjacent panels to hide the edge',
    ],
  },
  {
    id: 'bumper',
    icon: 'car',
    name: 'Bumper repair',
    est: '3–4 HRS',
    price: 'from $420',
    blurb:
      'Plastic welding and localised refinishing for cracks, scuffs and parking-lot damage. No dealership queue, no replacement part.',
    detail: [
      'Nitrogen plastic welding on cracks and tabs',
      'Contour rebuilt with flexible filler',
      'Refinished and clear-coated on site',
    ],
  },
]

export const PROCESS = [
  {
    n: '01',
    title: 'Send photos',
    body: 'Upload shots of the damage. A technician reads them and returns a fixed price, not a range.',
    meta: 'AVG. REPLY 2 HRS',
  },
  {
    n: '02',
    title: 'Pick a window',
    body: 'Choose a two-hour slot at your home or office. The mobile unit arrives with power, water and paint on board.',
    meta: '7 DAYS A WEEK',
  },
  {
    n: '03',
    title: 'Drive it away',
    body: 'Work finishes in your driveway. No courtesy car, no shop visit, no week without your vehicle.',
    meta: 'SAME-DAY FINISH',
  },
]

/**
 * Portfolio pieces.
 *
 * `composite: true` means the source file is a single side-by-side image with
 * the damaged state on the left and the finished state on the right — the
 * before/after panel crops each half rather than needing two files. When you
 * have separate photographs, drop the flag and pass `before` and `after`.
 */
export const PORTFOLIO = [
  {
    id: 'p1',
    tag: 'DEEP SCRATCH',
    vehicle: 'Audi A4 · door skin',
    duration: '2 HRS ON SITE',
    composite: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6EmPRaaiEllJgETUo4QTqaXZpm081_dTyUMOfqZIm752n_-6ukNaxSYbuvphdElS1bTuwFx7f8ofugEW8GDHYbGeUW47gLunndpF0nduFn150zel9QO-_vkgFQRIZwgaswQxPEbm6ZtS3VQnPb0C0ljPiXqAvY2KVGlj54-3babvo0K0d3yM6pqrtUhvProfh2ZFAOpb5XrA8MWQyjnOq4EGctgYwQBteCul3oNTWgcEqEOCeueqSOw',
    quote:
      'The scratch is completely gone. I didn’t think they could fix it without repainting the whole panel.',
    author: 'Mark R.',
    initials: 'MR',
  },
  {
    id: 'p2',
    tag: 'PAINT CORRECTION',
    vehicle: 'BMW M340i · hood',
    duration: '3 HRS ON SITE',
    composite: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpro0bVHx0-oxJRmYR_8rKGeYaIkhbhX8uhv_lb7CLY3q9AKYzrlMYPvKCAHLBuyO4KnmEu9rGgGiJN0StmzaX693OPGQZ7pzFhvgcdmT2LIh6e2C6FHbDNb4LzyeLJOzKXRLMUeU5HVJ5Mzu99kVqH_PtHO_dNQOWYcPMPi8MgY82TLidJENx1NcxaQuWwNjIxbz5z5P57kL2OIm3LH-FLyr9SSjn5NqIDiFKI0L8Nf-9lZXy6rw3Tg',
    quote:
      'Looks better than the day I drove it off the lot, and it happened in my own garage.',
    author: 'Sarah L.',
    initials: 'SL',
  },
  {
    id: 'p3',
    tag: 'BUMPER REPAIR',
    vehicle: 'Mercedes C300 · rear bumper',
    duration: '4 HRS ON SITE',
    composite: true,
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcoRWCGLFjbwu_YvUitW3mv5AodyEv6rUWghPA4n5pQ_ezM_t0EBBUO43XYI17IuJJn7K_ZQm6iAB3xr1IWAE21ELpbYPlDTVzaBVZdHUdzrKuZMPYTFL6uBoLJ8mE7ZzKbV_-mbLeuYQ2oncBu3eFiP86OTfD6nLWzGdh6UMPtfXm7hapTnsAjBo_c_619TahB5WcjSCeZOGoA8BijcZ8R4uGPPTELqqA0TBIHgCCjdwAHmsKOmMWpg',
    quote:
      'Hundreds less than the body shop quote and done in an afternoon. Highly professional tech.',
    author: 'David T.',
    initials: 'DT',
  },
]

export const REVIEWS = [
  {
    quote:
      'Incredible service. They fixed a deep scratch on my Tesla right in my driveway. The colour match is flawless and it saved me days without the car.',
    author: 'Michael T.',
    location: 'MISSISSAUGA, ON',
    vehicle: 'TESLA MODEL 3',
  },
  {
    quote:
      'Professional from start to finish. The tech was meticulous and treated my Porsche with real care. The bumper looks brand new.',
    author: 'Sarah J.',
    location: 'OAKVILLE, ON',
    vehicle: 'PORSCHE MACAN',
  },
]

export const NAV_LINKS = [
  { href: '#services', label: 'Services' },
  { href: '#process', label: 'Process' },
  { href: '#work', label: 'Work' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#quote', label: 'Quote' },
]

export const PHONE = '(416) 627-3948'
export const PHONE_HREF = 'tel:4166273948'
export const ADDRESS = '6545 Cedar Rapids Crescent, Mississauga, ON'
