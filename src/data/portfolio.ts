export const profile = {
  name: 'Naufal Sani',
  role: 'Software Engineer',
  location: 'Jakarta, Indonesia',
  current: 'Shopee',
  past: ['EY', 'Samsung', 'Traveloka'],
  tagline:
    'Building software where business and engineering meet — products that work, and matter.',
  intro:
    'I work best where business and engineering meet, turning messy problems into products ' +
    'people actually rely on. I care about the craft behind the screen: clean, scalable code ' +
    'and the small details that make software feel effortless. Curiosity keeps me learning, ' +
    'and shipping things that matter keeps me going.',
  aiming: [
    'Software that empowers people and the businesses they run',
    'Helping others reach their goals through what I build',
  ],
  closing: "Let's connect and build something that matters.",
  email: 'naufal.sani2001@gmail.com',
  resumeUrl: '/Resume.pdf',
  portrait: '/portrait.jpg',
  socials: [
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/naufal-sani' },
    { label: 'Email', href: 'mailto:naufal.sani2001@gmail.com' },
  ],
}

export type Experience = {
  company: string
  href: string
  role: string
  period: string
  summary: string
  stack: string[]
}

export const experiences: Experience[] = [
  {
    company: 'Shopee (SEA Limited)',
    href: 'https://shopee.com',
    role: 'Software Engineer (Web)',
    period: 'Feb 2025 — Present',
    summary:
      "Builds and maintains the Notification module on Shopee's customer-facing web " +
      'platform and its internal tooling, with AI agents turning dense specs into ' +
      'ship-ready documentation in record time.',
    stack: ['ReactJS', 'TypeScript', 'AI Agents'],
  },
  {
    company: 'Ernst & Young',
    href: 'https://www.ey.com',
    role: 'Senior Software Engineer (Web & Mobile)',
    period: 'Apr 2024 — Feb 2025',
    summary:
      'Acting lead of a six-person web team behind the platform serving 3,000+ Toyota ' +
      'dealerships, and shipped the Telematics experience in the mTOYOTA app now used by ' +
      '30,000+ drivers.',
    stack: ['ReactJS', 'TanStack Query', 'Flutter'],
  },
  {
    company: 'Samsung Research',
    href: 'https://www.samsung.com/id/srin',
    role: 'Software Engineer (TV)',
    period: 'Jul 2023 — Apr 2024',
    summary:
      "Helped bring living rooms to life through Ambient and Art Mode display features " +
      "across 50+ QLED sets and Samsung's 'The Frame' TVs worldwide. Certified Samsung " +
      'Professional Software Engineer.',
    stack: ['Tizen', 'JavaScript', 'C++'],
  },
  {
    company: 'Cofounderie',
    href: 'https://cofounderie.com',
    role: 'Intern Software Engineer (Mobile)',
    period: 'Apr 2023 — Jul 2023',
    summary:
      'Built the version-management setup for Grumpy Royal, a game-based learning app, in ' +
      'Flutter and Firebase, collaborating with a UK-based team across time zones via async ' +
      'and live workflows.',
    stack: ['Flutter', 'Firebase'],
  },
  {
    company: 'Traveloka',
    href: 'https://www.traveloka.com',
    role: 'Intern Software Engineer (Backend)',
    period: 'Aug 2022 — Dec 2022',
    summary:
      'Cut infrastructure costs up to 40% and doubled build speed by migrating seven ' +
      'microservices from EC2 to AWS ECS, then helped build International Connectivity, ' +
      'used by hundreds of thousands across Southeast Asia.',
    stack: ['Java Spring Boot', 'AWS', 'Terraform', 'PostgreSQL'],
  },
  {
    company: 'Impact.',
    href: 'https://www.impactfirst.co',
    role: 'Intern Software Engineer (Odoo)',
    period: 'Feb 2022 — Apr 2022',
    summary:
      'Built custom Odoo modules for sales reporting and inventory — automated alerts, ' +
      'CRON jobs, role-based access — and turned business needs into clear data-flow ' +
      'diagrams the whole team could follow.',
    stack: ['Odoo', 'PostgreSQL'],
  },
]

