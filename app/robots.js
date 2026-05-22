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
        disallow: ['/api/', '/travel', '/travel/', '/jane'],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/travel', '/travel/', '/jane'],
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/travel', '/travel/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/travel', '/travel/', '/jane'],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  }
}
