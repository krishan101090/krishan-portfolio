# 02 · Architecture Spec

| Field        | Value                 |
|--------------|-----------------------|
| Status       | Shipped               |
| Author       | Krishan Mohan         |
| Last updated | 2026-04-17            |

## 1. Intent

A **serverless, statically-generated** portfolio that is
(a) trivially deployable to Vercel,
(b) content-driven from a JSON profile,
(c) strong on SEO because every page is SSR'd HTML, and
(d) fast by default — zero client-side data fetching on the critical path.

## 2. Stack

| Layer              | Choice                           | Why                                                  |
|--------------------|----------------------------------|------------------------------------------------------|
| Framework          | Next.js 14 (App Router)          | SSR/SSG by default, `generateMetadata`, file-routed API, `next/og`. |
| Runtime            | React 18 Server Components       | Zero client JS for narrative content.                |
| Styling            | CSS Modules + CSS variables      | Scoped, zero-runtime, themeable via tokens.          |
| Data source        | JSON files in `data/profiles/`   | Versionable content, no DB required for v1.          |
| Edge render        | Vercel Functions (ISR 1h)        | Fresh but cacheable.                                 |
| Type safety        | TypeScript-ready JSDoc + schema  | Incremental hardening without a full TS rewrite.     |
| Deployment         | Vercel (primary), Docker (alt)   | `git push` → live URL; portability retained.         |

## 3. Module boundaries

```
app/                     ← routes, metadata, sitemap, robots, OG images
  layout.jsx             ← global <head>, fonts, analytics slot
  page.jsx               ← default profile (Krishan)
  [slug]/page.jsx        ← additional profiles (e.g. /jane)
  api/profiles/          ← public JSON API for headless consumers
  sitemap.js             ← dynamic sitemap with hreflang
  robots.js              ← per-bot rules
  manifest.js            ← PWA manifest

components/              ← presentational + container components
  Portfolio.jsx          ← orchestrator; composes chapters
  Hero.jsx, Chapter.jsx, Timeline.jsx, Services.jsx, Contact.jsx, FAQ.jsx
  Nav.jsx, JsonLd.jsx

lib/                     ← pure functions, no React, no I/O on render path
  profiles.js            ← sync in-memory cache of profile JSON
  metadata.js            ← buildMetadata(profile, path) helper
  schema.js              ← buildSchemas(profile, path) returns JSON-LD[]
  og.js                  ← renderOgImage(profile) for dynamic OG/Twitter

data/profiles/*.json     ← content source of truth
specs/                   ← this folder; source of truth for intent
public/                  ← static assets, security.txt, humans.txt
```

**Rule:** `lib/` has no React imports. `components/` has no `fs` imports.
Data loading happens only in `app/**` server boundaries.

## 4. Data flow

```
profile JSON ──► lib/profiles.js (cached) ──► app/page.jsx (RSC)
                                              │
                                              ├─► components/Portfolio (server)
                                              │   └─ chapters (server by default,
                                              │      "use client" only where
                                              │      interaction demands it)
                                              │
                                              ├─► buildMetadata() → <head>
                                              └─► buildSchemas()  → JSON-LD
```

**Critical invariant:** all narrative HTML is rendered on the server. The
client hydrates only interactive islands (contact form, nav scroll).

## 5. Caching strategy

| Layer                  | TTL       | Invalidation                    |
|------------------------|-----------|---------------------------------|
| Profile JSON (memory)  | Process   | Server restart / deploy         |
| Page (Vercel)          | 1 h (ISR) | Any `git push` invalidates all  |
| Static assets          | 1 y       | Hashed filenames                |
| JSON API route         | 5 min     | Deploy                          |

## 6. Why not a CMS?

Considered: Sanity, Contentful, Notion, Airtable.
Rejected for v1 because:

- Content fits in one file and changes roughly monthly.
- Git history is the best audit trail for copy changes.
- No non-technical editor is in the loop.
- Eliminating the CMS removes 1 external dependency, 1 API token, and
  2 failure modes from production.

Migration path to a CMS is trivial: the `getProfile(slug)` function is the
only swap point.

## 7. Why not plain HTML?

Considered. Rejected because:

- `next/og` gives us per-profile dynamic OG images without a design step.
- `generateMetadata` + JSON-LD injection is near-impossible without SSR.
- Adding a second profile would require hand-duplicating the HTML file.
- Static export remains available (`next export`) if the hosting provider
  ever lacks Node.

## 8. Non-functional constraints

| Concern       | Budget                                               |
|---------------|------------------------------------------------------|
| Total JS (gz) | ≤ 90 kB for root page                                |
| Fonts         | 1 font family, 2 weights, preloaded, `font-display: swap` |
| Images        | `next/image` or inline SVG; no raster above the fold |
| Third-party   | Zero on the critical path; analytics loaded on idle  |
| Cookies       | None (privacy-first)                                 |

## 9. Observability

- **Build-time:** Lighthouse CI runs on every PR preview.
- **Runtime:** Vercel Web Analytics (no cookies, no PII).
- **Errors:** `error.js` boundary + Vercel server logs; Sentry-ready (opt-in
  via env var).

## 10. Acceptance criteria (architecture)

- [x] `npm run build` succeeds with zero warnings.
- [x] Root bundle < 90 kB gzipped JS.
- [x] SSR HTML contains full narrative text (verifiable with `curl`).
- [x] Adding a new profile requires adding one JSON file — no code change.
- [x] No `fetch()` on the render path for JSON profile data.
- [x] All routes (`/`, `/[slug]`, `/api/*`, `/sitemap.xml`, `/robots.txt`)
      return 200 on first request after cold deploy.
