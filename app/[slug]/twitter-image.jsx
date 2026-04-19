import { ImageResponse } from 'next/og'
import { getProfile, listProfileSlugs } from '@/lib/profiles'
import { renderOgImage } from '@/lib/og'

export const runtime = 'nodejs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateImageMetadata({ params }) {
  const profile = getProfile(params.slug)
  return [
    {
      id: 'twitter',
      size,
      alt: profile?.seo?.ogAlt || profile?.seo?.title || 'Portfolio',
      contentType,
    },
  ]
}

export function generateStaticParams() {
  return listProfileSlugs().map((slug) => ({ slug }))
}

export default async function Image({ params }) {
  const profile = getProfile(params.slug)
  return new ImageResponse(renderOgImage(profile), { ...size })
}
