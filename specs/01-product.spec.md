# 01 · Product Spec — Krishan Mohan Portfolio

| Field        | Value                                 |
|--------------|---------------------------------------|
| Status       | Shipped                               |
| Author       | Krishan Mohan                         |
| Last updated | 2026-04-17                            |
| Success URL  | <https://krishanmohan.dev>            |

## 1. Intent

A scroll-driven, AI-native story that converts senior frontend hiring
managers and prospective freelance clients into a **scheduled call** within
90 seconds of landing.

## 2. Problem

Standard engineer portfolios read like a CV. They list tools and titles.
They do not tell a **story**, they do not **prove seniority**, and they do
not **differentiate** an AI-native architect from a 2015-era React
developer. In a market flooded with frontend developers, undifferentiated
portfolios get skimmed and closed.

## 3. Users

| Persona                  | Goal on this site                              | Success                   |
|--------------------------|------------------------------------------------|---------------------------|
| Hiring manager           | Assess seniority + AI fluency in < 2 min       | Books a call              |
| Recruiter                | Grab keywords, CV, contact                     | Sends outreach            |
| Prospective client       | Decide if I can ship their project             | Submits contact form      |
| Peer / community member  | Read the narrative, share it                   | Shares the link           |
| Search engine crawler    | Understand identity + services for ranking     | Rich result in SERP       |

## 4. Non-users (out of scope)

- Junior developers looking for tutorials.
- Recruiters screening for offshore contractors (pricing-sensitive).
- Mobile-app clients (this is a web/frontend architecture portfolio).

## 5. Success metrics

| Metric                                            | Target (90 days)     |
|---------------------------------------------------|----------------------|
| LCP (cold, 4G)                                    | < 2.5 s              |
| INP                                               | < 200 ms             |
| CLS                                               | < 0.1                |
| Lighthouse Performance / SEO / A11y               | ≥ 95 all three       |
| Scroll depth ≥ 75%                                | ≥ 40% of sessions    |
| Contact form submissions OR calendar bookings / wk| ≥ 2                  |
| SERP rich-result coverage (Person, FAQ)           | 100% indexed         |
| Avg session duration                              | ≥ 90 s               |

## 6. Principles

1. **Narrative over résumé** — tell the story of why AI-native matters, not
   what frameworks I know.
2. **Every scroll earns itself** — each chapter adds information or tension;
   no filler.
3. **Proof over claims** — every "I did X" is backed by an artifact the
   visitor can verify (repo, live URL, metric).
4. **API-driven content** — a single JSON file drives the whole site, so
   re-skinning for a second profile or client takes minutes, not days.
5. **Performance is aesthetic** — fast load is part of the design. Nothing
   blocks the first pixel.
6. **Accessibility is non-negotiable** — every chapter passes keyboard +
   screen-reader review before ship.

## 7. Content inventory

The narrative is split into **8 chapters** driven by `data/profiles/*.json`:

1. **Hero / Boot sequence** — terminal-style identity card.
2. **The old way** — engineer-typing-every-character problem framing.
3. **The awakening** — first AI co-pilot workflows.
4. **The method** — spec-driven development loop visualization.
5. **The stack** — AI tools in active use.
6. **The archive** — career timeline.
7. **Services** — what I offer, priced or scoped.
8. **Contact console** — AI-themed contact form.

A **FAQ** section provides rich-snippet content for SERP.

## 8. Content governance

Content changes land in `data/profiles/krishan.json`. No code change is
required to update copy. The profile schema is versioned and validated at
build time (see [`03-data-model.spec.md`](./03-data-model.spec.md)).

## 9. Acceptance criteria (product)

- [x] One JSON edit can re-skin the entire site for a second profile.
- [x] Site renders with JavaScript disabled (SSR of all narrative content).
- [x] All 8 chapters pass Axe a11y with zero violations.
- [x] Lighthouse ≥ 95 on Performance, SEO, Best Practices, Accessibility.
- [x] JSON-LD: `Person`, `ProfessionalService`, `FAQPage`, `WebSite`,
      `ProfilePage`, `BreadcrumbList`, `ItemList` all present and validate
      in Google's Rich Results Test.
- [x] Contact CTA reachable within one scroll / tap from any chapter.

## 10. Risks

| Risk                                            | Mitigation                                         |
|-------------------------------------------------|----------------------------------------------------|
| AI-generated copy sounds generic                | All copy is human-edited; voice guide in design spec. |
| Site feels "too designed" for enterprise hirers | Content stays technical; aesthetic = signal, not noise. |
| Multiple profiles dilute SEO                    | Each profile has its own canonical + OG + JSON-LD. |
