'use client'

import { useEffect, useRef, useState } from 'react'
import { STARTER_PROMPTS } from '@/lib/krishan-bot-prompts'
import styles from './KrishanGPT.module.css'

function linkify(text) {
  const parts = String(text).split(/(https?:\/\/[^\s]+|\/resumes\/[^\s]+)/g)
  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part) || part.startsWith('/resumes/')) {
      return (
        <a key={i} href={part} target="_blank" rel="noopener noreferrer">
          {part}
        </a>
      )
    }
    return part
  })
}

function welcomeMessage(firstName) {
  return `Hi — I'm KrishanGPT. Ask me about ${firstName}'s work, experience, skills, wins, or how to connect.`
}

export default function KrishanGPT({ profileSlug, person }) {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [suggestions, setSuggestions] = useState(STARTER_PROMPTS)
  const [messages, setMessages] = useState([])
  const listRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: 'bot', text: welcomeMessage(person.firstName) }])
    }
  }, [open, messages.length, person.firstName])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
    }
  }, [open])

  useEffect(() => {
    const node = listRef.current
    if (node) {
      node.scrollTop = node.scrollHeight
    }
  }, [messages, typing, suggestions])

  async function sendMessage(text) {
    const trimmed = text.trim()
    if (!trimmed || typing) return

    setInput('')
    setSuggestions([])
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setTyping(true)

    const started = Date.now()

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          slug: profileSlug,
          origin: typeof window !== 'undefined' ? window.location.origin : '',
        }),
        signal: AbortSignal.timeout(10000),
      })
      const data = await res.json()
      const reply = res.ok ? data.reply : data.error || 'Something went wrong. Please try again.'
      const delay = Math.max(0, 450 - (Date.now() - started))
      await new Promise((resolve) => setTimeout(resolve, delay))
      setMessages((prev) => [...prev, { role: 'bot', text: reply }])
      if (data.suggestions?.length) {
        setSuggestions(data.suggestions)
      } else {
        setSuggestions([])
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'bot', text: 'I could not reach the server. Please try again in a moment.' },
      ])
      setSuggestions(STARTER_PROMPTS)
    } finally {
      setTyping(false)
    }
  }

  function onSubmit(e) {
    e.preventDefault()
    sendMessage(input)
  }

  return (
    <div className={styles.root}>
      {open ? (
        <div className={styles.panel} role="dialog" aria-label="KrishanGPT chat">
          <div className={styles.header}>
            <div className={styles.headerInfo}>
              <div className={styles.avatar} aria-hidden="true">
                GPT
              </div>
              <div>
                <div className={styles.headerTitle}>KrishanGPT</div>
                <div className={styles.headerSub}>Answers from {person.name}&apos;s portfolio</div>
              </div>
            </div>
            <button
              type="button"
              className={styles.closeBtn}
              onClick={() => setOpen(false)}
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div className={styles.messages} ref={listRef} aria-live="polite">
            {messages.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.bot}`}
              >
                {msg.role === 'bot' ? linkify(msg.text) : msg.text}
              </div>
            ))}
            {typing ? (
              <div className={styles.typing} aria-label="KrishanGPT is typing">
                <span />
                <span />
                <span />
              </div>
            ) : null}
          </div>

          {suggestions.length ? (
            <div className={styles.suggestions}>
              {suggestions.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  className={styles.chip}
                  onClick={() => sendMessage(prompt)}
                  disabled={typing}
                >
                  {prompt}
                </button>
              ))}
            </div>
          ) : null}

          <form className={styles.composer} onSubmit={onSubmit}>
            <input
              ref={inputRef}
              className={styles.input}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Krishan..."
              aria-label="Message KrishanGPT"
              disabled={typing}
              maxLength={500}
            />
            <button type="submit" className={styles.sendBtn} disabled={typing || !input.trim()} aria-label="Send">
              →
            </button>
          </form>
        </div>
      ) : null}

      <button
        type="button"
        className={styles.launcher}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="krishangpt-panel"
      >
        <span className={styles.launcherIcon} aria-hidden="true">
          GPT
        </span>
        <span className={styles.launcherText}>
          <span className={styles.launcherTitle}>KrishanGPT</span>
          <span className={styles.launcherSub}>Ask about me</span>
        </span>
      </button>
    </div>
  )
}
