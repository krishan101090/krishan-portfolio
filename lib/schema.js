export function buildSchemas(profile, { path = '/' } = {}) {
  const { person, seo, services = [], faqs = [], aiStack = [], timeline = [], chapters = [] } = profile
  const base = seo.siteUrl.replace(/\/$/, '')
  const url = `${base}${path}`
  const ogImage = `${url.endsWith('/') ? url.slice(0, -1) : url}/opengraph-image`

  const personId = `${base}/#person-${profile.slug}`
  const websiteId = `${base}/#website`
  const pageId = `${url}#page`
  const orgId = `${base}/#organization`

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
    url: base,
    image: ogImage,
    email: `mailto:${person.email}`,
    telephone: person.phone,
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
    knowsAbout: [
      ...(person.skills || []),
      ...aiStack.map((a) => a.name),
    ],
    knowsLanguage: person.languages,
    address: {
      '@type': 'PostalAddress',
      addressLocality: person.locality,
      addressRegion: person.region,
      addressCountry: person.country,
    },
    sameAs,
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': websiteId,
    url: base,
    name: `${person.name} — ${person.jobTitle}`,
    description: seo.description,
    inLanguage: 'en-US',
    publisher: { '@id': personId },
    potentialAction: {
      '@type': 'SearchAction',
      target: `${base}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': pageId,
    url,
    name: seo.title,
    description: seo.description,
    inLanguage: 'en-US',
    isPartOf: { '@id': websiteId },
    about: { '@id': personId },
    mainEntity: { '@id': personId },
    dateModified: new Date().toISOString(),
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: ogImage,
      width: 1200,
      height: 630,
    },
    significantLink: [
      person.linkedin,
      person.github,
      `mailto:${person.email}`,
      ...(profile.resumes || []).map((r) => `${base}${r.href}`),
    ].filter(Boolean),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: base },
      ...(path === '/'
        ? []
        : [{ '@type': 'ListItem', position: 2, name: person.name, item: url }]),
    ],
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

  return [
    websiteSchema,
    personSchema,
    profilePageSchema,
    breadcrumbSchema,
    expertiseSchema,
    faqSchema,
  ].filter(Boolean)
}
