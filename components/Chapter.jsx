import styles from './Chapter.module.css'
import SpecFlow from './SpecFlow'
import AIStack from './AIStack'

export default function Chapter({ chapter, specWorkflow, aiStack }) {
  const { num, label, year, title, paragraphs, artifact, meta } = chapter

  return (
    <section id={`chapter-${num}`} className={styles.chapter} aria-label={`Chapter ${num}: ${title}`}>
      <div className={styles.marker}>
        <span className={styles.chapterNum}>CH {num}</span>
        <span className={styles.divider} />
        <span className={styles.year}>{year}</span>
        <span className={styles.divider} />
        <span className={styles.label}>{label}</span>
      </div>

      <div className={styles.grid}>
        <div className={styles.narrative}>
          <h2 className={`${styles.title} reveal`}>{title}</h2>
          <div className={`${styles.body} reveal`}>
            {paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
          {meta && (
            <div className={`${styles.meta} reveal`}>
              {Object.entries(meta).map(([k, v]) => (
                <div key={k} className={styles.metaItem}>
                  <span className={styles.metaKey}>{k}</span>
                  <span className={styles.metaVal}>
                    {Array.isArray(v) ? v.join(' · ') : v}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={`${styles.artifact} reveal`}>
          {artifact && renderArtifact(artifact, { specWorkflow, aiStack })}
        </div>
      </div>
    </section>
  )
}

function renderArtifact(artifact, ctx) {
  if (artifact.kind === 'code') {
    return (
      <pre className={styles.codeBlock}>
        <div className={styles.codeBar}>
          <span className={styles.codeDot} style={{ background: '#ff5f56' }} />
          <span className={styles.codeDot} style={{ background: '#ffbd2e' }} />
          <span className={styles.codeDot} style={{ background: '#27c93f' }} />
          <span className={styles.codeLang}>{artifact.lang}</span>
        </div>
        <code>{artifact.code}</code>
      </pre>
    )
  }

  if (artifact.kind === 'stats') {
    return (
      <div className={styles.stats}>
        {artifact.items.map((it) => (
          <div key={it.label} className={styles.statItem}>
            <div className={styles.statVal}>{it.value}</div>
            <div className={styles.statLabel}>{it.label}</div>
          </div>
        ))}
      </div>
    )
  }

  if (artifact.kind === 'transcript') {
    return (
      <div className={styles.transcript}>
        {artifact.lines.map((line, i) => (
          <div key={i} className={`${styles.bubble} ${line.by === 'me' ? styles.me : styles.ai}`}>
            <span className={styles.who}>{line.by === 'me' ? 'YOU' : 'AI'}</span>
            <span>{line.text}</span>
          </div>
        ))}
      </div>
    )
  }

  if (artifact.kind === 'highlights') {
    return (
      <div className={styles.highlights}>
        {artifact.items.map((it) => (
          <div key={it.label} className={styles.hiItem}>
            <span className={styles.hiKey}>{it.label}</span>
            <span className={styles.hiVal}>{it.value}</span>
          </div>
        ))}
      </div>
    )
  }

  if (artifact.kind === 'spec-flow' && ctx.specWorkflow) {
    return <SpecFlow workflow={ctx.specWorkflow} />
  }

  if (artifact.kind === 'ai-stack' && ctx.aiStack) {
    return <AIStack stack={ctx.aiStack} />
  }

  return null
}
