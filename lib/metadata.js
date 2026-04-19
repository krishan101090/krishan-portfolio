export function buildMetadata(profile, { path = '/' } = {}) {
  if (!profile) return { title: 'Profile not found' }
  const { seo, person } = profile
  const base = seo.siteUrl.replace(/\/$/, '')
  const canonical = `${base}${path}`
  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords
    : typeof seo.keywords === 'string'
      ? seo.keywords.split(',').map((k) => k.trim())
      : []

  return {
    title: seo.title,
    description: seo.description,
    keywords,
    authors: [{ name: person.name, url: base }],
    creator: person.name,
    publisher: person.name,
    alternates: {
      canonical,
      languages: {
        'en-US': canonical,
        'x-default': canonical,
      },
    },
    openGraph: {
      type: 'profile',
      url: canonical,
      title: seo.title,
      description: seo.description,
      siteName: `${person.name} — ${person.jobTitle}`,
      locale: seo.locale || 'en_US',
      firstName: person.firstName,
      lastName: person.lastName,
      username: person.handle,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      creator: seo.twitter,
      site: seo.twitter,
    },
    appLinks: {
      web: { url: canonical, should_fallback: true },
    },
  }
}
