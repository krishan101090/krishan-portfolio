'use client'

export default function ScrollLink({ href, className, children }) {
  function handleClick(e) {
    const id = href?.replace(/^#/, '')
    if (!id) return
    const target = document.getElementById(id)
    if (!target) return
    e.preventDefault()
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <a href={href} className={className} onClick={handleClick}>
      {children}
    </a>
  )
}
