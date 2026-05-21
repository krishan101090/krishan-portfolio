import styles from './Footer.module.css'

export default function Footer({ person }) {
  const year = new Date().getFullYear()
  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.inner}>
        <div className={styles.left}>
          <span className={styles.mark}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </span>
          <p className={styles.copy}>
            © {year} <span>{person.name}</span> · {person.jobTitle}
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
