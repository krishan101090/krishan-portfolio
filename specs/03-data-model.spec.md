# 03 · Data Model Spec — Profile Schema

| Field        | Value                           |
|--------------|---------------------------------|
| Status       | Shipped                         |
| Source files | `data/profiles/*.json`          |
| Loaded by    | `lib/profiles.js`               |

## 1. Intent

A single JSON object describes **everything a rendered profile needs**:
identity, narrative chapters, timeline, services, contact channels, FAQ,
and SEO metadata. No field is computed at render time that could be
authored instead.

## 2. Top-level shape

```ts
type Profile = {
  slug: string;              // kebab-case; also the URL segment
  seo: SEO;                  // title, description, keywords, OG alt, locale
  person: Person;            // identity, contact, skills, current role
  boot: Boot;                // hero terminal content
  chapters: Chapter[];       // ordered narrative (≤ 9)
  spec: SpecFlow;            // visualization of the spec-driven loop
  stack: AITool[];           // AI tools in active use
  timeline: TimelineEntry[]; // chronological career
  services: Service[];       // what can be hired
  contact: ContactConsole;   // AI-themed contact form content
  faqs: FAQ[];               // rich-snippet Q&A
};
```

## 3. Field contracts

### 3.1 `seo`

```ts
type SEO = {
  title: string;        // ≤ 60 chars, ends with site brand
  shortTitle: string;   // for <title> on narrow viewports / OG
  description: string;  // 150–160 chars, action verb first
  keywords: string[];   // ≥ 6, ≤ 15, long-tail first
  ogAlt: string;        // alt text for OG image
  locale: string;       // BCP-47, e.g. "en_US"
};
```

### 3.2 `person`

```ts
type Person = {
  name: string;
  alternateName?: string;
  tagline: string;             // one-liner shown in hero
  email: string;
  phone?: string;
  location: string;            // "City, Region"
  region?: string;
  countryName?: string;
  jobTitle: string;            // current
  currentRole: string;         // human-friendly current role
  currentCompany: string;
  currentCompanyUrl?: string;
  currentCompanyVia?: string;  // staffing partner, if any
  previousCompany?: string;
  yearsExperience: number;
  languages: string[];
  skills: string[];            // ≥ 10; ordered by relevance
  linkedin: string;            // full URL
  github?: string;
  githubHandle?: string;
  website?: string;
};
```

### 3.3 `chapters`

```ts
type Chapter = {
  id: string;              // unique within profile
  order: number;           // 1..n, no gaps
  eyebrow: string;         // small label (e.g. "CH. 03 · THE METHOD")
  title: string;           // H2
  paragraphs: string[];    // ≥ 1
  artifacts?: Artifact[];  // optional call-outs, metrics, links
  accent?: 'cyan' | 'magenta' | 'amber';  // visual tone
};

type Artifact =
  | { type: 'metric'; label: string; value: string; }
  | { type: 'quote';  text: string; author?: string; }
  | { type: 'link';   href: string; label: string; }
  | { type: 'code';   lang: string; body: string; };
```

### 3.4 `timeline`

```ts
type TimelineEntry = {
  year: string;     // "2022"; may repeat across entries
  event: string;    // "Role · Company · Location · (optional blurb)"
  range?: string;   // "Oct 2022 — Apr 2025"
};
```

**Invariant:** React keys must be `` `${year}-${index}` `` because `year`
repeats.

### 3.5 `services`

```ts
type Service = {
  id: string;
  title: string;
  tag: string;           // short (≤ 2 words)
  description: string;
  deliverables: string[];
  engagement: 'project' | 'retainer' | 'advisory';
  priceFrom?: string;    // "$6k" etc.; optional
  cta: { href: string; label: string };
};
```

### 3.6 `faqs`

```ts
type FAQ = {
  q: string;   // ≤ 100 chars, ends with "?"
  a: string;   // 1–3 sentences
};
```

FAQs are rendered visibly *and* serialized into `FAQPage` JSON-LD. The two
must be character-identical; no marketing-only copy in schema.

## 4. Validation

Runtime validation happens in `lib/profiles.js` at cache-load time. A
profile that fails validation logs and is excluded from `getAllProfiles()`.
CI fails the build if any profile in `data/profiles/` is invalid.

### Minimum invariants

- `slug` matches `/^[a-z0-9-]+$/`.
- `chapters.length >= 1` and `order` is a permutation of `1..n`.
- `seo.description.length` in `[140, 170]`.
- `seo.keywords.length` in `[6, 15]`.
- `person.email` is a valid email.
- `services.length >= 1`.
- `faqs.length >= 3` (for rich-snippet eligibility).

## 5. Example

A full, canonical example lives at
[`data/profiles/krishan.json`](../data/profiles/krishan.json). A secondary
example (for multi-profile proof) lives at
[`data/profiles/jane.json`](../data/profiles/jane.json).

## 6. Adding a new profile

1. Copy `krishan.json` → `new-person.json`.
2. Edit fields. Run `npm run validate-profiles` (TODO CLI).
3. Push. Next deploy auto-picks up the new slug at `/new-person`.

No code change. No CMS. Full SEO + OG + JSON-LD regenerated.

## 7. Evolution

When fields are added they MUST be optional, and every reader (`Portfolio`,
`buildMetadata`, `buildSchemas`) MUST tolerate their absence. Breaking
renames require a version field and a migration script.
