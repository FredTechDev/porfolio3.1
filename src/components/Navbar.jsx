import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { navLinks, profile } from '../data/site.js'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link className="brand" to="/" onClick={() => setOpen(false)}>
          <picture className="brand-logo">
            <source type="image/webp" srcSet="/fred1-logo.webp" />
            <img
              src="/fred1-logo.jpg"
              width="256"
              height="256"
              alt="Fredrick Onyango — logo"
              loading="eager"
            />
          </picture>
          <span className="brand-name">
            Fredrick Onyango <span className="brand-dim">· Software Engineer</span>
          </span>
        </Link>

        <nav aria-label="Primary">
          <ul className="nav-links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <a className="btn btn--primary btn--sm nav-cv" href={profile.cvPath} download>
          Download CV
        </a>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {open && (
        <nav className="nav-mobile container" aria-label="Mobile">
          <ul>
            {navLinks.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.to === '/'} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <a className="btn btn--primary" href={profile.cvPath} download>
            Download CV
          </a>
        </nav>
      )}
    </header>
  )
}
