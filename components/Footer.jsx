import JarvisOrb from './JarvisOrb'
import styles from './Footer.module.css'

export default function Footer({ person }) {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.left}>
          <JarvisOrb size="xs" />
          <p className={styles.copy}>
            © {year} <span>{person.name}</span> · {person.currentRole || person.jobTitle} · {person.currentCompany}
          </p>
        </div>
        <p className={styles.note}>
          Designed and built by Krishan using Next.js
        </p>
      </div>
      <div className={styles.bigText} aria-hidden="true">
        {person.firstName} {person.lastName}
      </div>
    </footer>
  )
}
