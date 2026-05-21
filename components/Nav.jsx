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
          {person.firstName}<em> Mohan</em>
        </span>
      </a>
      <ul className={styles.links} role="list">
        <li><a href="#achievements">Wins</a></li>
        <li><a href="#chapter-01">About</a></li>
        <li><a href="#timeline">Experience</a></li>
        <li><a href="#services">Services</a></li>
        <li><a href="#faq">FAQ</a></li>
      </ul>
      <a href="#contact" className={styles.cta}>
        <span className={styles.ctaDot} />
        Contact me
      </a>
    </nav>
  )
}
