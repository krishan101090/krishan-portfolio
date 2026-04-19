import { ImageResponse } from 'next/og'
import { getProfile, DEFAULT_PROFILE_SLUG } from '@/lib/profiles'

export const runtime = 'nodejs'
export const size = { width: 180, height: 180 }
export const contentType = 'image/png'

export default function AppleIcon() {
  const profile = getProfile(DEFAULT_PROFILE_SLUG)
  const initials = profile?.person?.initials || 'KM'
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#04050a',
          backgroundImage:
            'radial-gradient(circle at 30% 30%, #00e5ff, transparent 70%)',
          color: '#b4ff39',
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: '-0.04em',
          fontFamily: 'system-ui',
        }}
      >
        {initials}
      </div>
    ),
    { ...size },
  )
}
