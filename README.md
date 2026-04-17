# Krishan Mohan — AI-Narrative Portfolio

An immersive, story-driven portfolio for a Frontend Engineer transitioning into AI / spec-driven development. Built with **Next.js 14 (App Router)**, fully API-driven so it supports multiple profiles from the same codebase.

> Live: _coming soon_

---

## Highlights

- **Story-based design** — each section is a chapter in the journey from Frontend Engineer to AI-native builder, with terminal-style artifacts (code, stats, transcripts, spec-flow, AI stack map).
- **Multi-profile API** — all content lives in `data/profiles/*.json`; each profile is served at its own SEO-optimized route (`/`, `/jane`, etc.).
- **SEO-first** — server-rendered metadata, Open Graph, Twitter cards, JSON-LD (`Person` + `ProfessionalService`), dynamic `robots.txt` and `sitemap.xml`.
- **Performance** — SSG + ISR, preloaded fonts, animated neural-network canvas, IntersectionObserver-based reveal animations.
- **Hire-me console** — interactive contact form wired to `mailto:` with pre-formatted transmission payload.

---

## Tech stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router, RSC) |
| Rendering | SSG + ISR (`revalidate: 3600`) |
| Styling | CSS Modules + CSS variables, cyberpunk palette |
| Fonts | Syne (display), JetBrains Mono (code), Inter (body) |
| Data | JSON-per-profile in `/data/profiles/`, cached in memory |
| API | Next.js Route Handlers — `/api/profiles`, `/api/profiles/[slug]` |

---

## Project structure

```
app/
  layout.jsx           # root layout, fonts, global metadata
  page.jsx             # default profile (krishan)
  [slug]/page.jsx      # any other profile by slug
  api/profiles/        # JSON API endpoints
  robots.js            # dynamic robots.txt
  sitemap.js           # dynamic sitemap.xml
components/            # Hero, Chapter, SpecFlow, AIStack, Timeline, Services, Contact, ...
data/profiles/         # JSON content — one file per profile
lib/profiles.js        # in-memory profile loader
```

---

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

### Adding a new profile

1. Drop a JSON file into `data/profiles/<slug>.json` (copy `krishan.json` as a template).
2. The profile is instantly available at `/<slug>` and `/api/profiles/<slug>`.
3. That's it — no code changes, no rebuild needed in dev.

### Environment variables

| Key | Purpose | Example |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Base URL used for canonical links, OG, sitemap | `https://krishanmohan.dev` |
| `DEFAULT_PROFILE` | Slug served at `/` | `krishan` |

---

## Deploy

### Vercel (recommended)

1. Push this repo to GitHub.
2. Import at [vercel.com/new](https://vercel.com/new).
3. Add `NEXT_PUBLIC_SITE_URL` under **Project → Settings → Environment Variables**.
4. Done.

### Docker

```bash
docker build -t krishan-portfolio .
docker run -p 3000:3000 -e NEXT_PUBLIC_SITE_URL=https://your.domain krishan-portfolio
```

---

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Production build (SSG + ISR) |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

---

## Hire me

Looking for help shipping AI-native web products, spec-driven UI systems, or senior frontend engineering consulting? The contact console on the site submits a pre-formatted briefing straight to my inbox.

- GitHub — [@krishan101090](https://github.com/krishan101090)

---

## License

MIT — feel free to fork and adapt for your own portfolio. A credit link back is appreciated, not required.
