import styles from './JarvisOrb.module.css'

export default function JarvisOrb({ active = false, size = 'md', className = '' }) {
  return (
    <span
      className={`${styles.orb} ${styles[size]} ${active ? styles.active : ''} ${className}`}
      aria-hidden="true"
    >
      <span className={styles.aura} />
      <span className={`${styles.ring} ${styles.ringOuter}`} />
      <span className={`${styles.ring} ${styles.ringMid}`} />
      <span className={`${styles.ring} ${styles.ringInner}`} />
      <svg className={styles.svg} viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="21" className={styles.tickRing} />
        <path d="M24 6 A18 18 0 0 1 40 18" className={styles.arc} />
        <path d="M42 24 A18 18 0 0 1 30 42" className={styles.arc} />
        <path d="M24 42 A18 18 0 0 1 8 30" className={styles.arc} />
        <path d="M6 24 A18 18 0 0 1 18 6" className={styles.arc} />
      </svg>
      <span className={styles.core} />
      <span className={styles.scan} />
    </span>
  )
}
