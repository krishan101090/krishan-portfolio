import styles from './FAQ.module.css'

export default function FAQ({ faqs }) {
  return (
    <section id="faq" className={styles.section} aria-labelledby="faq-title">
      <header className={styles.header}>
        <span className={styles.eyebrow}>$ cat ./faq.md</span>
        <h2 id="faq-title" className={styles.title}>
          Frequently asked<span className={styles.dot}>.</span>
        </h2>
        <p className={styles.lead}>
          Answers to the questions clients and collaborators ask most often.
        </p>
      </header>

      <ol className={styles.list} role="list">
        {faqs.map((f, i) => (
          <li key={i} className={styles.item}>
            <details className={styles.details}>
              <summary className={styles.summary}>
                <span className={styles.qMark}>Q{String(i + 1).padStart(2, '0')}</span>
                <span className={styles.qText}>{f.q}</span>
                <span className={styles.chev} aria-hidden="true">+</span>
              </summary>
              <div className={styles.answer}>
                <span className={styles.aMark}>→</span>
                <p>{f.a}</p>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </section>
  )
}
