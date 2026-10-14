import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'

const STARTERS = [
  'What is Kilele Archade?',
  'What do you use for retrieval and embeddings?',
  'What does your backend stack look like?',
]

// Renders nothing until /api/ask confirms a key is configured, so a deploy
// without one shows no broken widget. Local `vite dev` does not serve the
// function, so the section stays hidden there too.
export default function AskAI() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [status, setStatus] = useState('checking')
  const endRef = useRef(null)

  useEffect(() => {
    let stale = false
    fetch('/api/ask')
      .then((res) => res.json())
      .then((data) => {
        if (!stale) setStatus(data?.configured ? 'on' : 'off')
      })
      .catch(() => {
        if (!stale) setStatus('off')
      })
    return () => {
      stale = true
    }
  }, [])

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'nearest' })
  }, [messages, sending])

  async function send(text) {
    const question = (text ?? input).trim()
    if (!question || sending) return

    const history = [...messages, { role: 'user', content: question }]
    setMessages(history)
    setInput('')
    setError('')
    setSending(true)

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      if (res.status === 503) {
        setStatus('off')
        return
      }
      const data = await res.json().catch(() => null)
      if (!res.ok || !data?.answer) throw new Error(data?.error || 'empty')
      setMessages([...history, { role: 'model', content: data.answer }])
    } catch {
      setError('The assistant is unavailable right now. The contact form always reaches me.')
    } finally {
      setSending(false)
    }
  }

  if (status !== 'on') return null

  return (
    <section className="section section--alt" id="ask" aria-labelledby="ask-title">
      <div className="container">
        <p className="section-kicker">Ask AI</p>
        <h2 id="ask-title">Questions about the work? Ask directly</h2>
        <p className="muted" style={{ maxWidth: 640 }}>
          Answers come only from what is published on this site — projects, stack and
          experience. If it is not here, it will tell you so rather than guess.
        </p>

        <div className="ask-panel">
          <div className="ask-transcript" aria-live="polite">
            {messages.length === 0 && (
              <div className="ask-starters">
                {STARTERS.map((q) => (
                  <button key={q} type="button" className="chip chip--filter" onClick={() => send(q)}>
                    {q}
                  </button>
                ))}
              </div>
            )}

            {messages.map((m, i) => (
              <div key={i} className={`ask-msg ask-msg--${m.role}`}>
                <span className="ask-msg-role">{m.role === 'user' ? 'You' : 'Fredrick'}</span>
                <p className="ask-msg-body">{m.content}</p>
              </div>
            ))}

            {sending && (
              <div className="ask-msg ask-msg--model">
                <span className="ask-msg-role">Fredrick</span>
                <p className="ask-msg-body ask-typing" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </p>
              </div>
            )}

            <div ref={endRef} />
          </div>

          {error && (
            <p className="ask-error" role="alert">
              {error}{' '}
              <Link to="/contact">Contact page →</Link>
            </p>
          )}

          <form
            className="ask-form"
            onSubmit={(e) => {
              e.preventDefault()
              send()
            }}
          >
            <label className="sr-only" htmlFor="ask-input">
              Ask about my work
            </label>
            <input
              id="ask-input"
              type="text"
              value={input}
              maxLength={2000}
              placeholder="Ask about a project, the stack or my experience"
              autoComplete="off"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault()
                  send()
                }
              }}
            />
            <button
              type="submit"
              className="btn btn--primary send-btn"
              disabled={sending || !input.trim()}
            >
              {sending && <span className="btn-spinner" aria-hidden="true" />}
              {sending ? 'Thinking…' : 'Ask'}
            </button>
            {messages.length > 0 && (
              <button
                type="button"
                className="btn btn--ghost ask-reset"
                onClick={() => {
                  setMessages([])
                  setError('')
                }}
              >
                Reset
              </button>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
