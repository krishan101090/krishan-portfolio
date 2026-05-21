# Acceptance Criteria — Cross-Cutting

These are **site-wide** acceptance gates. Every feature spec inherits this
list in addition to its own §8 acceptance criteria. A feature is not
"Shipped" until every row here is satisfied for the build that contains it.

---

## A. Performance

| #   | Criterion                                                         | Budget               | Status |
|-----|-------------------------------------------------------------------|----------------------|--------|
| A1  | Largest Contentful Paint (cold, 4G, moto-g4 simulation)           | ≤ 2.5 s              | ✅     |
| A2  | Interaction to Next Paint                                         | ≤ 200 ms             | ✅     |
| A3  | Cumulative Layout Shift                                           | ≤ 0.1                | ✅     |
| A4  | First-load JS (root page, gzipped)                                | ≤ 90 kB              | ✅     |
| A5  | No render-blocking third-party script on critical path            | —                    | ✅     |
| A6  | Fonts preloaded, `font-display: swap`                             | —                    | ✅     |
| A7  | Lighthouse Performance                                            | ≥ 95                 | ✅     |

---

## B. Accessibility

| #   | Criterion                                                     | Status |
|-----|---------------------------------------------------------------|--------|
| B1  | Axe scan: zero violations across all routes                   | ✅     |
| B2  | Keyboard: every interactive element reachable and operable    | ✅     |
| B3  | Visible focus ring on every focusable element                 | ✅     |
| B4  | Color contrast AA (body ≥ 4.5:1, large ≥ 3:1)                 | ✅     |
| B5  | Single `<h1>` per page; no skipped heading levels             | ✅     |
| B6  | `prefers-reduced-motion: reduce` disables all non-essential motion | ✅ |
| B7  | Skip-to-content link is the first tabbable element            | ✅     |
| B8  | Every `<section>` has `aria-labelledby` → its heading id      | ✅     |
| B9  | All images: meaningful ones have `alt`; decorative have `alt=""` | ✅  |
| B10 | Lighthouse Accessibility                                      | ≥ 95   |

---

## C. SEO

| #   | Criterion                                                            | Status |
|-----|----------------------------------------------------------------------|--------|
| C1  | Unique `<title>` ≤ 60 chars + `<meta description>` 140–170 chars     | ✅     |
| C2  | Canonical URL set on every page                                      | ✅     |
| C3  | `hreflang` alternates (`en-US`, `x-default`) in `<head>` + sitemap   | ✅     |
| C4  | Open Graph (type=profile) and Twitter (summary_large_image) rendered | ✅     |
| C5  | Dynamic OG image generated via `next/og` for every route             | ✅     |
| C6  | JSON-LD `@graph` with 7 schemas validates in Rich Results Test       | ✅     |
| C7  | Visible FAQ copy = JSON-LD `FAQPage` copy (character-identical)      | ✅     |
| C8  | `robots.txt` + dynamic `sitemap.xml` return 200                      | ✅     |
| C9  | PWA manifest installable with correct name + icons                   | ✅     |
| C10 | Lighthouse SEO                                                       | = 100  |

---

## D. Security & privacy

| #   | Criterion                                                              | Status |
|-----|------------------------------------------------------------------------|--------|
| D1  | Zero cookies set by first-party code                                   | ✅     |
| D2  | No external script on critical path                                    | ✅     |
| D3  | `security.txt` present at `/.well-known/security.txt`                  | ✅     |
| D4  | `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: camera=(), microphone=(), geolocation=()` headers set | ✅ |
| D5  | Contact API: honeypot rejected silently + rate-limit 10/min/IP         | ✅     |
| D6  | No PII in logs                                                         | ✅     |

---

## E. Robustness

| #   | Criterion                                                                     | Status |
|-----|-------------------------------------------------------------------------------|--------|
| E1  | `npm run build` succeeds with zero warnings                                   | ✅     |
| E2  | Site renders correctly with JavaScript disabled                               | ✅     |
| E3  | Profile validation fails the build for malformed JSON                         | ✅     |
| E4  | Missing optional profile fields never produce empty nodes or broken layout    | ✅     |
| E5  | No runtime error boundary triggered during a 5-minute manual scroll session   | ✅     |
| E6  | CI green on every PR (lint + typecheck + build + Lighthouse)                  | ✅     |

---

## F. Content & Voice

| #   | Criterion                                                                   | Status |
|-----|-----------------------------------------------------------------------------|--------|
| F1  | Every claim in chapters is supported by a timeline entry or artifact link   | ✅     |
| F2  | No generic AI-sounding filler ("in today's fast-paced world…")              | ✅     |
| F3  | Employer/role history matches the authoritative source (LinkedIn + CV)      | ✅     |
| F4  | Services copy names a concrete deliverable per engagement                    | ✅     |
| F5  | FAQ answers are direct, first-person, ≤ 3 sentences                          | ✅     |

---

## G. Shipping discipline

| #   | Criterion                                                                | Status |
|-----|--------------------------------------------------------------------------|--------|
| G1  | Every feature has a Markdown spec in `specs/` prior to implementation    | ✅     |
| G2  | Every PR title references the spec id ("feat(timeline): …")              | ✅     |
| G3  | Every spec closes with §9 AI Prompt that a fresh session could execute   | ✅     |
| G4  | Lessons learned land as amendments to specs, not undocumented hotfixes   | ✅     |
