import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'

export default function robots() {
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    getProfile(DEFAULT_PROFILE_SLUG)?.seo?.siteUrl ||
    'https://krishanmohan.dev'
  ).replace(/\/$/, '')

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/'],
      },
      {
        userAgent: 'Googlebot',
        allow: ['/', '/api/profiles', '/api/profiles/'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
      },
      {
        userAgent: 'DuckDuckBot',
        allow: '/',
      },
      {
        userAgent: 'Twitterbot',
        allow: '/',
      },
      {
        userAgent: 'facebookexternalhit',
        allow: '/',
      },
      {
        userAgent: 'LinkedInBot',
        allow: '/',
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
