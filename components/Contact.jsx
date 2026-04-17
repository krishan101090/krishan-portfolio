'use client'

import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact({ person, contact }) {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  function update(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function send(e) {
    e.preventDefault()
    const subject = encodeURIComponent(`[TRANSMIT] ${form.service || 'Project'} // ${form.name}`)
    const body = encodeURIComponent(
      `NAME: ${form.name}\nEMAIL: ${form.email}\nSERVICE: ${form.service}\n\n---\n\n${form.message}`,
    )
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="console" className={styles.section} aria-labelledby="console-title">
      <div className={styles.grid}>
        <div className={`${styles.left} reveal`}>
          <span className="kicker">// CHANNEL 01</span>
          <h2 className={styles.headline} id="console-title">
            {contact.headline[0]}<br />
            <span>{contact.headline[1]}</span>
            <br />
            {contact.headline[2]}
          </h2>
          <p className={styles.desc}>{contact.description}</p>

          <div className={styles.links}>
            <a href={`mailto:${person.email}`} className={styles.link}>
              <span className={styles.linkKey}>EMAIL</span>
              <span className={styles.linkVal}>{person.email}</span>
            </a>
            <a href={`tel:${person.phone}`} className={styles.link}>
              <span className={styles.linkKey}>PHONE</span>
              <span className={styles.linkVal}>{person.phoneDisplay}</span>
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.linkKey}>LINKEDIN</span>
              <span className={styles.linkVal}>{person.linkedinHandle}</span>
            </a>
          </div>
        </div>

        <div className={`${styles.right} reveal`}>
          <div className={styles.console}>
            <div className={styles.consoleBar}>
              <span className={styles.cDot} style={{ background: '#ff5f56' }} />
              <span className={styles.cDot} style={{ background: '#ffbd2e' }} />
              <span className={styles.cDot} style={{ background: '#27c93f' }} />
              <span className={styles.cTitle}>transmit.sh — {contact.prompt}</span>
              <span className={styles.statusDot} />
            </div>

            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successArt} aria-hidden="true">
                  <span className={styles.glyph}>✓</span>
                  <span className={styles.ring} />
                  <span className={styles.ring2} />
                </div>
                <div className={styles.successTitle}>TRANSMISSION SENT</div>
                <p className={styles.successText}>
                  Your mail client just opened. Hit send — I reply within 24 hours.
                </p>
                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                  SEND ANOTHER
                </button>
              </div>
            ) : (
              <form onSubmit={send} className={styles.form} noValidate>
                <div className={styles.formHeader}>
                  <span className={styles.prompt}>{'>'}</span>
                  <span className={styles.promptText}>{contact.prompt}</span>
                  <span className={styles.caret} />
                </div>

                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">NAME</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={update}
                      placeholder="your name"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">EMAIL</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@domain.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="service">SERVICE</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>
                      select_service()
                    </option>
                    {contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">PROJECT BRIEF</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={form.message}
                    onChange={update}
                    placeholder={contact.placeholder}
                    required
                  />
                </div>

                <button type="submit" className={styles.transmit}>
                  <span>{contact.ctaText}</span>
                  <span className={styles.transmitArrow}>⟶</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
