'use client'

import { useEffect, useState } from 'react'
import styles from './ScrollRail.module.css'

export default function ScrollRail({ items }) {
  const [activeId, setActiveId] = useState(items[0]?.id)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const h = doc.scrollHeight - doc.clientHeight
      setProgress(h > 0 ? Math.min(1, Math.max(0, doc.scrollTop / h)) : 0)

      let current = items[0]?.id
      for (const item of items) {
        const el = document.getElementById(item.id)
        if (!el) continue
        const rect = el.getBoundingClientRect()
        if (rect.top <= window.innerHeight * 0.35) current = item.id
      }
      setActiveId(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [items])

  return (
    <aside className={styles.rail} aria-label="Story progress">
      <div className={styles.track}>
        <div className={styles.fill} style={{ height: `${progress * 100}%` }} />
      </div>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className={`${styles.item} ${activeId === item.id ? styles.active : ''}`}
              aria-current={activeId === item.id ? 'true' : undefined}
            >
              <span className={styles.dot} aria-hidden="true" />
              <span className={styles.num}>{item.num}</span>
              <span className={styles.label}>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
