# 05 · Design System Spec — Cyberpunk Narrative UI

| Field        | Value                 |
|--------------|-----------------------|
| Status       | Shipped               |
| Tokens file  | `app/globals.css`     |

## 1. Intent

An interface that reads as "an engineer's console, three years from now" —
dark, luminous, typographic, restrained with motion. The aesthetic must
signal **seniority + AI-native craft** without tipping into
"Figma template".

## 2. Palette (CSS variables)

| Token              | Hex       | Role                              |
|--------------------|-----------|-----------------------------------|
| `--bg-0`           | `#04050a` | base canvas                       |
| `--bg-1`           | `#0a0d18` | card / raised surfaces            |
| `--bg-2`           | `#111728` | inputs, deepest raised            |
| `--ink-0`          | `#e8ecff` | primary text                      |
| `--ink-1`          | `#a6b0cf` | secondary text                    |
| `--ink-2`          | `#6b7391` | muted labels                      |
| `--accent-cyan`    | `#00e5ff` | primary accent                    |
| `--accent-magenta` | `#ff2e9a` | counter-accent                    |
| `--accent-amber`   | `#f5b301` | sparing callouts (metrics)        |
| `--line`           | `rgba(232,236,255,.08)` | dividers              |
| `--danger`         | `#ff5169` | error states                      |
| `--success`        | `#28e07b` | confirmation states               |

### Usage rules

- 3 accents maximum per viewport. Never mix cyan + magenta in the same
  block for body text — use one as text, one as accessory.
- Body text is always `--ink-0` on `--bg-0` or `--bg-1`; contrast ≥ 7:1
  (AAA).
- Muted text is always `--ink-1` on `--bg-0`; contrast ≥ 4.5:1 (AA).

## 3. Typography

| Role              | Family                                       | Size (desktop) | Weight |
|-------------------|----------------------------------------------|----------------|--------|
| Display           | `"Space Grotesk", sans-serif`                | `clamp(3rem, 7vw, 5.5rem)` | 600 |
| H2 (chapter)      | `"Space Grotesk"`                            | `clamp(2rem, 4vw, 3rem)`   | 600 |
| Body              | `"Inter", sans-serif`                        | `1rem` / `1.125rem`        | 400/500 |
| Mono / terminal   | `"JetBrains Mono", ui-monospace, monospace`  | `0.95rem`                  | 400/500 |

- One font family per role; no decorative fonts.
- Line-height: body `1.65`, display `1.05`, mono `1.55`.
- Fonts preloaded (`rel="preload"`) with `font-display: swap`.

## 4. Spacing scale

Base unit: `8px`. Scale: `4, 8, 12, 16, 24, 32, 48, 64, 96, 128`.
Expose as `--space-1`…`--space-10`.

**Rule:** no spacing value is typed as a raw px/rem in a component; it
must resolve to a token. Exception: micro-adjustments inside SVGs.

## 5. Layout grid

- Max content width: `1200px`.
- Gutter: `clamp(16px, 4vw, 48px)`.
- Chapter columns: 12-col CSS grid; narrative text spans 1–8, artifacts
  span 8–13.
- Vertical rhythm: every section has `padding-block: clamp(6rem, 10vh, 9rem)`.

## 6. Motion

- **Duration tokens:** `--dur-xs 120ms`, `--dur-sm 240ms`, `--dur-md 420ms`,
  `--dur-lg 700ms`.
- **Easing:** `--ease-out: cubic-bezier(.2,.8,.2,1);` default for reveals.
- **Reveal pattern:** elements start `opacity: 0; translateY(14px)`, fade
  in on `IntersectionObserver` with a `root-margin: 0px 0px -10% 0px`.
- **Respect `prefers-reduced-motion: reduce`** — disable reveals, disable
  background canvas animation, keep transitions ≤ 120ms.

## 7. Effects

- **Glassmorphism** allowed only on nav + console card:
  `backdrop-filter: blur(14px) saturate(1.2); background: rgba(10,13,24,.55); border: 1px solid var(--line);`
- **Noise overlay** (`app/globals.css`): 4% opacity SVG-noise fixed behind
  everything; disabled on reduce-motion.
- **Radial-gradient ambient:** two fixed gradients (cyan top-left, magenta
  bottom-right), `opacity: 0.18`. Never moves — parallax is a CLS hazard.
- **Glow:** accent glows via `filter: drop-shadow(0 0 18px var(--accent))`.
  Never `box-shadow: 0 0 999px` — destroys paint performance.

## 8. Components taxonomy

| Primitive       | Examples                          |
|-----------------|-----------------------------------|
| `Eyebrow`       | "CH. 03 · THE METHOD"             |
| `Heading`       | H1/H2/H3 with token-driven sizes  |
| `Prose`         | paragraph blocks in narrative     |
| `Metric`        | big number + label (artifacts)    |
| `Tag`           | pill for skills / stack           |
| `Card`          | generic raised surface            |
| `Terminal`      | mono block with prompt + output   |
| `Button`        | primary (cyan fill), ghost (border) |
| `InputConsole`  | monospace input with glowing caret |

Every primitive is a file under `components/` or a class-set in
`globals.css`. No primitive is inline-defined twice.

## 9. Iconography

- SVG only; stroke width `1.5px`; rounded caps/joins.
- Monochrome, inherits `currentColor`.
- Accent used sparingly — e.g. only the "active" icon in Nav.

## 10. Responsive breakpoints

| Name   | Width   | Behavior                                           |
|--------|---------|----------------------------------------------------|
| `xs`   | < 480   | single column; stack artifacts below prose        |
| `sm`   | 480–768 | single column; larger touch targets               |
| `md`   | 768–1024| 2-col where design calls for it                   |
| `lg`   | 1024–1440| 12-col grid as designed                          |
| `xl`   | ≥ 1440  | max-width clamps; no new content, just breathing  |

## 11. Accessibility rules (normative)

- All interactive elements have a visible focus ring:
  `outline: 2px solid var(--accent-cyan); outline-offset: 3px;`
- No reliance on color alone to convey state (always pair with text/icon).
- All animated elements honor `prefers-reduced-motion`.
- Nav includes a "Skip to content" link as the first tabbable element.
- Contrast ratios verified per palette entry (see §2).

## 12. Don'ts

- No drop-caps, no underlined text (confused with links), no italics in
  headings.
- No hover-only interactions on touch devices.
- No autoplay video / audio anywhere, ever.
- No modal on page load.
- No "cookie banner" — site uses zero cookies.
