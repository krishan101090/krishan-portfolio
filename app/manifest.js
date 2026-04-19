import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'

export default function manifest() {
  const profile = getProfile(DEFAULT_PROFILE_SLUG)
  const name = profile?.person?.name || 'Portfolio'
  const shortName = profile?.seo?.shortTitle || profile?.person?.initials || 'Portfolio'
  const description = profile?.seo?.description || ''

  return {
    name: `${name} — ${profile?.person?.jobTitle || ''}`.trim(),
    short_name: shortName,
    description,
    start_url: '/',
    display: 'standalone',
    background_color: '#04050a',
    theme_color: '#04050a',
    orientation: 'portrait',
    categories: ['business', 'productivity', 'developer'],
    lang: 'en-US',
    dir: 'ltr',
    icons: [
      { src: '/icon', sizes: '64x64', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'any' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png', purpose: 'maskable' },
    ],
  }
}
