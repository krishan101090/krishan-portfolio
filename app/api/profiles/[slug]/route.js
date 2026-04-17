import { NextResponse } from 'next/server'
import { getProfile } from '@/lib/profiles'

export const revalidate = 3600

export async function GET(_request, { params }) {
  const profile = await getProfile(params.slug)
  if (!profile) {
    return NextResponse.json({ error: 'Profile not found' }, { status: 404 })
  }
  return NextResponse.json(profile)
}
