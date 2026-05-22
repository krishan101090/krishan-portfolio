import { listProfileSlugs, DEFAULT_PROFILE_SLUG, getProfile } from '@/lib/profiles'
import { isProfileIndexed } from '@/lib/seo-helpers'

export default function sitemap() {
  const slugs = listProfileSlugs()
  const defaultProfile = getProfile(DEFAULT_PROFILE_SLUG)
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    defaultProfile?.seo?.siteUrl ||
    'https://krishanmohan.dev'
  ).replace(/\/$/, '')
  const lastModified = new Date(defaultProfile?.seo?.lastModified || Date.now())

  const entries = [
    {
      url: `${base}/`,
      lastModified,
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
    const profile = getProfile(slug)
    if (!isProfileIndexed(profile)) continue
    entries.push({
      url: `${base}/${slug}`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.5,
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
