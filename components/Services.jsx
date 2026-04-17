import styles from './Services.module.css'

export default function Services({ services, email }) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.head}>
        <span className="kicker">RUN // SERVICES</span>
        <h2 className={styles.title} id="services-title">
          Services you can <span className={styles.emphasis}>execute</span>.
        </h2>
        <p className={styles.subtitle}>
          Each service is a command. Run one, and I'll kick off within a week.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <article
            key={s.cmd}
            className={`${styles.card} reveal`}
            style={{ '--i': i }}
            aria-label={s.title}
          >
            <div className={styles.cmdBar}>
              <span className={styles.prompt}>{'>'}</span>
              <code className={styles.cmd}>{s.cmd}</code>
              <span className={styles.run}>⏎</span>
            </div>
            <h3 className={styles.cardTitle}>{s.title}</h3>
            <p className={styles.cardDesc}>{s.desc}</p>
            <div className={styles.tags}>
              {s.tags.map((t) => (
                <span key={t} className={styles.tag}>
                  {t}
                </span>
              ))}
            </div>
            <a href="#console" className={styles.cardCta}>
              RUN COMMAND
              <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <div className={`${styles.banner} reveal`}>
        <div>
          <span className={styles.bannerLabel}>READY?</span>
          <p className={styles.bannerText}>
            Most projects kick off within <strong>a week</strong>. Describe yours below.
          </p>
        </div>
        <div className={styles.bannerCtas}>
          <a href="#console" className={styles.bannerPrimary}>
            OPEN CONSOLE ↗
          </a>
          <a href={`mailto:${email}`} className={styles.bannerSecondary}>
            EMAIL DIRECT
          </a>
        </div>
      </div>
    </section>
  )
}
