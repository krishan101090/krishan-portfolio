export default function JsonLd({ data, id }) {
  const payload = Array.isArray(data)
    ? { '@context': 'https://schema.org', '@graph': data.map(({ '@context': _c, ...rest }) => rest) }
    : data
  return (
    <script
      type="application/ld+json"
      id={id}
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  )
}
