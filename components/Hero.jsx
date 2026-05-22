import ScrollLink from './ScrollLink'
import ResumeDownloads from './ResumeDownloads'
import styles from './Hero.module.css'

export default function Hero({ person, boot, resumes }) {
  const highlights = boot?.highlights ?? []

  return (
    <section id="boot" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb} aria-hidden="true" />

      <div className={styles.badge}>
        <span className={styles.pulseDot} aria-hidden="true" />
        <span>{person.availability}</span>
      </div>

      <div className={styles.main}>
        <h1 className={styles.identity} id="hero-heading">
          <span className={styles.first}>{person.firstName}</span>
          <span className={styles.last}>{person.lastName}</span>
          <span className={styles.role}>{person.professionalHeadline || person.currentRole || person.jobTitle}</span>
        </h1>

        <p className={styles.intro}>{boot?.intro}</p>
        <p className={styles.tagline}>{boot?.tagline}</p>

        <div className={styles.actions}>
          <ScrollLink href="#achievements" className={styles.scrollCta}>
            <span>{boot?.scrollHint ?? 'See my wins'}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </ScrollLink>
          <ResumeDownloads resumes={resumes} variant="hero" />
        </div>
      </div>

      <div className={styles.highlights} aria-label="Key highlights">
        {highlights.map((item) => (
          <div key={item.label} className={styles.highlightCard}>
            <div className={styles.highlightValue}>{item.value}</div>
            <div className={styles.highlightLabel}>{item.label}</div>
          </div>
        ))}
        <div className={styles.currentRole}>
          <span className={styles.currentLabel}>Currently at</span>
          <strong>{person.currentCompany}</strong>
          <span className={styles.currentDetail}>{person.currentRole}</span>
        </div>
      </div>
    </section>
  )
}
