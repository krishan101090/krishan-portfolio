import { DEFAULT_PROFILE_SLUG } from '@/lib/profiles'
import { canonicalUrl, isProfileIndexed, socialImageUrl } from '@/lib/seo-helpers'

export function buildMetadata(profile, { path = '/' } = {}) {
  if (!profile) return { title: 'Profile not found' }
  const { seo, person } = profile
  const base = seo.siteUrl.replace(/\/$/, '')
  const canonical = canonicalUrl(base, path, profile.slug, DEFAULT_PROFILE_SLUG)
  const indexed = isProfileIndexed(profile)
  const ogImage = socialImageUrl(base, path === '/' || profile.slug === DEFAULT_PROFILE_SLUG ? '/' : path)
  const keywords = Array.isArray(seo.keywords)
    ? seo.keywords
    : typeof seo.keywords === 'string'
      ? seo.keywords.split(',').map((k) => k.trim())
      : []

  return {
    title: seo.title,
    description: seo.description,
    keywords,
    authors: [{ name: person.name, url: canonicalUrl(base, '/', profile.slug, DEFAULT_PROFILE_SLUG) }],
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
      siteName: `${person.name} — ${person.currentRole || person.jobTitle}`,
      locale: seo.locale || 'en_US',
      firstName: person.firstName,
      lastName: person.lastName,
      username: person.handle,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: seo.ogAlt || person.photoAlt || `${person.name} — ${person.currentRole || person.jobTitle}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      creator: seo.twitter,
      site: seo.twitter,
      images: [ogImage],
    },
    appLinks: {
      web: { url: canonical, should_fallback: true },
    },
    robots: indexed
      ? {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        }
      : {
          index: false,
          follow: false,
          googleBot: { index: false, follow: false },
        },
  }
}
