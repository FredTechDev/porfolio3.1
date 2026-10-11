import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'

/**
 * Clean redirect route (spec §25). `internal` targets are SPA routes and use
 * <Navigate>; everything else (external URLs, mailto, static assets like the
 * CV PDF) is a real browser navigation via location.replace. Only public,
 * professional destinations belong here.
 */
export default function ExternalRedirect({ to, internal = false }) {
  useEffect(() => {
    if (!internal) window.location.replace(to)
  }, [to, internal])

  if (internal) return <Navigate to={to} replace />

  return (
    <div className="center-page">
      <h1>Redirecting…</h1>
      <p className="muted">
        If you are not redirected, <a href={to}>continue to {to}</a>.
      </p>
    </div>
  )
}
