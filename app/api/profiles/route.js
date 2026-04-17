import { NextResponse } from 'next/server'
import { listProfileSlugs, getAllProfiles } from '@/lib/profiles'

export const revalidate = 3600

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const full = searchParams.get('full') === 'true'

  if (full) {
    const profiles = await getAllProfiles()
    return NextResponse.json({ profiles })
  }

  const slugs = await listProfileSlugs()
  return NextResponse.json({ slugs })
}
