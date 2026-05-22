function parsePeriod(period) {
  if (!period) return { start: 0, end: 0, present: false }
  const present = /present/i.test(period)
  const years = String(period).match(/\d{4}/g)?.map(Number) || []
  const start = years[0] || 0
  const end = present ? 9999 : years[years.length - 1] || start
  return { start, end, present }
}

export function sortByPeriod(items, getPeriod = (item) => item.period) {
  return [...items].sort((a, b) => {
    const pa = parsePeriod(getPeriod(a))
    const pb = parsePeriod(getPeriod(b))
    if (pb.end !== pa.end) return pb.end - pa.end
    if (pb.start !== pa.start) return pb.start - pa.start
    if (pb.present !== pa.present) return pb.present ? 1 : -1
    return 0
  })
}

export function sortTimeline(items) {
  return [...items].sort((a, b) => {
    const yearA = parseInt(a.year, 10) || 0
    const yearB = parseInt(b.year, 10) || 0
    if (yearB !== yearA) return yearB - yearA
    const presentA = /present/i.test(a.range || '')
    const presentB = /present/i.test(b.range || '')
    if (presentB !== presentA) return presentB ? 1 : -1
    return 0
  })
}
