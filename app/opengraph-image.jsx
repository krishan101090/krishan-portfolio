import { ImageResponse } from 'next/og'
import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'
import { renderOgImage } from '@/lib/og'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function Image() {
  const profile = getProfile(DEFAULT_PROFILE_SLUG)
  return new ImageResponse(renderOgImage(profile), { ...size })
}

export const alt = getProfile(DEFAULT_PROFILE_SLUG)?.seo?.ogAlt ||
  'Krishan Mohan — Senior Software Engineer and Frontend Architect at McKinsey & Company.'
