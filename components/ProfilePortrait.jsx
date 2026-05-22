import Image from 'next/image'
import styles from './ProfilePortrait.module.css'

export default function ProfilePortrait({ person, priority = false }) {
  const src = person.photo || '/images/krishan-mohan.png'
  const alt =
    person.photoAlt ||
    `${person.name} — ${person.currentRole || person.jobTitle} at ${person.currentCompany}`

  return (
    <figure className={`${styles.portrait} ${priority ? styles.priority : ''}`}>
      <div className={styles.fx} aria-hidden="true">
        <span className={styles.fxRing} />
        <span className={styles.fxRing2} />
        <svg className={styles.fxArcs} viewBox="0 0 320 320" fill="none">
          <circle cx="160" cy="160" r="148" className={styles.tickRing} />
          <path d="M160 24 A136 136 0 0 1 284 96" className={styles.arc} />
          <path d="M296 160 A136 136 0 0 1 224 284" className={styles.arc} />
          <path d="M160 296 A136 136 0 0 1 36 224" className={styles.arc} />
          <path d="M24 160 A136 136 0 0 1 96 36" className={styles.arc} />
        </svg>
      </div>

      <div className={`${styles.frame} hud-panel`}>
        <div className={styles.imageShell}>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 900px)  min(88vw, 340px), 380px"
            className={styles.image}
          />
          <div className={styles.colorGrade} aria-hidden="true" />
          <div className={styles.scan} aria-hidden="true" />
          <div className={styles.vignette} aria-hidden="true" />
        </div>

        <figcaption className={styles.caption}>
          <span className={styles.captionTag}>Identity verified</span>
          <span className={styles.captionMeta}>
            {person.location || `${person.locality}, ${person.countryName || 'India'}`} · {person.yearsExperience || '10'}+ yrs
          </span>
        </figcaption>
      </div>

      <div className={styles.readout} aria-hidden="true">
        <span>LOC · {person.location || `${person.locality}, ${person.countryName || 'India'}`}</span>
        <span>EXP · {person.yearsExperience || '10'}+ YRS</span>
        <span>STATUS · ACTIVE</span>
      </div>
    </figure>
  )
}
