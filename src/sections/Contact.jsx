import { useState } from 'react'
import { profile } from '../data/site.js'

// No backend here: submissions open a pre-filled email to the address above.
// The honeypot field deters naive bot spam.
export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '', company: '' })
  const [error, setError] = useState('')

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  function onSubmit(e) {
    e.preventDefault()
    if (form.company) return // bot silently dropped
    if (!form.name.trim() || !form.email.trim() || form.message.trim().length < 10) {
      setError('Please fill in your name, email and a message of at least 10 characters.')
      return
    }
    setError('')
    const subject = encodeURIComponent(`Portfolio message from ${form.name}`)
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
  }

  const channels = [
    { label: 'Email', value: profile.email, href: `mailto:${profile.email}` },
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
              <button className="btn btn--primary" type="submit">
                Send Message
              </button>
            </div>
            <p className="form-note">
              Opens your email app with the message ready to send. Response time: within a couple of days.
            </p>
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
