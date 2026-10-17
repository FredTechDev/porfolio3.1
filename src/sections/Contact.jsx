import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { profile } from '../data/site.js'

const EMAILJS = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
}
const emailjsConfigured = Boolean(EMAILJS.serviceId && EMAILJS.templateId && EMAILJS.publicKey)

// Sends through EmailJS when configured (stays on the page); otherwise falls
// back to opening the visitor's mail client. The honeypot field deters naive bot spam.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [error, setError] = useState('')
  const [status, setStatus] = useState('idle') // idle | sending | sent | fallback

  const update = (k) => (e) => {
    setForm((f) => ({ ...f, [k]: e.target.value }))
    setStatus((s) => (s === 'sent' ? 'idle' : s))
  }

  function mailtoFallback() {
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setStatus('fallback')
  }

  async function onSubmit(e) {
    e.preventDefault()
    if (form.company) return // bot silently dropped
    if (!form.name.trim() || !form.email.trim() || form.message.trim().length < 10) {
      setError('Please fill in your name, email and a message of at least 10 characters.')
      return
    }
    setError('')
    if (!emailjsConfigured) {
      mailtoFallback()
      return
    }
    setStatus('sending')
    try {
      await emailjs.send(
        EMAILJS.serviceId,
        EMAILJS.templateId,
        {
          to_email: profile.email,
          from_name: form.name,
          reply_to: form.email,
          message: form.message,
        },
        { publicKey: EMAILJS.publicKey },
      )
      setStatus('sent')
      setForm({ name: '', email: '', message: '', company: '' })
    } catch {
      setStatus('idle')
      setError('Could not send the message just now — falling back to your email app.')
      mailtoFallback()
    }
  }

  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
    { label: 'WhatsApp', value: 'Chat on WhatsApp', href: profile.whatsapp },
    { label: 'LinkedIn', value: profile.linkedin.replace('https://', ''), href: profile.linkedin },
    { label: 'GitHub', value: profile.github.replace('https://', ''), href: profile.github },
  ]

  return (
    <section className="section" id="contact" aria-label="Contact form">
      <div className="container">
        <div className="contact-grid">
          <form onSubmit={onSubmit} noValidate={false}>
            <div className="form-field">
              <label htmlFor="c-name">Name</label>
              <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={update('name')} required />
            </div>
            <div className="form-field">
              <label htmlFor="c-email">Email</label>
              <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={update('email')} required />
            </div>
            <div className="form-field">
              <label htmlFor="c-message">Message</label>
              <textarea id="c-message" value={form.message} onChange={update('message')} required />
            </div>

            {/* honeypot */}
            <div className="hp-field" aria-hidden="true">
              <label htmlFor="c-company">Company</label>
              <input id="c-company" type="text" tabIndex={-1} autoComplete="off" value={form.company} onChange={update('company')} />
            </div>

            {error && (
              <p role="alert" style={{ color: '#f87171', fontSize: '0.9rem' }}>
                {error}
              </p>
            )}

            <div className="btn-row">
              <button
                className={`btn btn--primary send-btn${status === 'sent' ? ' send-btn--sent' : ''}`}
                type="submit"
                disabled={status === 'sending'}
              >
                {status === 'sending' && <span className="btn-spinner" aria-hidden="true" />}
                {status === 'sending' ? 'Sending…' : status === 'sent' ? '✓ Sent' : 'Send Message'}
              </button>
            </div>
            {status === 'sent' && (
              <p role="status" style={{ color: 'var(--success, #4ade80)', fontSize: '0.9rem' }}>
                Message sent — thank you. I usually reply within a couple of days.
              </p>
            )}
            {status === 'fallback' && !error && (
              <p className="form-note">
                Your email app opened with the message ready to send — just hit send there.
              </p>
            )}
            {status !== 'fallback' && (
              <p className="form-note">
                {emailjsConfigured
                  ? 'Messages are delivered straight to my inbox. Response time: within a couple of days.'
                  : 'Opens your email app with the message ready to send. Response time: within a couple of days.'}
              </p>
            )}
          </form>

          <ul className="contact-channels">
            {channels.map((c) => (
              <li key={c.label}>
                <a href={c.href}>
                  {c.label}
                  <span>{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
