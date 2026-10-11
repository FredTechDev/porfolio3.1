import { Link } from 'react-router-dom'

export default function NotFound() {
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
