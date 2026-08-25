

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

/* --- Franchise page -------------------------------------------------------- */

export const FRANCHISE_HERO_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAYrA_P43pKXA0ZwG3HaSD9Fefy1rz0UBNsXk2E4jVYruJjItNHjOEa2oU3-V_boFHsF5MVHwJQ7Vys_4c1Z4sIrj1i_FR3j5SNG3jkuc4d3qzU9gEQN6gcLR1S-KUtmYjxLD-JMBhHB7bM6sClAhhQBk-CUYht2hA1HZdknJ6fC5DLjfejPsXSRR8Rk7kuM1qcyB7s1E1kdY8kESzXvMhFB5o0I1kyG4R88WLkGVP_s5IAYwaN2WPmSQ'

export const FRANCHISE_FLEET_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuDo1vbs1JCazbF3BmaWJ11wTqFi8Umz5EJ92YVpC-DImpjNjBjoQ5MY6zCFB9PEcZmsnxETx9Idj_yiTkvnwbsGdKRmMNvPrngL-zRhhaUQEOE0PO6kuCbzmwT_OplRkt-hUcOekMD8mXNuGPLNtkOi8AG8Eaij6Ia4FVma8Eg9npJY1edgKphX50aA3uxzw8d9gZkTOTc65X6SsUNEyG24z-m2jTLbqP_kwxAWlPIYAF3NaHNOz8evGg'

export const FRANCHISE_TRAINING_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCC-_qHcAEjCeCfcN--KHb82XpZn3Dz56MbxRCuLCteo7FLM9P3KFZGYkk5JPIa3sJbRB0SePFxoNroUdrAeYmSjV1ElLpKxgkljohZ0sUIl6y14QNMOj5VQ9flTA0PyJHMVowVoNmTVSXET1e7vTxS8TJ6R4nGZnDaEBCKh6yeEdGZyMG4DjojeM5MVVcCDE2M3XHU0CI1aSIys9hd5XA6w0ov0XIKpuFEwX0sVXuuVMfxOM60vIO1sQ'

export const FRANCHISE_FACTS = [
  { k: 'TERRITORY', v: 'EXCLUSIVE BY POSTAL CODE' },
  { k: 'CERTIFICATION', v: '4-WEEK PROGRAM' },
  { k: 'TECH STACK', v: 'DISPATCH, CRM & LIVE TRACKING' },
  { k: 'SUPPORT', v: 'FIELD OPS LEAD FROM DAY ONE' },
]

export const FRANCHISE_ADVANTAGES = [
  {
    icon: 'pin',
    title: 'Exclusive territory',
    body: 'Mapped by postal code before you sign, so you never compete with the operator next door — or with us.',
  },
  {
    icon: 'car',
    title: 'A proven mobile format',
    body: 'The same fitted van spec, tool list and two-hour job envelope already running daily across the western GTA.',
  },
  {
    icon: 'shield',
    title: 'One quality bar',
    body: 'Every job is VIN-matched and photo-reviewed against the same standard, regardless of whose name is on the van.',
  },
]

export const FRANCHISE_SUPPORT = [
  {
    icon: 'clock',
    title: 'Master technician certification',
    body: 'A 4-week hands-on program in VIN colour matching, clear-coat correction and plastic welding, taught by the technicians training new hires today.',
  },
  {
    icon: 'calendar',
    title: 'Dispatch, CRM & live tracking',
    body: 'The exact booking, scheduling and repair-tracking system customers use on paintforce.ca, licensed with your territory — nothing to build.',
  },
  {
    icon: 'search',
    title: 'Local lead generation',
    body: 'Paid search, review management and the quote-request flow already converting for the flagship territory, redirected to your market.',
  },
]

export const TERRITORIES = [
  { name: 'Mississauga, ON', status: 'active', note: 'Flagship territory, operating since 2024' },
  { name: 'Oakville, ON', status: 'active', note: 'Served from the Mississauga hub' },
  { name: 'Etobicoke, ON', status: 'active', note: 'Served from the Mississauga hub' },
  { name: 'Brampton, ON', status: 'opening', note: 'Territory mapping underway' },
  { name: 'Vaughan, ON', status: 'opening', note: 'Territory mapping underway' },
  { name: 'Rest of the GTA', status: 'available', note: 'Open for inquiry' },
  { name: 'Rest of Ontario', status: 'available', note: 'Open for inquiry' },
]

export const TERRITORY_OPTIONS = [
  'Mississauga, ON',
  'Oakville, ON',
  'Etobicoke, ON',
  'Brampton, ON',
  'Vaughan, ON',
  'Elsewhere in the GTA',
  'Elsewhere in Ontario',
]
