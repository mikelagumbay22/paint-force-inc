/**
 * Northpage Premium template — the only file you edit to rebrand a client site.
 * Colours, name, phone, hours, services, copy, and images all live here.
 * See TEMPLATE.md.
 *
 * Facts below are only what this repo already stated for Paint Force.
 * Anything unconfirmed is flagged `placeholder: true` or `illustrative: true`.
 * Do not add a personal email address.
 */

export const theme = {
  '--background': '#101417',
  '--surface': '#101417',
  '--surface-dim': '#101417',
  '--surface-bright': '#36393e',
  '--surface-container-lowest': '#0b0f12',
  '--surface-container-low': '#181c20',
  '--surface-container': '#1c2024',
  '--surface-container-high': '#272a2e',
  '--surface-container-highest': '#323539',
  '--surface-variant': '#323539',
  '--on-surface': '#e0e2e8',
  '--on-surface-variant': '#e7bdb2',
  '--primary': '#ffb5a0',
  '--on-primary': '#601400',
  '--primary-container': '#ff5625',
  '--on-primary-container': '#541100',
  '--primary-fixed': '#ffdbd1',
  '--inverse-primary': '#b12d00',
  '--secondary': '#c1c7cf',
  '--tertiary': '#c8c6c5',
  '--outline': '#ad887e',
  '--outline-variant': '#5d4038',
  '--error': '#ffb4ab',
  '--error-container': '#93000a',
  '--on-error-container': '#ffdad6',
}

