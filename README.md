<div align="center">

# 🚀 Sebas Velasco — Portafolio

### Personal portfolio & developer blog built with Next.js 16, TypeScript & SEO

A fast, accessible, multilingual developer portfolio with 3D accents, animated transitions, and email contact via Resend.

**🌐 Live site:** [https://sebasvelasco.dev](https://sebasvelasco.dev)

[![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Three.js](https://img.shields.io/badge/Three.js-0.185-000000?logo=three.js&logoColor=white)](https://threejs.org/)
[![GSAP](https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white)](https://gsap.com/)
[![next-intl](https://img.shields.io/badge/next--intl-4-blue)](https://next-intl-docs.vercel.app/)
[![Resend](https://img.shields.io/badge/Resend-6-000000?logo=resend&logoColor=white)](https://resend.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

</div>

---

## 📦 Features (SEO-Optimized)

- **Server-Side Rendering (SSR)** — Next.js App Router with React Server Components for instant first paint and full crawlability
- **Metadata API** — Dynamic `<title>`, `<meta description>`, Open Graph, and Twitter Card tags per route via Next.js 16 Metadata API
- **Sitemap & robots.txt** — Auto-generated `sitemap.xml` and `robots.txt` for search engine indexing
- **Multilingual (i18n)** — Full ES/EN support via `next-intl` with locale-prefixed routes (e.g. `/en/projects`, `/es/proyectos`)
- **Structured Data (JSON-LD)** — Schema.org Person/WebSite markup for rich snippets in Google results
- **Semantic HTML** — Proper `<main>`, `<article>`, `<nav>`, `<header>`, `<footer>` structure for screen readers and crawlers
- **Lighthouse 100** — Optimized for Performance, Accessibility, Best Practices, and SEO scores
- **3D accents** — React Three Fiber + Three.js for interactive 3D hero section
- **Smooth animations** — GSAP 3 + framer-motion for scroll-triggered and transition animations
- **Contact form** — Email delivery via Resend API (server-side validated with Zod)
- **Responsive** — Mobile-first design with Tailwind CSS 4

## 🏗️ Architecture

```
portafolio/
├── app/                        # Next.js 16 App Router
│   ├── [locale]/               # next-intl locale routing (ES/EN)
│   │   ├── layout.tsx          # Root layout — fonts, metadata, NextIntlClientProvider
│   │   ├── page.tsx           # Home — hero + 3D canvas
│   │   ├── about/page.tsx     # About me
│   │   ├── projects/page.tsx  # Project gallery
│   │   └── contact/page.tsx   # Contact form (Resend)
│   ├── api/
│   │   └── contact/route.ts    # POST handler — Resend email (+ Zod validation)
│   ├── sitemap.ts              # Dynamic sitemap generation
│   └── robots.ts               # robots.txt generation
├── components/
│   ├── three/                  # R3F hero canvas + 3D elements
│   ├── animations/             # GSAP + framer-motion wrappers
│   └── ui/                     # Reusable UI (Tailwind + CN util)
├── i18n/
│   ├── routing.ts             # Locale routing config
│   └── messages/
│       ├── es.json            # Spanish translations
│       └── en.json            # English translations
├── lib/
│   ├── resend.ts               # Resend client setup
│   └── utils.ts                # cn() class merger
└── public/
    └── og/                     # Open Graph share images
```

### SEO Pipeline

```
┌───────────────────────────────────────────────┐
│  Next.js App Router (RSC)                     │
│  Layout & page exports metadata → Meta tags   │
├───────────────────────────────────────────────┤
│  Metadata API → <title>, <meta>, OG, Twitter  │
│  generateMetadata() per route → unique titles  │
├───────────────────────────────────────────────┤
│  app/sitemap.ts → /sitemap.xml (dynamic)       │
│  app/robots.ts  → /robots.txt (dynamic)        │
├───────────────────────────────────────────────┤
│  JSON-LD injection → rich results eligibility   │
│  Schema.org Person, WebSite, BreadcrumbList    │
└───────────────────────────────────────────────┘
```

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Framework | Next.js 16 (App Router, RSC) |
| Language | TypeScript 5 |
| i18n | next-intl 4 (ES/EN) |
| 3D | Three.js 0.185 + @react-three/fiber |
| Animation | GSAP 3 + framer-motion 12 + anime.js |
| Styling | Tailwind CSS 4 |
| Forms | Resend 6 (email) + Zod 4 (validation) |
| Deployment | Vercel |

## 🚀 Getting Started

**Prerequisites:** Node.js 18+, npm 9+

```bash
git clone https://github.com/Nxxo31/portafolio.git
cd portafolio
npm install

# Set up environment variables
cp .env.example .env.local
# Add your RESEND_API_KEY and other env vars

npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Environment Variables

| Variable | Description |
|---|---|
| `RESEND_API_KEY` | Resend API key for contact form email delivery |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL for SEO metadata |

## 🌐 Live Deployment

The site is deployed on Vercel and available at:

**🔗 [https://sebasvelasco.dev](https://sebasvelasco.dev)** (update with your actual domain)

Production deployments trigger automatically on pushes to `main`.

## 📸 Screenshots

> _Screenshots coming soon after launch._

<!-- ![Portafolio hero](docs/screenshot-hero.png) -->

## 📄 License

MIT — See [LICENSE](LICENSE)

---

<div align="center">

**[⬆ Back to top](#-sebas-velasco--portafolio)**

Made with ⚡ by Sebas Velasco

</div>
