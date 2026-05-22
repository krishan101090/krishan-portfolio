import { DEFAULT_PROFILE_SLUG } from '@/lib/profiles'
import { canonicalUrl, socialImageUrl } from '@/lib/seo-helpers'

export function buildSchemas(profile, { path = '/' } = {}) {
  const { person, seo, services = [], faqs = [], aiStack = [], resumes = [] } = profile
  const base = seo.siteUrl.replace(/\/$/, '')
  const canonical = canonicalUrl(base, path, profile.slug, DEFAULT_PROFILE_SLUG)
  const socialImage = socialImageUrl(base, path === '/' || profile.slug === DEFAULT_PROFILE_SLUG ? '/' : path)
  const personImage = person.photo ? `${base}${person.photo}` : socialImage
  const lastModified = seo.lastModified || '2026-05-22'

  const personId = `${base}/#person-${profile.slug}`
  const websiteId = `${base}/#website`
  const pageId = `${canonical}#page`

  const sameAs = [person.linkedin, person.github]
    .filter(Boolean)
    .concat(seo.twitter ? [`https://twitter.com/${seo.twitter.replace('@', '')}`] : [])

  const displayTitle = person.currentRole || person.jobTitle
  const employer = person.currentCompanyVia
    ? `${person.currentCompany} (${person.currentCompanyVia})`
    : person.currentCompany

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': personId,
    name: person.name,
    alternateName: person.alternateName,
    url: canonical,
    image: personImage,
    jobTitle: displayTitle,
    description: person.tagline || seo.description,
    worksFor: {
      '@type': 'Organization',
      name: person.currentCompany,
      url: person.currentCompanyUrl,
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: displayTitle,
      occupationalCategory: person.professionalHeadline || person.jobTitle,
      skills: (person.skills || []).join(', '),
    },
    knowsAbout: [...(person.skills || []), ...aiStack.map((a) => a.name)],
    knowsLanguage: person.languages,
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.locality,
      addressRegion: person.region,
      addressCountry: person.countryName || person.country,
    },
    sameAs,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: `${base}/`,
    name: `${person.name} — ${person.jobTitle}`,
    description: seo.description,
    inLanguage: 'en-US',
    publisher: { '@id': personId },
  }

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': pageId,
    url: canonical,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    dateModified: lastModified,
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: socialImage,
      width: 1200,
      height: 630,
    },
    significantLink: [person.linkedin, person.github, ...(resumes || []).map((r) => `${base}${r.href}`)].filter(
      Boolean,
    ),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `${base}/` }],
  }

  const expertiseSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${person.name} — Areas of Expertise`,
    description: `Professional expertise of ${person.name}, ${displayTitle} at ${employer}.`,
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: s.title,
      description: s.desc,
    })),
  }

  const faqSchema = faqs.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }
    : null

  return [websiteSchema, personSchema, profilePageSchema, breadcrumbSchema, expertiseSchema, faqSchema].filter(Boolean)
}
