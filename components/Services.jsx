import styles from './Services.module.css'

export default function Services({ services, email }) {
  return (
    <section id="services" className={styles.section} aria-labelledby="services-title">
      <div className={styles.head}>
        <span className="kicker">What I do</span>
        <h2 className={styles.title} id="services-title">
          Services built for <span className={styles.emphasis}>real business outcomes</span>.
        </h2>
        <p className={styles.subtitle}>
          From new product builds to AI features and performance fixes — here is how I can help.
        </p>
      </div>

      <div className={styles.grid}>
        {services.map((s, i) => (
          <article
            key={s.title}
            className={`${styles.card} reveal`}
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
              Get in touch
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </div>

      <div className={`${styles.banner} reveal`}>
        <div>
          <span className={styles.bannerLabel}>Ready to start?</span>
          <p className={styles.bannerText}>
            Most projects begin within <strong>a week</strong> of our first conversation.
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