export const site = {
  /** Set `show` to false and remove the robots meta when a real client site launches. */
  demo: {
    show: true,
    label: 'Demo concept',
    message: 'Northpage Premium sample. Not the live Paint Force website.',
  },

  studio: {
    name: 'Northpage',
    package: 'Premium',
  },

  business: {
    name: 'Paint Force',
    phone: '(416) 627-3948',
    phoneHref: 'tel:4166273948',
    street: '6545 Cedar Rapids Crescent',
    city: 'Mississauga',
    region: 'ON',
    country: 'CA',
    address: '6545 Cedar Rapids Crescent, Mississauga, ON',
    logo: '/logo.png',
    logoAlt: 'Paint Force',
    /** Leave empty until the client supplies a Google review link. Never invent one. */
    googleReviewUrl: '',
    warranty: 'Lifetime workmanship warranty',
    tagline: 'Showroom finish, in your driveway.',
    summary:
      'Paint Force is a mobile paint and scratch repair service based at 6545 Cedar Rapids Crescent, Mississauga, Ontario. Scratch removal, paint touch-up, and bumper repair are finished on site.',
  },

  /**
   * Hours were marked as placeholders in the previous draft.
   * They are shown so the layout is real, and badged so they are not read as confirmed.
   */
  hours: {
    placeholder: true,
    note: 'Placeholder hours from the previous draft. Confirm them before launch.',
    rows: [
      ['Monday – Friday', '07:00 – 18:00'],
      ['Saturday', '08:00 – 16:00'],
      ['Sunday', 'Closed'],
    ],
  },

  /** Cities beyond the street address were not confirmed. */
  serviceArea: {
    placeholder: true,
    confirmed: 'Mississauga, ON',
    note: 'Wider service area was a placeholder on the previous draft. Confirm the cities you cover before publishing a list.',
  },

  heroImage: {
    src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAQ3ndOaeU9PS4l-7uTTilPy3mIBektPOxZQ_wGrl0l14xsdNKsZKyoV_Uli9o_Ww4eDJBRKy0Zm2yQ5uFSyKCrgUcuoCzDYc0FTmFg33OZz5DryEW5fTLx800R6MwqqnOWzoQc2JNwfgfPwFrRcK43fYLBYLRxOViWbTawlH7JfUSgkY0TjoVgL8bd-8lj1uhamsfTtarvGfxeLaaXAvxtlKquGBBR2hizHR7BFjTIPvO3gKVF7GOqKA',
    alt: 'Illustrative photo of a panel being machine-polished under controlled lighting',
    illustrative: true,
  },

  /** Counts derived from content on this site, not from unverified business stats. */
  counters: [
    { value: 3, label: 'Services listed', note: 'Scratch, touch-up, bumper' },
    { value: 2, label: 'Hour visit windows', note: 'As described on this site' },
    { value: 3, label: 'Sample panels', note: 'Illustrative gallery' },
  ],

  services: [
    {
      id: 'scratch',
      icon: 'wand',
      name: 'Scratch removal',
      est: '1–2 HRS',
      price: 'from $189',
      pricePlaceholder: true,
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
      pricePlaceholder: true,
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
      pricePlaceholder: true,
      blurb:
        'Plastic welding and localised refinishing for cracks, scuffs and parking-lot damage. No dealership queue, no replacement part.',
      detail: [
        'Nitrogen plastic welding on cracks and tabs',
        'Contour rebuilt with flexible filler',
        'Refinished and clear-coated on site',
      ],
    },
  ],

  process: [
    {
      n: '01',
      title: 'Send photos',
      body: 'Upload shots of the damage. A technician reads them and returns a fixed price, not a range.',
      meta: 'STATED REPLY ABOUT 2 HRS',
    },
    {
      n: '02',
      title: 'Pick a window',
      body: 'Choose a two-hour slot at your home or office. The mobile unit arrives with power, water and paint on board.',
      meta: 'TWO-HOUR WINDOWS',
    },
    {
      n: '03',
      title: 'Drive it away',
      body: 'Work finishes in your driveway. No courtesy car, no shop visit, no week without your vehicle.',
      meta: 'SAME-DAY FINISH',
    },
  ],

  portfolio: [
    {
      id: 'p1',
      tag: 'DEEP SCRATCH',
      vehicle: 'Audi A4 · door skin',
      duration: '2 HRS ON SITE',
      composite: true,
      illustrative: true,
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
      illustrative: true,
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpro0bVHx0-oxJRmYR_8rKGeYaIkhbhX8uhv_lb7CLY3q9AKYzrlMYPvKCAHLBuyO4KnmEu9rGgGiJN0StmzaX693OPGQZ7pzFhvgcdmT2LIh6e2C6FHbDNb4LzyeLJOzKXRLMUeU5HVJ5Mzu99kVqH_PtHO_dNQOWYcPMPi8MgY82TLidJENx1NcxaQuWwNjIxbz5z5P57kL2OIm3LH-FLyr9SSjn5NqIDiFKI0L8Nf-9lZXy6rw3Tg',
      quote: 'Looks better than the day I drove it off the lot, and it happened in my own garage.',
      author: 'Sarah L.',
      initials: 'SL',
    },
    {
      id: 'p3',
      tag: 'BUMPER REPAIR',
      vehicle: 'Mercedes C300 · rear bumper',
      duration: '4 HRS ON SITE',
      composite: true,
      illustrative: true,
      src: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDcoRWCGLFjbwu_YvUitW3mv5AodyEv6rUWghPA4n5pQ_ezM_t0EBBUO43XYI17IuJJn7K_ZQm6iAB3xr1IWAE21ELpbYPlDTVzaBVZdHUdzrKuZMPYTFL6uBoLJ8mE7ZzKbV_-mbLeuYQ2oncBu3eFiP86OTfD6nLWzGdh6UMPtfXm7hapTnsAjBo_c_619TahB5WcjSCeZOGoA8BijcZ8R4uGPPTELqqA0TBIHgCCjdwAHmsKOmMWpg',
      quote: 'Hundreds less than the body shop quote and done in an afternoon. Highly professional tech.',
      author: 'David T.',
      initials: 'DT',
    },
  ],

  reviews: {
    placeholder: true,
    note: 'Sample testimonials kept from the previous draft. They are not confirmed Google reviews. Replace them before launch.',
    items: [
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
    ],
  },

  faq: [
    {
      q: 'Do you come to the car?',
      a: 'Yes. Paint Force works from a mobile unit at your home or office in Mississauga, so the car stays in the driveway.',
    },
    {
      q: 'What do you repair?',
      a: 'Three services are listed: scratch removal, paint touch-up matched to the VIN, and bumper repair with plastic welding and local refinishing.',
    },
    {
      q: 'How do I get a price?',
      a: 'Send photos through the quote form. The previous draft said a technician returns a fixed price, usually within about two hours. Nothing is charged to send the request.',
    },
    {
      q: 'Where are you based?',
      a: '6545 Cedar Rapids Crescent, Mississauga, ON. Call (416) 627-3948.',
    },
    {
      q: 'What are your hours?',
      a: 'The hours on the contact page are placeholders from the previous draft (Monday to Friday 07:00–18:00, Saturday 08:00–16:00, Sunday closed). Confirm them before launch.',
    },
    {
      q: 'Which cities do you cover?',
      a: 'The confirmed address is in Mississauga. A wider service area was listed as a placeholder before and is not published here until it is confirmed.',
    },
    {
      q: 'How do I leave a Google review?',
      a: 'Use the “Leave us a Google review” button. The link is a placeholder until the real Google review URL is added in site.config.js.',
    },
    {
      q: 'How do I track a repair?',
      a: 'Open Track repair and enter the reference from your confirmation. This demo includes sample jobs PF-2481, PF-7752, and PF-1039 so the tracker can be tried. They are not live customer records.',
    },
  ],

  /** Sample tracker codes already shipped with this demo. */
  sampleJobs: ['PF-2481', 'PF-7752', 'PF-1039'],

  pages: [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/gallery', label: 'Gallery' },
    { path: '/about', label: 'About' },
    { path: '/reviews', label: 'Reviews' },
    { path: '/faq', label: 'FAQ' },
    { path: '/contact', label: 'Contact' },
  ],

  seo: {
    home: {
      title: 'Paint Force — Mobile paint and scratch repair in Mississauga',
      description:
        'Paint Force offers mobile scratch removal, paint touch-up, and bumper repair in Mississauga, Ontario. Request a quote or call (416) 627-3948. 6545 Cedar Rapids Crescent.',
    },
    services: {
      title: 'Scratch, touch-up, and bumper repair | Paint Force, Mississauga',
      description:
        'Price list for Paint Force in Mississauga: scratch removal, VIN-matched paint touch-up, and bumper repair. Prices shown are placeholders until confirmed.',
    },
    gallery: {
      title: 'Paint repair gallery | Paint Force, Mississauga',
      description:
        'Before-and-after paint repair examples for Paint Force in Mississauga. Photos are illustrative stand-ins until the studio’s own photography is added.',
    },
    about: {
      title: 'About Paint Force | Mobile paint repair in Mississauga',
      description:
        'Paint Force finishes paint and scratch repair on site from 6545 Cedar Rapids Crescent, Mississauga. See how a visit is booked and what to confirm before launch.',
    },
    reviews: {
      title: 'Reviews | Paint Force, Mississauga',
      description:
        'Sample testimonials for the Paint Force demo, plus a placeholder button for a Google review link. Replace the samples with reviews you have permission to publish.',
    },
    faq: {
      title: 'FAQ | Paint Force mobile paint repair, Mississauga',
      description:
        'Answers about Paint Force mobile scratch removal, paint touch-up, and bumper repair in Mississauga, including the quote form, hours placeholder, and repair tracker.',
    },
    contact: {
      title: 'Quote, map, and hours | Paint Force, Mississauga',
      description:
        'Request a Paint Force quote in Mississauga, see the map for 6545 Cedar Rapids Crescent, and review placeholder hours. Call (416) 627-3948.',
    },
  },
}
