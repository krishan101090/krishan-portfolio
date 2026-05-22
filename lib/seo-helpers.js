export function socialImageUrl(base, path = '/') {
  const root = base.replace(/\/$/, '')
  const ogPath = path === '/' ? '/opengraph-image' : `${path.replace(/\/$/, '')}/opengraph-image`
  return `${root}${ogPath}`
}

export function canonicalUrl(base, path = '/', slug, defaultSlug) {
  const root = base.replace(/\/$/, '')
  if (path === '/' || slug === defaultSlug) return `${root}/`
  return `${root}${path}`
}

export function isProfileIndexed(profile) {
  return profile?.seo?.indexed !== false
}
