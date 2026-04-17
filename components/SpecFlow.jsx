import styles from './SpecFlow.module.css'

export default function SpecFlow({ workflow }) {
  return (
    <div className={styles.flow}>
      {workflow.heading && (
        <div className={styles.head}>
          <span className={styles.headLabel}>THE LOOP</span>
          <h3 className={styles.heading}>{workflow.heading}</h3>
        </div>
      )}
      <ol className={styles.steps}>
        {workflow.steps.map((step, i) => (
          <li key={step.n} className={styles.step} style={{ '--i': i }}>
            <div className={styles.stepMarker}>
              <span className={styles.stepN}>{step.n}</span>
              <span className={styles.stepPulse} aria-hidden="true" />
            </div>
            <div className={styles.stepBody}>
              <div className={styles.stepName}>{step.name}</div>
              <p className={styles.stepDesc}>{step.desc}</p>
            </div>
            {i < workflow.steps.length - 1 && (
              <svg className={styles.connector} viewBox="0 0 24 24" aria-hidden="true">
                <path d="M12 2v20M6 16l6 6 6-6" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              </svg>
            )}
          </li>
        ))}
      </ol>
      <div className={styles.pulseTrack} aria-hidden="true">
        <span className={styles.pulseBeam} />
      </div>
    </div>
  )
}
