import { listProfileSlugs, DEFAULT_PROFILE_SLUG, getProfile } from '@/lib/profiles'

export default function sitemap() {
  const slugs = listProfileSlugs()
  const defaultProfile = getProfile(DEFAULT_PROFILE_SLUG)
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    defaultProfile?.seo?.siteUrl ||
    'https://krishanmohan.dev'
  ).replace(/\/$/, '')
  const now = new Date()

  const entries = [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
      alternates: {
        languages: {
          'en-US': `${base}/`,
          'x-default': `${base}/`,
        },
      },
    },
  ]

  for (const slug of slugs) {
    if (slug === DEFAULT_PROFILE_SLUG) continue
    entries.push({
      url: `${base}/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          'en-US': `${base}/${slug}`,
          'x-default': `${base}/${slug}`,
        },
      },
    })
  }

  return entries
}
