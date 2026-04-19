import styles from './Timeline.module.css'

export default function Timeline({ timeline }) {
  return (
    <section id="timeline" className={styles.section} aria-labelledby="timeline-title">
      <div className={styles.head}>
        <span className="kicker">MEMORY DUMP</span>
        <h2 className={styles.title} id="timeline-title">
          The arc, compressed.
        </h2>
      </div>
      <ol className={styles.list}>
        {timeline.map((item, i) => (
          <li key={`${item.year}-${i}`} className={`${styles.item} reveal`} style={{ '--i': i }}>
            <div className={styles.year}>{item.year}</div>
            <div className={styles.connector}>
              <span className={styles.dot} />
              <span className={styles.line} />
            </div>
            <div className={styles.event}>
              <span className={styles.eventText}>{item.event}</span>
              {item.range && <span className={styles.range}>{item.range}</span>}
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
