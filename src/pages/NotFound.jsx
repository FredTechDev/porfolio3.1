import { Link, useLocation } from 'react-router-dom'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function NotFound() {
  const { pathname } = useLocation()
  usePageSeo(getSeo(pathname))

  return (
    <div className="center-page">
      <h1>404</h1>
      <p className="muted">That page doesn't exist.</p>
      <Link className="btn btn--primary" to="/">
        Back to home
      </Link>
    </div>
  )
}
