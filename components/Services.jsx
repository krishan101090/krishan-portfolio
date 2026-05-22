import styles from './Services.module.css'

export default function Services({ services, email }) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.head}>
        <span className="kicker">Areas of expertise</span>
        <h2 className={styles.title} id="services-title">
          Technical focus across <span className={styles.emphasis}>enterprise product engineering</span>.
        </h2>
        <p className={styles.subtitle}>
          Core strengths from 10+ years delivering web platforms for McKinsey, BlackRock, and global brands — React and Next.js on the frontend, Python and FastAPI on the backend.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <article
            key={s.title}
            className={`${styles.card} hud-panel reveal`}
            style={{ '--i': i }}
            aria-label={s.title}
          >
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
            <a href="#contact" className={styles.cardCta}>
              Connect
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>

      <div className={`${styles.banner} hud-panel hud-scanline reveal`}>
        <div>
          <span className={styles.bannerLabel}>Professional inquiries welcome</span>
          <p className={styles.bannerText}>
            For collaboration, speaking, or networking — reach out via the form or email.
          </p>
        </div>
        <div className={styles.bannerCtas}>
          <a href="#contact" className={styles.bannerPrimary}>
            Send a message
          </a>
          <a href={`mailto:${email}`} className={styles.bannerSecondary}>
            Email me directly
          </a>
        </div>
      </div>
    </section>
  )
}
