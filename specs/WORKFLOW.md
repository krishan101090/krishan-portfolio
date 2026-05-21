# Workflow — The Spec-Driven Loop

> **Every feature ships through these five gates.** No gate may be skipped.
> Every gate has a reviewable artifact that lives in git.

```
┌─────────┐   ┌────────┐   ┌──────────┐   ┌────────┐   ┌──────┐
│  SPEC   │──▶│ PROMPT │──▶│ GENERATE │──▶│ VERIFY │──▶│ SHIP │──┐
└─────────┘   └────────┘   └──────────┘   └────────┘   └──────┘  │
     ▲                                                            │
     └──────────────── learnings feed next spec ──────────────────┘
```

---

## Gate 1 — SPEC

**Output:** a Markdown spec in `specs/` following the 10-section template.

Before anyone (or any AI) writes code, we write down *what must be true when
this is done*. The spec must answer:

1. **Intent** — one sentence, user-facing.
2. **User Story** — who benefits, from what, why it matters.
3. **Scope** — what is *in*, what is explicitly *out*.
4. **Data Contract** — TypeScript types + one realistic example.
5. **Behavior / States** — state machine, edge cases, error handling.
6. **Visual Requirements** — layout grid, color tokens, motion.
7. **Non-Functional Requirements** — a11y, perf, SEO, responsive.
8. **Acceptance Criteria** — Given / When / Then, testable.
9. **AI Prompt (Seed)** — the prompt we'd paste into Cursor/Claude.
10. **Telemetry / Verification** — how production tells us it works.

**Exit condition:** a reviewer can predict, from the spec alone, roughly what
the shipped UI and code will look like.

---

## Gate 2 — PROMPT

**Output:** the concrete prompt handed to the AI agent (Cursor Composer,
Claude, GPT, Devin — model of choice).

A prompt is *the spec + context*. Context =

- Repo layout (file tree).
- Coding conventions (eslint, prettier, component patterns).
- Prior art in this codebase (similar components, shared utilities).
- Constraints pulled forward from section 7 of the spec (a11y, perf, SEO).

Prompts are saved in [`prompt-library.md`](./prompt-library.md) so they can
be reused and improved across features.

**Exit condition:** the prompt is self-sufficient — a new AI session with no
conversation history could produce correct output from it.

---

## Gate 3 — GENERATE

**Output:** a branch / PR produced by the AI, containing:

- Implementation file(s).
- Tests (unit, RTL, e2e where relevant).
- Inline docs where non-obvious.
- Any necessary changes to the shared design system or types.

The engineer does **not** type the implementation. The AI does. The engineer
reviews the diff, pushes back on every deviation from the spec, and
iterates in-place until the diff is faithful.

**Exit condition:** the generated PR diffs only the files the spec said
would be touched; no drive-by changes.

---

## Gate 4 — VERIFY

**Output:** a green CI run + a human signoff.

Verification is the engineer's *highest-value* moment in this workflow.
What is being verified:

| Layer                | How                                                        |
|----------------------|------------------------------------------------------------|
| Behavior             | Every Given/When/Then from the spec is a test.             |
| Types                | `tsc --noEmit` passes.                                     |
| Lint / format        | `eslint` + `prettier` pass.                                |
| Accessibility        | Axe / Lighthouse a11y ≥ 95.                                |
| Performance          | LCP < 2.5s, INP < 200ms, CLS < 0.1 on a cold 4G device.    |
| SEO                  | Metadata, canonical, JSON-LD rendered in SSR HTML.         |
| Visual regression    | Chromatic / Percy diff on Storybook stories.               |
| Manual taste review  | Does it feel right? Does the copy land? Does the motion breathe? |

**Exit condition:** every item above is green. If any is red, the loop
returns to Gate 3 with a refined prompt, not a hotfix typed by hand.

---

## Gate 5 — SHIP

**Output:** a merged commit on `main`, an auto-deploy, and a postmortem
line added to [`acceptance-criteria.md`](./acceptance-criteria.md).

Shipping is the cheapest gate. If Gates 1–4 were respected, Gate 5 is
uneventful — `git push origin main` and the Vercel preview becomes
production.

The team then completes one loop-closing action: *what did we learn that
should change the next spec?* Examples from this project:

- "Every section needs an `aria-labelledby` — promote to the cross-cutting
  NFR template." (Learned while building Chapter; applied to all subsequent
  specs.)
- "Dynamic OG images via `next/og` must use `backgroundColor` + `backgroundImage`,
  not the `background` shorthand — the renderer rejects it." (Learned during
  the first production build; recorded in the OG prompt.)
- "Timeline items can repeat a year; React keys must include index."
  (Learned during QA of the accurate-career-history update; encoded in the
  Timeline spec.)

**Exit condition:** the lesson is captured somewhere a future spec will
encounter it.

---

## Cadence

For a portfolio this size (about 24 components, 6 days of elapsed time), the
loop produced ~1 merged feature every 2 hours of focused work. The
rate-limiting step is almost never code generation — it is *Gate 1 (writing
a good spec)* and *Gate 4 (honest review of the generated diff)*.

That is the point. Spec-Driven Development does not make engineers type
faster. It moves the engineer's attention **up the stack** — away from
syntax, toward intent, contracts, constraints, and taste.

The AI is the craftsman. The spec is the blueprint. The engineer is the
architect.
