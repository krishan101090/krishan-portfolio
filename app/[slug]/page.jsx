import { notFound } from 'next/navigation'
import Portfolio from '@/components/Portfolio'
import { getProfile, listProfileSlugs } from '@/lib/profiles'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return listProfileSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const profile = getProfile(params.slug)
  return buildMetadata(profile, { path: `/${params.slug}` })
}

export default function ProfilePage({ params }) {
  const profile = getProfile(params.slug)
  if (!profile) notFound()
  return <Portfolio profile={profile} path={`/${params.slug}`} />
}
