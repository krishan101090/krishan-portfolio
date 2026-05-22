export function getRequestOrigin(request) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  if (forwardedHost) {
    const proto = request.headers.get('x-forwarded-proto') || 'https'
    return `${proto}://${forwardedHost.split(',')[0].trim()}`.replace(/\/$/, '')
  }

  const host = request.headers.get('host')
  if (host) {
    const proto = host.startsWith('localhost') || host.startsWith('127.0.0.1') ? 'http' : 'https'
    return `${proto}://${host}`.replace(/\/$/, '')
  }

  try {
    return new URL(request.url).origin
  } catch {
    return ''
  }
}

export function resolveSiteBase(request, clientOrigin) {
  const fromClient = String(clientOrigin || '').trim().replace(/\/$/, '')
  if (fromClient && /^https?:\/\//i.test(fromClient)) {
    try {
      return new URL(fromClient).origin
    } catch {
      return getRequestOrigin(request)
    }
  }
  return getRequestOrigin(request)
}
