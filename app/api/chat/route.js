import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'
import { generateReply } from '@/lib/krishan-bot'
import { resolveSiteBase } from '@/lib/request-origin'

export const runtime = 'nodejs'

export async function POST(request) {
  let body
  try {
    body = await request.json()
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const message = String(body.message || '').trim().slice(0, 500)
  const slug = String(body.slug || DEFAULT_PROFILE_SLUG).replace(/[^a-z0-9-_]/gi, '')

  if (!message) {
    return Response.json({ error: 'Message is required' }, { status: 400 })
  }

  const profile = getProfile(slug)
  if (!profile) {
    return Response.json({ error: 'Profile not found' }, { status: 404 })
  }

  const result = generateReply(message, profile, {
    baseUrl: resolveSiteBase(request, body.origin),
  })
  return Response.json(result)
}
