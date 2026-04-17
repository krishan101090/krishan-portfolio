import { notFound } from 'next/navigation'
import Portfolio from '@/components/Portfolio'
import { getProfile, listProfileSlugs } from '@/lib/profiles'

export const revalidate = 3600
export const dynamicParams = true

export async function generateStaticParams() {
  const slugs = await listProfileSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }) {
  const profile = await getProfile(params.slug)
  if (!profile) return { title: 'Profile not found' }

  const { seo, person } = profile
  const canonical = `${seo.siteUrl}/${profile.slug}`
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    authors: [{ name: person.name }],
    alternates: { canonical },
    openGraph: {
      type: 'website',
      url: canonical,
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

export default async function ProfilePage({ params }) {
  const profile = await getProfile(params.slug)
  if (!profile) notFound()
  return <Portfolio profile={profile} />
}
