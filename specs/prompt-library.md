# Prompt Library

Reusable AI prompts, versioned alongside the specs they derive from. These
are the **actual prompts** handed to the coding agent (Cursor Composer /
Claude) during Gate 2 of the workflow.

A good prompt in this project always has four sections:

1. **ROLE** — who the AI is playing.
2. **CONTEXT** — which files, tokens, and constraints apply.
3. **TASK** — one spec, explicitly cited.
4. **DEFINITION OF DONE** — acceptance pulled from the spec.

---

## P-00 · Repo-wide system prompt

> You are a senior frontend engineer pair-programming inside this Next.js
> 14 App Router codebase. Follow these invariants:
>
> - CSS Modules only. No Tailwind, no styled-components.
> - Tokens come from `app/globals.css`; never hard-code a color or spacing
>   value inside a component.
> - Components are React Server Components by default. Add
>   `"use client"` only when strictly required (state, event handlers,
>   `useSearchParams`, `IntersectionObserver`).
> - No new dependency without explicit approval.
> - Every `<section>` gets an `aria-labelledby` → its heading id.
> - Every motion effect respects `prefers-reduced-motion: reduce`.
> - Copy is owned by `data/profiles/*.json`. Don't hard-code user-facing
>   strings in components.
> - When you finish, list: (a) files added/modified, (b) acceptance
>   criteria satisfied, (c) any spec amendment you propose.

---

## P-01 · Hero Terminal

> **ROLE** — senior frontend engineer.
> **CONTEXT** — read
> `specs/features/hero-terminal.spec.md`,
> `specs/05-design-system.spec.md`,
> `specs/03-data-model.spec.md` §3.2 and §3.x for `boot`.
> **TASK** — implement `components/Hero.jsx` + `Hero.module.css` matching
> that spec. It is a client component because of the typing animation. The
> terminal's final text must be present in the SSR tree so screen readers
> and no-JS visitors see the complete content.
> **DONE** — every bullet in §8 of the hero spec is satisfied and a
> Lighthouse mobile run shows CLS = 0 on the hero block.

---

## P-02 · Chapter

> **ROLE** — senior frontend engineer.
> **CONTEXT** — `specs/features/chapter-narrative.spec.md`,
> `specs/05-design-system.spec.md` §5 (grid), §6 (motion).
> **TASK** — implement `components/Chapter.jsx` as an RSC that renders
> eyebrow, H2, paragraphs, and artifacts per the Artifact union type.
> Extract the tiny intersection-reveal piece into a `"use client"` sibling
> `RevealOnView.jsx` used by each chapter root so the chapter itself stays
> server-rendered.
> **DONE** — §8 acceptance fully green; nine chapters render in SSR HTML
> before hydration.

---

## P-03 · Timeline

> **ROLE** — senior frontend engineer.
> **CONTEXT** — `specs/features/timeline.spec.md`,
> `specs/03-data-model.spec.md` §3.4.
> **TASK** — implement `components/Timeline.jsx` + CSS module. React keys
> MUST be `` `${item.year}-${i}` ``. Render `item.range` only if present.
> **DONE** — 8 entries appear in SSR HTML; repeated years do not throw
> key warnings; a11y criteria §7 satisfied.

---

## P-04 · Services palette

> **ROLE** — senior frontend engineer.
> **CONTEXT** — `specs/features/services-palette.spec.md`,
> `specs/03-data-model.spec.md` §3.5.
> **TASK** — implement `components/Services.jsx`. Each row is an `<a>` to
> `#contact?service=<id>`. Zero client JS. Titles rendered as `<h3>` for
> schema extraction and JSON-LD parity.
> **DONE** — §8 acceptance criteria; JSON-LD `ItemList` mirror verified.

---

## P-05 · Contact console

