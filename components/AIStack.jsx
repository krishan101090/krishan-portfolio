import styles from './AIStack.module.css'

export default function AIStack({ stack }) {
  return (
    <div className={styles.stack}>
      <div className={styles.header}>
        <span className={styles.title}>ai-stack.yml</span>
        <span className={styles.count}>{stack.length} MODELS</span>
      </div>
      <div className={styles.grid}>
        {stack.map((model, i) => (
          <div key={model.name} className={styles.node} style={{ '--i': i }}>
            <span className={styles.tag}>{model.tag}</span>
            <div className={styles.name}>{model.name}</div>
            <div className={styles.role}>{model.role}</div>
            <span className={styles.beam} aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  )
}
