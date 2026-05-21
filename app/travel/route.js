import fs from 'node:fs'
import path from 'node:path'

export const dynamic = 'force-static'
export const revalidate = false

const FILE_PATH = path.join(process.cwd(), 'data', 'travel-itinerary.html')

let cached = null
function loadHtml() {
  if (cached) return cached
  cached = fs.readFileSync(FILE_PATH, 'utf-8')
  return cached
}

export async function GET() {
  const html = loadHtml()
  return new Response(html, {
    status: 200,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300, s-maxage=3600, stale-while-revalidate=86400',
      'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
    },
  })
}
