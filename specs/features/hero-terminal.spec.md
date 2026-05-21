# Feature · Hero Terminal (Boot Sequence)

| Field        | Value                            |
|--------------|----------------------------------|
| Status       | Shipped                          |
| Component    | `components/Hero.jsx`            |
| Data source  | `profile.person`, `profile.boot` |

## 1. Intent

In the first 1.5 seconds after the page paints, the visitor sees a
**terminal booting an identity** — commands are typed and answered, landing
on "begin story" which scrolls to Chapter 01.

## 2. User story

As a hiring manager landing from LinkedIn, I want the first screen to
instantly signal "this is a senior, AI-native frontend engineer" so that I
stay to read.

## 3. Scope

**In:** animated terminal (typed commands + outputs), name, tagline, role,
"Begin Story" scroll CTA, availability pill.
**Out:** contact form (that's Chapter 08), project links (Chapter 07),
social icons (in Nav).

## 4. Data contract

```ts
profile.person: {
  name: string;
  alternateName?: string;
  tagline: string;
  jobTitle: string;
  currentRole: string;
  currentCompany: string;
  currentCompanyVia?: string;
};

profile.boot: {
  title: string;                  // "SESSION_001.boot"
  commands: Array<{ cmd: string; out: string }>;  // 3–5 items
  tagline: string;                // one-sentence thesis
  scrollHint: string;             // CTA label, e.g. "BEGIN STORY"
};
```

## 5. Behavior / states

| State            | Trigger                          | Visual                                    |
|------------------|----------------------------------|-------------------------------------------|
| `idle`           | mount, motion OK                 | terminal frame visible, content hidden    |
| `typing`         | 200ms after mount                | each command types char-by-char           |
| `output`         | command done                     | output line fades in                      |
| `complete`       | last command's output done       | name, tagline, CTA fade in                |
| `reduced-motion` | `prefers-reduced-motion: reduce` | skip typing — render fully immediately    |

- Typing speed: `24ms/char` with ±8ms jitter.
- Inter-command pause: `350ms`.
- Blinking caret after last output until user scrolls.
- CTA scrolls to `#chapter-01` with `behavior: 'smooth'`; falls back to
  hash change if smooth unsupported.

## 6. Visual

- Terminal chrome: rounded `12px`, 1px `--line` border, glass card.
- Three traffic-light dots (muted, decorative only) + `boot.title` in mono.
- Commands colored by type:
  - `$` prompt: `--ink-2`
  - command body: `--accent-cyan`
  - output: `--ink-0`
- Name set in display font, `clamp(3rem, 7vw, 5.5rem)`.
- Tagline in `--ink-1`, `1.125rem`, max 60ch.
- CTA button: ghost variant, cyan border, down-arrow icon, monospace label.

## 7. Non-functional requirements

- **A11y:**
  - `<section aria-labelledby="hero-heading">` with the name as `<h1
    id="hero-heading">`.
  - Typing is purely visual; the full terminal contents are present in the
    DOM from first render (screen readers see the complete text).
  - CTA has `aria-label="Begin story — scroll to chapter one"`.
- **Perf:**
  - Component is a client component only because of the typing animation;
    the surrounding section is RSC-rendered with the full text pre-filled,
    so SSR HTML ships the name & tagline.
  - Typing uses `requestAnimationFrame`-throttled setState, no
    `setInterval(… 16ms)`.
  - No layout-shifting content; the terminal reserves its final height via
    `min-height` before content mounts.
- **SEO:** `<h1>` renders the person's name verbatim; no text is image-only.

## 8. Acceptance criteria

- [x] **Given** the page loads, **When** motion is enabled, **Then** each
      `boot.commands[i].cmd` types, the output appears, and the next line
      starts within 350ms.
- [x] **Given** `prefers-reduced-motion: reduce`, **When** the page loads,
      **Then** the terminal is fully populated with no animation.
- [x] **Given** the CTA is clicked or Enter-pressed, **When** focus is on
      it, **Then** the viewport scrolls to Chapter 01 and focus is moved
      to that chapter's heading.
- [x] **Given** JS is disabled, **When** the page loads, **Then** the full
      terminal text and `<h1>` are visible (SSR fallback).
- [x] Lighthouse a11y on this section ≥ 98.
- [x] CLS contribution from Hero = 0 (reserved height).

## 9. AI Prompt (Seed)

> Build a React component `Hero` for a Next.js 14 App Router project using
> CSS Modules. Props: `{ person, boot }` matching the types in
> `specs/03-data-model.spec.md` §3.2 and `specs/features/hero-terminal.spec.md`
> §4. Behavior must match §5 (typing with rAF, reduced-motion fallback).
> Visual tokens come from `app/globals.css` (see `specs/05-design-system.spec.md`).
> Must satisfy all acceptance criteria in §8. Do not introduce any new
> dependency. Return only the component file and its CSS module.

## 10. Telemetry / out of scope

- **Telemetry:** scroll-depth past Hero is logged via Vercel Analytics
  custom event `hero_passed`.
- **Out of scope:** cursor trails, hero video, particle effects beyond the
  site-wide noise overlay.
