import { notFound } from 'next/navigation'
import Portfolio from '@/components/Portfolio'
import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'
import { buildMetadata } from '@/lib/metadata'

export const revalidate = 3600

export function generateMetadata() {
  const profile = getProfile(DEFAULT_PROFILE_SLUG)
  return buildMetadata(profile, { path: '/' })
}

export default function Home() {
  const profile = getProfile(DEFAULT_PROFILE_SLUG)
  if (!profile) notFound()
  return <Portfolio profile={profile} path="/" />
}
