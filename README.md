# PMP Planet Multimedia Publishers — website

A from-scratch rebuild of [pmpublishers.in](https://pmpublishers.in) with the same content, logo, images and brand colours, and a refreshed UI.

- **Framework:** Next.js 16 (App Router, Cache Components, Turbopack), React 19, TypeScript
- **Styling:** Tailwind CSS v4 with brand tokens in `src/app/globals.css`
- **Motion:** `motion` (framer-motion) for reveal/stagger/hover, Embla for carousels
- **Icons:** `lucide-react`
- **Fonts:** Poppins (body) and Outfit (display numbers) via `next/font`

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start
npm run lint
```

### Environment

Copy `.env.example` to `.env.local` if the backend moves. Defaults point at the live backend.

| Variable        | Purpose                                                                 | Default                              |
| --------------- | ----------------------------------------------------------------------- | ------------------------------------ |
| `API_BASE_URL`  | Base URL used by server components to read content                      | `https://pmpublishers.in/api/v1/`    |
| `API_UPSTREAM`  | Destination of the `/api/v1/*` rewrite used by client-side forms        | `https://pmpublishers.in/api/v1`     |

## Content & data

All dynamic content (book categories, series, books, blogs, team members, jobs, workshops, policies, hero sliders) is read from the existing PMP backend through typed, cached fetchers in `src/lib/api.ts` (`"use cache"` + `cacheLife("hours")`). If the API is unreachable the fetchers fall back to the JSON snapshots in `src/data/`, so the site never renders empty.

Forms (newsletter subscribe, contact) post to `/api/v1/...`, which `next.config.ts` rewrites to the backend.

Static copy that lives in the pages themselves was transcribed verbatim from the live site. Site-wide constants (contact details, social links, catalogue URL, stats) live in `src/lib/site.ts`.

## Project structure

```
src/
  app/                 routes (App Router)
    page.tsx           home
    about-us/ books/ resources/ solutions/ digital-learning/
    events-training/ blogs/ career/ contact-us/ pmpskilz/
    privacy-policy/ terms-and-conditions/ csr-policy/
    layout.tsx         fonts, header, footer, metadata
    globals.css        Tailwind theme tokens + utilities
    sitemap.ts robots.ts not-found.tsx
  components/
    ui/                Button, Container, SectionHeading, Motion, Accordion, CountUp, IconBadge
    layout/            Header (mega menu + mobile drawer), Footer, SocialLinks
    sections/          PageHero, TrustBar, StatsBand, CtaBanner, NewsletterSection
    cards/             SeriesCard, BookCard, BlogCard, TeamCard
    forms/             ContactForm, NewsletterForm
    home/ about/ books/ blogs/ ...   page-specific sections
  lib/                 api.ts (data), site.ts (config), types.ts, utils.ts
  data/                JSON fallbacks captured from the live API
public/                logo, hero art, photos, series covers
```

## Design tokens

| Token                 | Value     | Use                         |
| --------------------- | --------- | --------------------------- |
| `theme`               | `#0a9846` | primary green, CTAs, links  |
| `theme-dark`          | `#08753a` | hover                       |
| `theme-deep`          | `#006b2c` | deep green accents          |
| `ink`                 | `#1d2452` | navy headings               |
| `ink-900`             | `#0b1c30` | footer, dark panels         |
| `muted` / `muted-light` | `#4f5b84` / `#667085` | body copy       |
| `surface` / `mint` / `sky-soft` | `#f8fafc` / `#eef8f2` / `#eff4ff` | section backgrounds |

## Notes

- Hero slides come from `slider/get-all-sliders`; when the backend has none, a default slide built from the site's own copy is shown.
- Policy pages render HTML from `policy/get/{type}`; the backend currently returns empty content, so a friendly placeholder is displayed.
- The catalogue PDF (31 MB) is linked from the live site rather than bundled in `public/`.
