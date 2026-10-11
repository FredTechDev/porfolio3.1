import { Link } from 'react-router-dom'

export default function PageNav({ links }) {
  return (
    <nav className="page-nav" aria-label="Keep reading">
      <div className="container page-nav-grid">
        {links.map((l) => (
          <Link className="card card--hover page-nav-item" key={l.to} to={l.to}>
            <span className="page-nav-hint">{l.hint}</span>
            <span className="page-nav-label">
              {l.label} <span aria-hidden="true">→</span>
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
