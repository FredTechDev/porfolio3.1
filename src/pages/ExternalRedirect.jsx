import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

/**
 * Clean redirect route (spec §25). Internal targets move through the router,
 * external ones (URLs, mailto, the CV PDF) are real browser navigations.
 * Only public, professional destinations belong here.
 *
 * Aliases stay noindex — they exist to be shared, not found — and render a
 * working link so the prerendered, JS-less copy still gets the visitor there.
 */
export default function ExternalRedirect({ to, internal = false, path }) {
  const navigate = useNavigate()
  usePageSeo(getSeo(path))

  useEffect(() => {
    if (internal) navigate(to, { replace: true })
    else window.location.replace(to)
  }, [to, internal, navigate])

  return (
    <div className="center-page">
      <h1>Redirecting…</h1>
      <p className="muted">
        If you are not redirected, <a href={to}>continue to {to}</a>.
      </p>
    </div>
  )
}
