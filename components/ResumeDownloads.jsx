import styles from './ResumeDownloads.module.css'

export default function ResumeDownloads({ resumes, variant = 'bar' }) {
  if (!resumes?.length) return null

  return (
    <div
      id="resume-downloads"
      className={`${styles.wrap} ${styles[variant]}`}
      aria-label="Download resume"
    >
      {variant === 'bar' && (
        <p className={styles.label}>Download my resume</p>
      )}
      <div className={styles.actions}>
        {resumes.map((r) => (
          <a
            key={r.href}
            href={r.href}
            download
            className={styles.btn}
          >
            <span className={styles.btnTitle}>{r.label}</span>
            <span className={styles.btnMeta}>
              {r.format}
              {r.region ? ` · ${r.region}` : ''}
            </span>
          </a>
        ))}
      </div>
    </div>
  )
}
