import styles from './Nav.module.css'

export default function Nav({ person }) {
  return (
    <nav className={styles.nav} aria-label="Primary navigation">
      <a href="#boot" className={styles.logo} aria-label={`${person.name} – home`}>
        <span className={styles.logoMark}>
          <span className={styles.logoDot} />
          <span className={styles.logoDot} />
          <span className={styles.logoDot} />
        </span>
        <span className={styles.logoText}>
          {person.initials}<em>.dev</em>
        </span>
      </a>
      <ul className={styles.links} role="list">
        <li><a href="#chapter-01">STORY</a></li>
        <li><a href="#chapter-05">METHOD</a></li>
        <li><a href="#services">SERVICES</a></li>
        <li><a href="#timeline">TIMELINE</a></li>
      </ul>
      <a href="#console" className={styles.cta}>
        <span className={styles.ctaDot} />
        HIRE ME
      </a>
    </nav>
  )
}
