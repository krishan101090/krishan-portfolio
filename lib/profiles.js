import fs from 'node:fs'
import path from 'node:path'

const PROFILES_DIR = path.join(process.cwd(), 'data', 'profiles')
export const DEFAULT_PROFILE_SLUG = process.env.DEFAULT_PROFILE || 'krishan'

let cache = null

function loadCache() {
  if (cache) return cache
  const map = new Map()
  try {
    const files = fs.readdirSync(PROFILES_DIR)
    for (const file of files) {
      if (!file.endsWith('.json')) continue
      const slug = file.replace(/\.json$/, '')
      try {
        const raw = fs.readFileSync(path.join(PROFILES_DIR, file), 'utf8')
        map.set(slug, JSON.parse(raw))
      } catch (err) {
        console.error(`[profiles] failed to load ${file}:`, err.message)
      }
    }
  } catch (err) {
    console.error('[profiles] failed to read profiles dir:', err.message)
  }
  cache = map
  return cache
}

export function listProfileSlugs() {
  return Array.from(loadCache().keys())
}

export function getProfile(slug) {
  const safe = String(slug || '').replace(/[^a-z0-9-_]/gi, '')
  if (!safe) return null
  return loadCache().get(safe) || null
}

export function getAllProfiles() {
  return Array.from(loadCache().values())
}
