import { listProfileSlugs, DEFAULT_PROFILE_SLUG, getProfile } from '@/lib/profiles'

export default async function sitemap() {
  const slugs = await listProfileSlugs()
  const defaultProfile = await getProfile(DEFAULT_PROFILE_SLUG)
  const base = defaultProfile?.seo?.siteUrl || 'https://krishanmohan.dev'
  const now = new Date()

  const entries = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'monthly', priority: 1.0 },
  ]

  for (const slug of slugs) {
    entries.push({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    })
  }

  return entries
}
