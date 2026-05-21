# Feature · Career Timeline

| Field       | Value                                |
|-------------|--------------------------------------|
| Status      | Shipped                              |
| Component   | `components/Timeline.jsx`            |
| Data source | `profile.timeline[]`                 |

## 1. Intent

A single scroll-revealed, chronological column that communicates **depth of
experience** — 10 years, 6 companies, one consistent direction — without
turning into a CV dump.

## 2. User story

As a recruiter, I want to glance the timeline and confirm tenure,
employers, locations, and the trajectory toward AI-native work in under 15
seconds.

## 3. Scope

**In:** year, role/company/location blurb, optional date range, optional
highlight blurb appended to the event string.
**Out:** logos, photos, external links within entries (avoid visual noise).

## 4. Data contract

```ts
type TimelineEntry = {
  year: string;    // "2022"; may repeat across entries
  event: string;   // "Role · Company · Location · blurb"
  range?: string;  // "Oct 2022 — Apr 2025"
};
```

**Invariant:** `year` may repeat (one company across multiple calendar
years is fine, and two events in one year are allowed). React keys MUST be
composite: `` `${year}-${index}` ``.

## 5. Behavior / states

| State        | Trigger                                   | Visual                              |
|--------------|-------------------------------------------|-------------------------------------|
| `hidden`     | pre-intersection                          | column opacity 0                    |
| `revealing`  | enters viewport                           | staggered fade (index × 60ms)       |
| `shown`      | settled                                   | final state; observer disconnected  |
| `reduced-motion` | media query                           | render fully immediately            |

## 6. Visual

- Left rail: vertical line `1px` dashed `--line` with a glowing dot at each
  entry in the accent color.
- Year: mono, `0.9rem`, `--ink-2`, fixed 80px column.
- Event: `--ink-0`, body text; wraps to 2–3 lines comfortably.
- Range (optional): mono, `0.8rem`, `--ink-2`, appears on the line below
  event with a subtle `—` prefix.
- Hover: dot enlarges from `8px` → `10px`, accent glow via drop-shadow.
- Mobile: collapses to a cleaner single-column stack, rail moves to a
  `::before` pseudo on each item.

## 7. Non-functional requirements

- **A11y:** list semantics — `<ol>` with each entry `<li>`. Year exposed
  via `<time datetime>`, range via `<span aria-label="…">`.
- **Perf:** single `IntersectionObserver` on the list root, not per item.
- **SEO:** the full list is SSR'd. Roles and company names must match the
  Person JSON-LD's `hasOccupation` entries.

## 8. Acceptance criteria

- [x] **Given** a timeline with 8 entries, **When** the page renders,
      **Then** exactly 8 `<li>` elements are present in SSR HTML in the
      authored order.
- [x] **Given** two entries in the same year, **When** rendered, **Then**
      both appear and neither React key warns.
- [x] **Given** an entry has `range`, **When** rendered, **Then** the
      range appears beneath the event text in the muted style.
- [x] **Given** an entry has no `range`, **When** rendered, **Then** no
      empty row or placeholder appears.
- [x] Keyboard tab order moves through each entry in order.

## 9. AI Prompt (Seed)

> Build `components/Timeline.jsx` + its CSS Module. Props:
> `{ items: TimelineEntry[] }`. Satisfy §6 (visual), §7 (a11y, perf, SEO),
> §8 (acceptance). Use the `.range` class for the optional date line; do
> not add new tokens. React keys must be `` `${item.year}-${i}` ``.

## 10. Out of scope

- Logos for companies (legal and design noise).
- Click-through to external case studies — that's the Services section's
  job.
- Filter controls — the list is short enough that filtering adds no value.
