import { sortByPeriod, sortTimeline } from '@/lib/recency'

function normalize(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function tokens(text) {
  return normalize(text).split(' ').filter((t) => t.length > 1)
}

function hasAny(query, words) {
  const n = normalize(query)
  return words.some((w) => n.includes(w))
}

function scoreOverlap(query, target) {
  const q = new Set(tokens(query))
  const t = tokens(target)
  if (!t.length) return 0
  let hits = 0
  for (const w of t) {
    if (q.has(w)) hits++
  }
  return hits / t.length
}

function matchFaq(query, faqs) {
  let best = null
  let bestScore = 0
  for (const faq of faqs || []) {
    const s = scoreOverlap(query, faq.q) * 1.2 + scoreOverlap(query, faq.a) * 0.35
    if (s > bestScore) {
      bestScore = s
      best = faq
    }
  }
  return bestScore >= 0.28 ? best : null
}

function intro(profile) {
  const { person, boot } = profile
  const role = person.currentRole || person.jobTitle
  return `Krishan Mohan is a ${role} at ${person.currentCompany} in ${person.location}. ${boot?.intro || person.tagline}`
}

function currentRole(profile) {
  const { person } = profile
  const role = person.currentRole || person.jobTitle
  const current = profile.achievements?.items?.find((item) =>
    normalize(item.period).includes('present'),
  )
  const detail = current?.description
    ? ` ${current.description}`
    : ` He focuses on enterprise pricing, analytics, and AI-powered product interfaces.`
  return `${role} at ${person.currentCompany} (${person.location}).${detail}`
}

function experience(profile) {
  const lines = sortTimeline(profile.timeline || [])
    .slice(0, 6)
    .map((t) => {
    const range = t.range ? ` (${t.range})` : ''
    return `• ${t.event}${range}`
  })
  return `Here's a snapshot of Krishan's career path:\n\n${lines.join('\n')}`
}

function skills(profile) {
  const list = (profile.person?.skills || []).slice(0, 12).join(', ')
  return `Krishan's core stack includes ${list}. He uses Python and FastAPI daily for APIs and backend services, and specializes in React, Next.js, enterprise architecture, performance, accessibility, and AI-assisted delivery.`
}

function achievements(profile) {
  const items = sortByPeriod(profile.achievements?.items || []).slice(0, 4)
  const lines = items.map(
    (a) => `• ${a.title} (${a.company}) — ${a.metric}. ${a.description}`,
  )
  return `Some of Krishan's standout wins:\n\n${lines.join('\n\n')}\n\nAsk about a specific company or project for more detail.`
}

function contact(profile) {
  const { person } = profile
  return `You can reach Krishan at ${person.email}, ${person.phoneDisplay}, or on LinkedIn (${person.linkedinHandle}). Use the contact section on this page for a quick message.`
}

function resumes(profile, baseUrl) {
  const items = profile.resumes || []
  if (!items.length) {
    return `Resume downloads are available on this page — look for the resume section near the top.`
  }

  const list = items
    .map((r) => {
      const path = r.href.startsWith('/') ? r.href : `/${r.href}`
      const url = baseUrl ? `${baseUrl.replace(/\/$/, '')}${path}` : path
      return `• ${r.label} (${r.format}) — ${r.region}\n  ${url}`
    })
    .join('\n\n')

  return `Krishan shares two resume formats:\n\n${list}`
}

function certifications(profile) {
  const certs = profile.certifications || []
  if (!certs.length) return `Krishan holds industry certifications — check the wins section on this page for details.`
  return certs.map((c) => `• ${c.name} — ${c.issuer}. ${c.valid}`).join('\n')
}

function expertise(profile) {
  const lines = (profile.services || []).slice(0, 4).map((s) => `• ${s.title} — ${s.desc}`)
  return `Krishan's areas of expertise:\n\n${lines.join('\n')}`
}

function methodology(profile) {
  const steps = (profile.specWorkflow?.steps || [])
    .map((s) => `• ${s.name} — ${s.desc}`)
    .join('\n')
  return `${profile.specWorkflow?.description || 'Krishan uses a plan-first, AI-assisted delivery workflow.'}\n\n${steps}`
}

function fallback(profile) {
  return `I'm not sure about that one. Try asking about Krishan's current role, experience, skills, achievements, resume, or how to connect.\n\n${intro(profile)}`
}

export function generateReply(message, profile, { baseUrl = '' } = {}) {
  if (!profile) {
    return { reply: 'Profile not found.' }
  }

  const query = String(message || '').trim()
  if (!query) {
    return {
      reply: `Hi — I'm KrishanGPT. Ask me about Krishan's work, experience, skills, wins, or how to get in touch.`,
      suggestions: STARTER_PROMPTS,
    }
  }

  const faq = matchFaq(query, profile.faqs)
  if (faq) {
    return { reply: faq.a, suggestions: ['Career highlights', 'Skills & tech stack', 'How can I connect?'] }
  }

  if (hasAny(query, ['hi', 'hello', 'hey', 'good morning', 'good evening', 'howdy'])) {
    return {
      reply: `Hi! I'm KrishanGPT — I can tell you about Krishan's background, current role, skills, and how to connect.\n\n${intro(profile)}`,
      suggestions: STARTER_PROMPTS,
    }
  }

  if (hasAny(query, ['thank', 'thanks', 'bye', 'goodbye'])) {
    return {
      reply: `You're welcome. Feel free to ask anything else about Krishan, or use the contact section to reach him directly.`,
    }
  }

  if (hasAny(query, ['who', 'about', 'introduce', 'tell me about', 'yourself', 'bio'])) {
    return { reply: intro(profile), suggestions: ['Current role', 'Career highlights', 'How can I connect?'] }
  }

  if (
    hasAny(query, [
      'current',
      'now',
      'today',
      'mckinsey',
      'job',
      'role',
      'employer',
      'company',
      'work at',
      'working',
    ])
  ) {
    return { reply: currentRole(profile), suggestions: ['Career highlights', 'Skills & tech stack'] }
  }

  if (
    hasAny(query, [
      'experience',
      'career',
      'timeline',
      'history',
      'background',
      'preqin',
      'blackrock',
      'operabase',
      'publicis',
    ])
  ) {
    return { reply: experience(profile), suggestions: ['Key achievements', 'Current role'] }
  }

  if (hasAny(query, ['skill', 'stack', 'tech', 'technology', 'react', 'next', 'typescript', 'tools'])) {
    return { reply: skills(profile), suggestions: ['AI workflow', 'Career highlights'] }
  }

  if (
    hasAny(query, [
      'achievement',
      'win',
      'wins',
      'project',
      'impact',
      'deliver',
      'built',
      'revenue',
      'fortune',
    ])
  ) {
    return { reply: achievements(profile), suggestions: ['Current role', 'Experience timeline'] }
  }

  if (hasAny(query, ['contact', 'email', 'phone', 'linkedin', 'reach', 'connect', 'message'])) {
    return { reply: contact(profile) }
  }

  if (hasAny(query, ['resume', 'cv', 'download', 'resume link', 'your resume'])) {
    return { reply: resumes(profile, baseUrl) }
  }

  if (hasAny(query, ['cert', 'aws', 'certification', 'certificate'])) {
    return { reply: certifications(profile) }
  }

  if (hasAny(query, ['service', 'expertise', 'specializ', 'offer', 'help with', 'what can'])) {
    return { reply: expertise(profile) }
  }

  if (hasAny(query, ['ai', 'cursor', 'workflow', 'method', 'spec', 'process', 'how he work'])) {
    return { reply: methodology(profile) }
  }

  if (hasAny(query, ['where', 'location', 'based', 'live', 'city', 'gurugram', 'delhi', 'india'])) {
    return {
      reply: `Krishan is based in ${profile.person.location}. He currently works from Gurugram at ${profile.person.currentCompany}, and has collaborated with teams across India, Europe, and the US.`,
    }
  }

  const achievement = (profile.achievements?.items || []).find((item) => {
    const blob = normalize(`${item.title} ${item.company} ${item.description}`)
    return tokens(query).some((t) => t.length > 3 && blob.includes(t))
  })
  if (achievement) {
    const highlights = (achievement.highlights || []).slice(0, 3).map((h) => `• ${h}`).join('\n')
    return {
      reply: `${achievement.title} at ${achievement.company} (${achievement.period}). ${achievement.description}${highlights ? `\n\n${highlights}` : ''}`,
    }
  }

  return { reply: fallback(profile), suggestions: STARTER_PROMPTS }
}