export type Shot = {
  // Add `src` (path under /public or an imported asset) when you have a real
  // screenshot; until then a light placeholder frame is shown.
  src?: string
  caption: string
}

export type Project = {
  slug: string
  context: string // e.g. "Shopee · Web Platform" — the eyebrow line
  title: string
  year: string
  problem: string // one-line hook shown on the card
  detail: string // the hard part / what was built, shown in the modal
  role?: string
  impact?: string
  status?: string // single accent pill, e.g. "Live", "30k+ users"
  stack: string[]
  href?: string
  links?: { label: string; href: string }[] // external destinations shown in the modal
  featured: boolean
  // `shots[0]` doubles as the card cover. Add `src` for real captures.
  shots: Shot[]
}

// Real work, featured first. Drop a screenshot path into a shot's `src` to
// replace the light placeholder frame.
export const projects: Project[] = [
  {
    slug: 'tokkoo',
    context: 'Tokkoo · Mobile POS',
    title: 'Tokkoo — Offline Cashier',
    year: '2025',
    problem: 'A fast, offline-first point of sale for every business.',
    detail:
      'A point-of-sale app for every kind of business — manage products, take orders, accept ' +
      'payments, and print receipts, all working fully offline. Built for anywhere: it ' +
      'supports every currency and 50+ languages. Designed and built end to end, and ' +
      'shipped to the Play Store.',
    role: 'Solo — design & engineering',
    impact: 'Live on Google Play',
    status: 'Live',
    stack: ['Flutter', 'AWS'],
    href: 'https://tokkoo.app',
    links: [
      { label: 'Website', href: 'https://tokkoo.app' },
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.tokkoo.tokkoo',
      },
    ],
    featured: true,
    shots: [
      { src: '/projects/tokkoo/tokkoo-feature.webp', caption: 'Sell. Print. Anywhere.' },
      { src: '/projects/tokkoo/tokkoo-pos.webp', caption: 'Point of sale' },
      { src: '/projects/tokkoo/tokkoo-dashboard.webp', caption: 'Dashboard' },
      { src: '/projects/tokkoo/tokkoo-products.webp', caption: 'Manage products' },
      { src: '/projects/tokkoo/tokkoo-payment-methods.webp', caption: 'Payment methods' },
      { src: '/projects/tokkoo/tokkoo-cart.webp', caption: 'Cart' },
      { src: '/projects/tokkoo/tokkoo-checkout.webp', caption: 'Checkout' },
      { src: '/projects/tokkoo/tokkoo-receipt.webp', caption: 'Receipt' },
      { src: '/projects/tokkoo/tokkoo-report.webp', caption: 'Sales report' },
    ],
  },
  {
    slug: 'm-toyota',
    context: 'Toyota · mTOYOTA App',
    title: 'Vehicle Telematics',
    year: '2024',
    problem: "Bringing live vehicle data to every owner's phone.",
    detail:
      'Designed and built the Telematics experience inside the mTOYOTA app — live vehicle ' +
      'status, driving insights, and trip history — shipped to both the App Store and ' +
      'Google Play.',
    role: 'Solution Developer · EY',
    impact: 'In the hands of 30,000+ active drivers',
    status: '30k+ users',
    stack: ['Flutter'],
    links: [
      {
        label: 'Google Play',
        href: 'https://play.google.com/store/apps/details?id=com.toyota.m&hl=en',
      },
    ],
    featured: true,
    shots: [
      { src: '/projects/m-toyota/mtoyota-overview.webp', caption: 'Live Connected' },
      { src: '/projects/m-toyota/mtoyota-gps.webp', caption: 'Integrated GPS' },
      { src: '/projects/m-toyota/mtoyota-ownership.webp', caption: 'Smart Ownership' },
      { src: '/projects/m-toyota/mtoyota-services.webp', caption: 'Everything in one app' },
    ],
  },
  {
    slug: 'dxmi',
    context: 'Toyota · Dealer App',
    title: 'DXMI — Dealer Platform',
    year: '2024',
    problem: 'One platform to run 3,000+ dealer outlets nationwide.',
    detail:
      'As acting lead of a six-person web team, maintained and evolved the platform used ' +
      'daily across Toyota dealerships in Indonesia — from sales workflows to reporting.',
    role: 'Solution Developer (Lead Web Developer) · EY',
    impact: 'Used across 3,000+ outlets nationally',
    status: '3,000+ outlets',
    stack: ['ReactJS', 'Modern Web Libraries'],
    featured: true,
    shots: [
      { src: '/projects/dxmi/dxmi-login.webp', caption: 'Sign in' },
      { src: '/projects/dxmi/dxmi-home.webp', caption: 'Sales dashboard' },
      { src: '/projects/dxmi/dxmi-test-drive.webp', caption: 'Test drive details' },
      { src: '/projects/dxmi/dxmi-customer.webp', caption: 'Customer detail' },
      { src: '/projects/dxmi/dxmi-timeslot.webp', caption: 'Timeslot management' },
      { src: '/projects/dxmi/dxmi-notifications.webp', caption: 'Notifications' },
      { src: '/projects/dxmi/dxmi-order-tracking.webp', caption: 'Order tracking' },
      { src: '/projects/dxmi/dxmi-service-detail.webp', caption: 'Service detail' },
      { src: '/projects/dxmi/dxmi-attack-list.webp', caption: 'After-sales attack list' },
      { src: '/projects/dxmi/dxmi-suspects.webp', caption: 'Lead suspects' },
      { src: '/projects/dxmi/dxmi-filter.webp', caption: 'Lead filter builder' },
    ],
  },
  {
    slug: 'ecs-migration',
    context: 'Traveloka · Backend',
    title: 'Microservice Migration',
    year: '2022',
    problem: 'Cutting infra cost without slowing the team down.',
    detail:
      'Migrated seven microservices from EC2 Auto Scaling to AWS ECS — up to 40% lower ' +
      'infrastructure cost and roughly 2× faster builds.',
    role: 'Software Engineer · Traveloka',
    status: '−40% cost',
    stack: ['AWS', 'Terraform', 'Java Spring Boot'],
    featured: false,
    shots: [
      {
        src: '/projects/ecs-migration/ecs-architecture.webp',
        caption: 'CI/CD pipeline architecture',
      },
    ],
  },
  {
    slug: 'art-and-ambient',
    context: 'Samsung · Smart TV',
    title: 'Ambient & Art Mode',
    year: '2023',
    problem: 'Turning idle TVs into ambient art.',
    detail:
      "Contributed display features — Ambient Mode and Art Mode — shipping across 50+ " +
      "QLED/Neo QLED sets and the 'The Frame' lineup, deployed internationally.",
    role: 'Software Engineer · Samsung',
    status: '50+ models',
    stack: ['Tizen', 'DotNet', 'C#'],
    featured: false,
    shots: [
      { src: '/projects/art-and-ambient/art-frame.webp', caption: 'Art Mode on The Frame' },
    ],
  },
  {
    slug: 'grumpy-royal',
    context: 'Cofounderie · Mobile',
    title: 'Grumpy Royal',
    year: '2023',
    problem: 'A game-based learning app, built with a UK team.',
    detail:
      'Built the version-management configuration for Grumpy Royal in Flutter and Firebase, ' +
      'collaborating with overseas developers across time zones.',
    role: 'Software Engineer · Cofounderie',
    stack: ['Flutter', 'Firebase'],
    links: [
      { label: 'Website', href: 'https://www.grumpyroyal.com/' },
      {
        label: 'App Store',
        href: 'https://apps.apple.com/id/app/learn-to-code-grumpy-royal/id6476832300',
      },
    ],
    featured: false,
    shots: [
      { src: '/projects/grumpy-royal/grumpy-hero.webp', caption: 'Learn real coding' },
      { src: '/projects/grumpy-royal/grumpy-challenges.webp', caption: 'Bite-sized challenges' },
      { src: '/projects/grumpy-royal/grumpy-curriculum.webp', caption: 'Professional curriculum' },
    ],
  },
]
