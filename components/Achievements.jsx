import ResumeDownloads from './ResumeDownloads'
import { sortByPeriod } from '@/lib/recency'
import styles from './Achievements.module.css'

export default function Achievements({ achievements, certifications, resumes }) {
  const items = sortByPeriod(achievements.items || [])

  return (
    <section id="achievements" className={styles.section} aria-labelledby="achievements-title">
      <div className={styles.head}>
        <span className="kicker">Wins & achievements</span>
        <h2 className={styles.title} id="achievements-title">
          Results that speak for <span className={styles.emphasis}>themselves</span>.
        </h2>
        <p className={styles.subtitle}>
          Measurable impact across finance, consulting, media, and e-commerce — from revenue growth to platform rebuilds used by thousands worldwide.
        </p>
      </div>

      <div className={styles.metrics}>
        {achievements.metrics.map((m) => (
          <div key={m.label} className={`${styles.metric} hud-panel reveal`}>
            <div className={styles.metricValue}>{m.value}</div>
            <div className={styles.metricLabel}>{m.label}</div>
          </div>
        ))}
      </div>

      <div className={styles.grid}>
        {items.map((item, i) => (
          <article
            key={item.title}
            className={`${styles.card} hud-panel reveal`}
            style={{ '--i': i }}
          >
            {item.metric && (
              <div className={styles.cardMetric}>{item.metric}</div>
            )}
            <div className={styles.cardMeta}>
              <span className={styles.company}>{item.company}</span>
              {item.period && <span className={styles.period}>{item.period}</span>}
            </div>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <p className={styles.cardDesc}>{item.description}</p>
            {item.highlights?.length > 0 && (
              <ul className={styles.highlights}>
                {item.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            )}
          </article>
        ))}
      </div>

      {certifications?.length > 0 && (
        <div className={`${styles.certs} reveal`}>
          <h3 className={styles.certsTitle}>Certifications</h3>
          <ul className={styles.certsList}>
            {certifications.map((c) => (
              <li key={c.name} className={styles.certItem}>
                <strong>{c.name}</strong>
                <span>{c.issuer}</span>
                {c.valid && <span className={styles.certValid}>{c.valid}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}

      <ResumeDownloads resumes={resumes} variant="panel" />
    </section>
  )
}
