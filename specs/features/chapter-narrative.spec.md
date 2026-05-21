# Feature · Chapter Narrative

| Field       | Value                         |
|-------------|-------------------------------|
| Status      | Shipped                       |
| Component   | `components/Chapter.jsx`      |
| Data source | `profile.chapters[]`          |

## 1. Intent

Each chapter is a vertical scene that delivers one idea — a problem, an
awakening, a method, a result — with exactly the body copy, metric, or
quote needed to support it.

## 2. User story

As a reader, I want each full-viewport scroll to feel like turning a page
of a novel about software engineering in the AI era — not a brochure.

## 3. Scope

**In:** eyebrow label, H2 title, 1–3 paragraphs, 0–3 artifacts (metric,
quote, link, code), accent color, entrance animation.
**Out:** images (intentional — text-first), external embeds, share buttons.

## 4. Data contract

See `specs/03-data-model.spec.md` §3.3 for the full `Chapter` and
`Artifact` types. A chapter must declare:

```ts
{
  id: 'ch-03-method',
  order: 3,
  eyebrow: 'CH. 03 · THE METHOD',
  title: 'I stopped typing. I started directing.',
  paragraphs: ['…','…'],
  artifacts: [
    { type: 'metric', label: 'Velocity change', value: '3.8×' },
    { type: 'quote',  text: '…', author: 'Krishan, 2024' }
  ],
  accent: 'cyan',
}
```

## 5. Behavior / states

| State        | Trigger                                   | Visual                                  |
|--------------|-------------------------------------------|-----------------------------------------|
| `hidden`     | pre-intersection                          | `opacity: 0; translateY(14px)`          |
| `revealing`  | 10% in viewport                           | transitions to final in 700ms ease-out  |
| `shown`      | intersectionRatio > 0.1 observed          | final state; observer disconnected      |
| `reduced-motion` | `prefers-reduced-motion: reduce`      | render `shown` immediately              |

## 6. Visual

- Grid: eyebrow + title + prose span cols 1–8; artifacts stack in cols
  8–13. On `md` breakpoint collapses to single column.
- Eyebrow: mono `0.8rem`, letter-spacing `.2em`, accent color.
- Title: display font, `clamp(2rem, 4vw, 3rem)`, `--ink-0`.
- Paragraphs: `--ink-1`, `max-width: 60ch`.
- Metric artifact: value in display font `2.5rem` + accent glow, label in
  mono caps.
- Quote artifact: left border `2px solid accent`, italic body, cite in mono.
- Between chapters: a 1px line at `--line` with a small gradient pulse.

## 7. Non-functional requirements

- **A11y:** wrap in `<section aria-labelledby={`${id}-heading`}>`; title is
  `<h2 id="…">`. Quotes use `<blockquote>` + `<cite>`. Metrics are plain
  text, not images, and have a `<span class="sr-only">` expanding short
  labels.
- **Perf:** `IntersectionObserver` is created lazily; disconnected on
  first intersection per chapter. No per-chapter event listeners after that.
- **SEO:** chapter ids are stable (used in TOC/Nav and sitemap anchors);
  each paragraph is real text (crawler-friendly).

## 8. Acceptance criteria

- [x] **Given** nine chapters in data, **When** the page renders, **Then**
      all nine are present in SSR HTML with correct heading hierarchy.
- [x] **Given** the user scrolls slowly, **When** a chapter enters, **Then**
      it fades in once and never re-animates on scroll back up.
- [x] **Given** reduced motion, **When** the page loads, **Then** all
      chapters are immediately visible.
- [x] **Given** a chapter has no artifacts, **When** rendered, **Then** the
      layout remains single-column cleanly (no empty slot).
- [x] Keyboard nav can jump directly to `#ch-03-method` via the Nav rail.

## 9. AI Prompt (Seed)

> Implement `components/Chapter.jsx` (Next.js 14 RSC + a tiny "use client"
> observer island). Props match the `Chapter` type in the data-model spec.
> Layout, motion, and a11y must satisfy §6 and §7 of
> `specs/features/chapter-narrative.spec.md`. Produce only
> `Chapter.jsx` and `Chapter.module.css`; do not modify shared tokens.

## 10. Out of scope

- Reading time estimates.
- "Share this chapter" buttons.
- Chapter-level comments.
