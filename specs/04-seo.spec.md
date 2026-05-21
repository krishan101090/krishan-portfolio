# 04 · SEO Spec — Metadata, Schema, Discoverability

| Field        | Value                       |
|--------------|-----------------------------|
| Status       | Shipped                     |
| Targets      | Google, Bing, DuckDuckGo, LinkedIn, Twitter/X, Facebook |

## 1. Intent

Every crawler that requests this site leaves with:
(a) a canonical URL it can index,
(b) enough structured data to render a **rich result** (Person, FAQ,
Breadcrumbs),
(c) a beautifully rendered preview card regardless of the sharing surface,
and (d) no ambiguity about which profile is the default.

## 2. Per-page metadata contract

Produced by `lib/metadata.js → buildMetadata(profile, path)`.

```ts
type PageMetadata = {
  title: { default: string; template: string };
  description: string;
  keywords: string[];
  authors: [{ name: string; url: string }];
  creator: string;
  publisher: string;
  applicationName: string;

  alternates: {
    canonical: string;
    languages: { 'en-US': string; 'x-default': string };
  };

  robots: {
    index: true; follow: true;
    googleBot: { index: true; follow: true; 'max-image-preview': 'large'; 'max-snippet': -1; 'max-video-preview': -1 };
  };

  openGraph: {
    type: 'profile';
    url: string;
    siteName: string;
    title: string;
    description: string;
    locale: string;
    images: [{ url: string; width: 1200; height: 630; alt: string }];
    profile: { firstName: string; lastName: string; username?: string };
  };

  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    creator?: string;
    images: string[];
  };

  verification?: { google?: string; bing?: string; yandex?: string };
  appleWebApp: { capable: true; statusBarStyle: 'black-translucent'; title: string };
  formatDetection: { email: false; telephone: false; address: false };
};
```

## 3. Structured data (JSON-LD)

Produced by `lib/schema.js → buildSchemas(profile, path)`. Emitted as
`<script type="application/ld+json">` with a single `@graph` containing:

1. **WebSite** — includes `potentialAction: SearchAction`.
2. **Person** — name, jobTitle, worksFor, skills (knowsAbout), languages,
   sameAs (LinkedIn, GitHub, site).
3. **ProfilePage** — `mainEntity` = the Person.
4. **BreadcrumbList** — Home › (slug, if subpath).
5. **ProfessionalService** — aggregated services as `OfferCatalog`.
6. **FAQPage** — matches the visible FAQ content exactly.
7. **ItemList** — services, for service-search rich results.

### Verification

Every schema must pass Google's
[Rich Results Test](https://search.google.com/test/rich-results) with zero
errors. At time of ship: **all 7 pass**.

## 4. Sitemap

- Generated dynamically by `app/sitemap.js`.
- Includes `/` and every `/[slug]` route.
- Each entry carries `alternates.languages` with `en-US` and `x-default`.
- `changeFrequency: 'monthly'`, `priority: 1.0` for root, `0.8` for slugs.

## 5. Robots

`app/robots.js` emits explicit per-agent rules:

| Agent                 | Allow      | Disallow     |
|-----------------------|------------|--------------|
| `*`                   | `/`        | `/api/`      |
| `Googlebot`           | `/`        | —            |
| `Googlebot-Image`     | `/`        | —            |
| `Bingbot`             | `/`        | —            |
| `DuckDuckBot`         | `/`        | —            |
| `Twitterbot`          | `/`        | —            |
| `facebookexternalhit` | `/`        | —            |
| `LinkedInBot`         | `/`        | —            |

## 6. Discoverability files

- `public/.well-known/security.txt` — vulnerability reporting channel.
- `public/humans.txt` — credits, stack, thanks.
- `app/manifest.js` — PWA manifest (name, short name, icons, theme).

## 7. Dynamic social imagery

- `app/opengraph-image.jsx` and `app/twitter-image.jsx` (root).
- `app/[slug]/opengraph-image.jsx` + `twitter-image.jsx` (per profile).
- Rendered via `next/og` using `lib/og.js → renderOgImage(profile)`.
- 1200 × 630, cyberpunk gradient + profile name + tagline + role.

**Invariant:** `background` shorthand is forbidden inside `next/og` JSX —
use `backgroundColor` + `backgroundImage` separately.

## 8. Content SEO rules (normative)

- Exactly **one `<h1>`** per page, placed in `Hero`.
- Heading hierarchy never skips levels.
- Every `<section>` has an `aria-labelledby` pointing to its heading id.
- `alt` text on every meaningful image; `alt=""` on decorative.
- Internal links use descriptive anchor text ("read the method") — never
  "click here".
- No text baked into images that is needed for ranking.
- Copy leads with the action verb the searcher is typing (e.g. "Hire a
  senior React architect" not "Looking for work").

## 9. Acceptance criteria

- [x] `view-source:` on `/` contains `<title>`, `<meta name="description">`,
      canonical, 2 OG images, 7 JSON-LD schemas in a single `@graph`.
- [x] Google Rich Results Test: Person, FAQ, Breadcrumbs all valid.
- [x] `/sitemap.xml` returns 200 with all profiles listed.
- [x] `/robots.txt` lists 8 agent-specific blocks.
- [x] PWA: manifest installable, icon appears on add-to-home-screen.
- [x] Social debuggers (LinkedIn Post Inspector, X Card Validator, FB
      Sharing Debugger) render the intended card.
- [x] Lighthouse SEO = 100.

## 10. Monitoring (post-ship)

- Google Search Console: weekly check of coverage + rich-result reports.
- Bing Webmaster Tools: weekly check of coverage.
- Page Speed Insights: weekly sampling, log regressions as spec
  amendments, not silent hotfixes.
