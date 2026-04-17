import { notFound } from 'next/navigation'
import Portfolio from '@/components/Portfolio'
import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'

export const revalidate = 3600

export async function generateMetadata() {
  const profile = await getProfile(DEFAULT_PROFILE_SLUG)
  if (!profile) return {}
  return buildMetadata(profile)
}

export default async function Home() {
  const profile = await getProfile(DEFAULT_PROFILE_SLUG)
  if (!profile) notFound()
  return <Portfolio profile={profile} />
}

function buildMetadata(profile) {
  const { seo, person } = profile
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: person.name }],
    alternates: { canonical: seo.siteUrl },
    openGraph: {
      type: 'website',
      url: seo.siteUrl,
      title: seo.title,
      description: seo.description,
      siteName: `${person.name} Portfolio`,
      locale: 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      creator: seo.twitter,
    },
  }
}