> **ROLE** — senior frontend engineer + security-aware API author.
> **CONTEXT** — `specs/features/contact-console.spec.md`.
> **TASK** — build `components/Contact.jsx` (client) + `app/api/contact/route.js`.
> Validate with Zod (or minimal hand-rolled) per §5. Honeypot field
> `website` rejected silently. Rate-limit 10/min/IP at the edge.
> **DONE** — all six acceptance rows in §8 pass; manual test shows a bot
> submission receives 204 and no email fires.

---

## P-06 · FAQ

> **ROLE** — senior frontend engineer.
> **CONTEXT** — `specs/features/faq.spec.md`,
> `specs/04-seo.spec.md` §3.
> **TASK** — implement `components/FAQ.jsx` using native `<details>`/
> `<summary>`. Visible Q and A strings must be identical to the JSON
> passed in — no transformation. `lib/schema.js` already mirrors them into
> `FAQPage`; do not duplicate schema here.
> **DONE** — §8 acceptance; Rich Results Test passes zero-error.

---

## P-07 · Dynamic OG image

> **ROLE** — senior frontend engineer familiar with `next/og`.
> **CONTEXT** — `specs/04-seo.spec.md` §7, `lib/og.js`.
> **TASK** — produce or update `lib/og.js → renderOgImage(profile)` so it
> returns a 1200×630 cyberpunk-styled card with name, role, tagline, and
> `currentCompany`. The root-level `app/opengraph-image.jsx` and the
> `app/[slug]/opengraph-image.jsx` should both call this.
>
> **CRITICAL** — `next/og` rejects the `background` shorthand. Use
> `backgroundColor` + `backgroundImage` as two separate keys. Fonts must
> be fetched via `fetch(new URL('../fonts/…', import.meta.url))`.
> **DONE** — `npm run build` produces the image routes without errors; the
> image renders correctly in LinkedIn Post Inspector.

---

## P-08 · JSON-LD graph

> **ROLE** — senior frontend engineer + SEO specialist.
> **CONTEXT** — `specs/04-seo.spec.md` §3, `lib/schema.js`, `components/JsonLd.jsx`.
> **TASK** — extend `buildSchemas(profile, path)` to return an array of 7
> schemas: WebSite, Person, ProfilePage, BreadcrumbList, ProfessionalService
> (with OfferCatalog), FAQPage, ItemList (services). `JsonLd.jsx` must
> accept an array and emit a single `@graph`.
> **DONE** — Rich Results Test shows no errors; all 7 nodes recognized;
> FAQPage copy matches on-page FAQ component exactly.

---

## P-09 · Profile cache (EMFILE mitigation)

> **ROLE** — senior Node.js engineer.
> **CONTEXT** — `lib/profiles.js`, issue: macOS `EMFILE: too many open files`
> during dev, caused by repeated `fs.readFile` per request.
> **TASK** — replace async readers with a synchronous one-time cache
> loaded at module-import time. Expose `listProfileSlugs()`,
> `getProfile(slug)`, `getAllProfiles()`. Fail loud on malformed JSON at
> startup so the bug surfaces at build, not at runtime.
> **DONE** — no more EMFILE in dev logs; `next build` still works; adding
> a new profile JSON + restart picks it up.

---

## P-10 · New profile (re-skin)

> **ROLE** — content engineer.
> **CONTEXT** — `specs/03-data-model.spec.md`, existing
> `data/profiles/krishan.json` as the canonical example.
> **TASK** — given a raw CV + bio paragraph for a new person, produce a
> valid `data/profiles/<slug>.json` that satisfies every invariant in §4
> of the data-model spec, including ≥ 3 FAQs, ≥ 10 skills, 1 service
> minimum, and SEO fields in the required length ranges.
> **DONE** — the generated JSON parses, validation passes, the route
> `/<slug>` renders with all 8 chapters, correct metadata, and a valid
> OG image.

---

## Amendments

Every prompt above has been iterated at least once. When an iteration
fixes a defect worth remembering, amend both the spec's §9 prompt AND the
entry here with a dated note. Example:

> **2026-04-14 (P-07):** Added explicit "backgroundColor + backgroundImage"
> note after `npm run build` failed with `Invalid background image`.
