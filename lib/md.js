export function renderBold(text) {
  const parts = []
  const regex = /\*\*(.+?)\*\*/g
  let last = 0
  let match
  let key = 0
  while ((match = regex.exec(text)) !== null) {
    if (match.index > last) parts.push(text.slice(last, match.index))
    parts.push({ __bold: true, text: match[1], key: key++ })
    last = regex.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return parts
}
