import { notFound, redirect } from 'next/navigation'
import Portfolio from '@/components/Portfolio'
import { getProfile, listProfileSlugs, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600
export const dynamicParams = true

export function generateStaticParams() {
  return listProfileSlugs().map((slug) => ({ slug }))
}

export function generateMetadata({ params }) {
  const profile = getProfile(params.slug)
  const path = params.slug === DEFAULT_PROFILE_SLUG ? '/' : `/${params.slug}`
  return buildMetadata(profile, { path })
}

export default function ProfilePage({ params }) {
  if (params.slug === DEFAULT_PROFILE_SLUG) {
    redirect('/')
  }

  const profile = getProfile(params.slug)
  if (!profile) notFound()
  return <Portfolio profile={profile} path={`/${params.slug}`} />
}
