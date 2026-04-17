'use client'

import { useEffect, useState } from 'react'
import styles from './Hero.module.css'

export default function Hero({ person, boot }) {
  const [lines, setLines] = useState([])
  const [currentCmd, setCurrentCmd] = useState('')
  const [currentOut, setCurrentOut] = useState('')
  const [phase, setPhase] = useState('typing')

  useEffect(() => {
    let cancelled = false
    async function run() {
      const accumulated = []
      for (const entry of boot.commands) {
        if (cancelled) return
        setPhase('typing')
        for (let i = 0; i <= entry.cmd.length; i++) {
          if (cancelled) return
          setCurrentCmd(entry.cmd.slice(0, i))
          await wait(24 + Math.random() * 30)
        }
        await wait(220)
        setPhase('output')
        for (let i = 0; i <= entry.out.length; i++) {
          if (cancelled) return
          setCurrentOut(entry.out.slice(0, i))
          await wait(10)
        }
        await wait(300)
        accumulated.push({ cmd: entry.cmd, out: entry.out })
        setLines([...accumulated])
        setCurrentCmd('')
        setCurrentOut('')
      }
      setPhase('done')
    }
    run()
    return () => {
      cancelled = true
    }
  }, [boot.commands])

  return (
    <section id="boot" className={styles.hero} aria-label="Introduction">
      <div className={styles.bgGrid} aria-hidden="true" />
      <div className={styles.bgOrb} aria-hidden="true" />

      <div className={styles.badge}>
        <span className={styles.pulseDot} aria-hidden="true" />
        <span>{person.availability}</span>
      </div>

      <h1 className={styles.identity}>
        <span className={styles.first}>{person.firstName}</span>
        <span className={styles.last}>{person.lastName}</span>
        <span className={styles.role}>{person.jobTitle}</span>
      </h1>

      <div className={styles.terminal} aria-label="Boot sequence">
        <div className={styles.termBar}>
          <span className={styles.termDot} style={{ background: '#ff5f56' }} />
          <span className={styles.termDot} style={{ background: '#ffbd2e' }} />
          <span className={styles.termDot} style={{ background: '#27c93f' }} />
          <span className={styles.termTitle}>{boot.title}</span>
        </div>
        <div className={styles.termBody}>
          {lines.map((l, i) => (
            <div key={i} className={styles.termLine}>
              <span className={styles.cmd}>{l.cmd}</span>
              <span className={styles.out}>
                <span className={styles.outArrow}>↳</span> {l.out}
              </span>
            </div>
          ))}
          {(currentCmd || currentOut) && (
            <div className={styles.termLine}>
              {currentCmd && (
                <span className={styles.cmd}>
                  {currentCmd}
                  {phase === 'typing' && <span className={styles.caret} />}
                </span>
              )}
              {currentOut && (
                <span className={styles.out}>
                  <span className={styles.outArrow}>↳</span> {currentOut}
                  {phase === 'output' && <span className={styles.caret} />}
                </span>
              )}
            </div>
          )}
          {phase === 'done' && (
            <div className={styles.termReady}>
              <span className={styles.readyDot} /> SYSTEM READY
            </div>
          )}
        </div>
      </div>

      <p className={styles.tagline}>{boot.tagline}</p>

      <a href="#chapter-01" className={styles.scrollCta}>
        <span>{boot.scrollHint}</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M12 4v16m0 0l-6-6m6 6l6-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </section>
  )
}

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms))
}
