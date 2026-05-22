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
    const subject = encodeURIComponent(`${form.service || 'Professional inquiry'} — ${form.name}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\n\n${form.message}`,
    )
    window.location.href = `mailto:${person.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
  }

  return (
    <section id="contact" className={styles.section} aria-labelledby="contact-title">
      <div className={styles.grid}>
        <div className={`${styles.left} reveal`}>
          <span className="kicker">Connect</span>
          <h2 className={styles.headline} id="contact-title">
            {contact.headline[0]}<br />
            <span>{contact.headline[1]}</span>
            <br />
            {contact.headline[2]}
          </h2>
          <p className={styles.desc}>{contact.description}</p>

          <div className={styles.links}>
            <a href={`mailto:${person.email}`} className={styles.link}>
              <span className={styles.linkKey}>Email</span>
              <span className={styles.linkVal}>{person.email}</span>
            </a>
            <a href={`tel:${person.phone}`} className={styles.link}>
              <span className={styles.linkKey}>Phone</span>
              <span className={styles.linkVal}>{person.phoneDisplay}</span>
            </a>
            <a
              href={person.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              <span className={styles.linkKey}>LinkedIn</span>
              <span className={styles.linkVal}>{person.linkedinHandle}</span>
            </a>
          </div>
        </div>

        <div className={`${styles.right} reveal`}>
          <div className={`${styles.console} hud-panel hud-scanline`}>
            {submitted ? (
              <div className={styles.success}>
                <div className={styles.successArt} aria-hidden="true">
                  <span className={styles.glyph}>✓</span>
                  <span className={styles.ring} />
                  <span className={styles.ring2} />
                </div>
                <div className={styles.successTitle}>Ready to send</div>
                <p className={styles.successText}>
                  Your email app should open with your message. Hit send and I will reply within 24 hours.
                </p>
                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={send} className={styles.form} noValidate>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label htmlFor="name">Your name</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={form.name}
                      onChange={update}
                      placeholder="John Smith"
                      autoComplete="name"
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="email">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={update}
                      placeholder="you@company.com"
                      autoComplete="email"
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label htmlFor="service">Topic</label>
                  <select
                    id="service"
                    name="service"
                    value={form.service}
                    onChange={update}
                    required
                  >
                    <option value="" disabled>
                      Choose a topic
                    </option>
                    {contact.serviceOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>

                <div className={styles.field}>
                  <label htmlFor="message">Your message</label>
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
                  <span className={styles.transmitArrow}>→</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
