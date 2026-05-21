# Feature · Services (Command Palette)

| Field       | Value                             |
|-------------|-----------------------------------|
| Status      | Shipped                           |
| Component   | `components/Services.jsx`         |
| Data source | `profile.services[]`              |

## 1. Intent

Present hireable services as a **command palette** — the same UI senior
engineers use 50 times a day — so the visitor reads the offer as "a tool I
can invoke", not "a sales pitch".

## 2. User story

As a prospective client, I want to quickly identify which service matches
my need, scan deliverables, and click through to a contact flow pre-
populated with that service.

## 3. Scope

**In:** 3–6 services, each with tag, title, description, deliverables
bullet list, engagement type, optional price, and CTA.
**Out:** case studies (separate future page), testimonials (future), a
multi-step quote wizard.

## 4. Data contract

See `specs/03-data-model.spec.md` §3.5 for the `Service` type.

## 5. Behavior / states

| State                | Behavior                                                       |
|----------------------|----------------------------------------------------------------|
| Default              | List of services as palette rows (tag pill, title, description). |
| Hover / focus        | Row lifts 2px; accent border-left appears; CTA becomes visible. |
| Click CTA            | Navigates to `#contact` with `?service=<id>` query param.      |
| Contact prefill      | The Contact form reads `searchParams.service` and pre-selects that service in its dropdown. |

## 6. Visual

- Palette frame: glass card, rounded `16px`, subtle inner border.
- Header row shows `⌘K  services.hire( )` in mono (decorative).
- Each row: 3-column grid on desktop (tag | title+desc | CTA); collapses
  to stacked on `sm`.
- Tag pill: uppercase mono, `0.72rem`, accent border, no fill.
- Deliverables appear below title as `<ul>` with `›` markers.
- Price (if present) in mono amber, e.g. `from $6k`.

## 7. Non-functional requirements

- **A11y:** each row is a `<a>` link, not a `<div>` with a click. Tag is
  decorative (`aria-hidden`). Focus ring clearly visible.
- **Perf:** zero JS — pure CSS hover/focus states. The prefill is handled
  by the Contact component reading `searchParams`.
- **SEO:** each service title appears as `<h3>` for schema extraction; the
  full services array is mirrored into `ProfessionalService.hasOfferCatalog`
  (see `lib/schema.js`).

## 8. Acceptance criteria

- [x] **Given** 4 services in data, **When** the page loads, **Then** 4
      rows render in SSR HTML with correct `<h3>` titles.
- [x] **Given** the user clicks a row's CTA, **When** navigation completes,
      **Then** the page anchors to `#contact` and the service dropdown is
      set to the chosen service's `id`.
- [x] **Given** a service lacks `priceFrom`, **When** rendered, **Then**
      no empty price node appears.
- [x] Keyboard: `Tab` cycles through rows in authored order; `Enter`
      activates.
- [x] All services appear in JSON-LD `ItemList` and `ProfessionalService`.

## 9. AI Prompt (Seed)

> Build `components/Services.jsx` using CSS Modules, palette aesthetic per
> §6. Props: `{ services: Service[] }`. Each row must be an `<a href>` to
> `#contact?service=<id>`. Visible `<h3>` for each title. No client JS.
> Satisfy §7 a11y and §8 acceptance fully.

## 10. Out of scope

- Live availability calendar inline.
- Bundle pricing / combo deals.
- Testimonial carousel inside a service row.
