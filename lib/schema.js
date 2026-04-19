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
    jobTitle: person.jobTitle,
    description: person.tagline || seo.description,
    worksFor: {
      '@type': 'Organization',
      name: person.currentCompany,
      url: person.currentCompanyUrl,
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: person.jobTitle,
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

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `${person.name} — ${person.jobTitle}`,
    url,
    image: ogImage,
    description: seo.description,
    priceRange: '$$$',
    provider: { '@id': personId },
    areaServed: { '@type': 'Place', name: 'Worldwide' },
    serviceType: (person.skills || []).slice(0, 5).join(', '),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Services',
      itemListElement: services.map((s, i) => ({
        '@type': 'Offer',
        position: i + 1,
        itemOffered: {
          '@type': 'Service',
          name: s.title,
          description: s.desc,
          provider: { '@id': personId },
          areaServed: 'Worldwide',
          category: (s.tags || []).join(', '),
        },
      })),
    },
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

  const servicesItemList = services.length
    ? {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: `${person.name} — Services`,
        itemListElement: services.map((s, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: s.title,
          description: s.desc,
        })),
      }
    : null

  return [
    websiteSchema,
    personSchema,
    profilePageSchema,
    breadcrumbSchema,
    serviceSchema,
    faqSchema,
    servicesItemList,
  ].filter(Boolean)
}
