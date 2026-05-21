# Specifications — Krishan Mohan Portfolio

> **Every feature in this codebase was built from a spec in this folder.**
> The specs were written first, reviewed, then handed to an AI coding agent
> (Cursor / Claude) which implemented them. This folder is the source of truth.

This portfolio is intentionally a working demonstration of **Spec-Driven
Development (SDD)** — the same methodology I use at McKinsey & Company.
What you see at <https://krishanmohan.dev> was produced by following the loop
defined in [`WORKFLOW.md`](./WORKFLOW.md).

## Why specs, not tickets?

A Jira ticket says *what to do*. A spec says *what must be true when it's
done*. Specs are:

- **Testable** — every requirement maps to an acceptance criterion.
- **Reviewable** — an engineer, PM, or AI can argue about the spec before a
  single line of code is written.
- **Durable** — they outlive branches, sprints, and the engineer who wrote
  them. New hires (human or agent) onboard against the spec, not tribal
  knowledge.
- **AI-ready** — modern coding agents produce dramatically better code when
  given a precise spec instead of a loose prompt. 3–5× delivery speed is
  realistic once the team adopts the discipline.

## How to read this folder

```
specs/
├── README.md                       ← you are here
├── WORKFLOW.md                     ← the 5-step loop we follow
├── 01-product.spec.md              ← what we're building & why
├── 02-architecture.spec.md         ← tech stack, tradeoffs, boundaries
├── 03-data-model.spec.md           ← JSON profile schema
├── 04-seo.spec.md                  ← metadata / JSON-LD / sitemap strategy
├── 05-design-system.spec.md        ← colors, type, motion, tokens
├── features/
│   ├── hero-terminal.spec.md       ← boot-sequence Hero
│   ├── chapter-narrative.spec.md   ← story chapters + artifacts
│   ├── timeline.spec.md            ← career timeline
│   ├── services-palette.spec.md    ← command-palette services
│   ├── contact-console.spec.md     ← AI-console contact form
│   └── faq.spec.md                 ← FAQ + rich-snippet schema
├── acceptance-criteria.md          ← shipped-or-not checklist (NFRs)
└── prompt-library.md               ← reusable AI prompts derived from specs
```

## Reading order for a first review

1. **[`WORKFLOW.md`](./WORKFLOW.md)** — the methodology, in 5 steps.
2. **[`01-product.spec.md`](./01-product.spec.md)** — the vision & success
   metrics.
3. **[`02-architecture.spec.md`](./02-architecture.spec.md)** — the
   structural decisions and their tradeoffs.
4. Any individual feature spec under `features/` to see the pattern.

Every feature spec follows the same 10-section template so a reviewer can
skim by section number (Intent → Scope → Data Contract → Behavior → Visual →
NFRs → Acceptance → AI Prompt → Telemetry → Out-of-Scope).

## Status legend

| Status        | Meaning                                                   |
|---------------|-----------------------------------------------------------|
| `Draft`       | Spec is being written; no code yet.                       |
| `Ready`       | Spec is reviewed; AI agent can start implementation.      |
| `In Progress` | Implementation ongoing; spec may still receive amendments.|
| `Shipped`     | Code is merged, acceptance criteria pass, live in prod.   |
| `Sunset`      | Feature retired; spec kept for historical context.        |

All specs in this folder are currently **Shipped**.

## For the reviewer

- **If you are my manager** — this folder is the evidence that this entire
  portfolio (24 components, dynamic OG images, JSON-LD graph, sitemap, PWA
  manifest, 15+ accessibility checks) was built from specs first, code
  second. The same discipline is what I bring to enterprise frontend
  architecture program.
- **If you are an AI agent** — each feature spec is self-contained. Follow
  the "AI Prompt (Seed)" section at the bottom of any spec to generate a
  faithful implementation. Cross-cutting concerns (tokens, SEO, a11y) are
  normative and must be satisfied before a spec is marked Shipped.

— *Krishan Mohan, Frontend Architect*
