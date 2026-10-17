import { Link } from 'react-router-dom'
import { profile } from '../data/site.js'

const explore = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Experience', to: '/experience' },
  { label: 'Lab', to: '/lab' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

const professional = [
  { label: 'GitHub', href: profile.github },
  { label: 'LinkedIn', href: profile.linkedin },
  { label: 'Email', href: `mailto:${profile.email}` },
  { label: 'CV', href: profile.cvPath },
]

const products = [
  { label: 'Kilele Archade', href: 'https://kilelearchade.co.ke' },
  { label: 'Kilele Archade — Case Study', to: '/projects/kilele-archade' },
  { label: 'Apex', to: '/projects/apex' },
]

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <p className="footer-name">{profile.name}</p>
            <p>{profile.role}</p>
            <p className="footer-aka">
              Also known as {profile.nicknames.join(' · ')}
            </p>
            <a className="btn btn--ghost btn--sm" href={profile.cvPath} download>
              Download CV
            </a>
          </div>

          <div>
            <h3>Explore</h3>
            <ul>
              {explore.map((l) => (
                <li key={l.label}>
                  <Link to={l.to}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Professional</h3>
            <ul>
              {professional.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3>Products</h3>
            <ul>
              {products.map((l) => (
                <li key={l.label}>
                  {l.href ? (
                    <a href={l.href} rel="noopener noreferrer">
                      {l.label}
                    </a>
                  ) : (
                    <Link to={l.to}>{l.label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2026 {profile.name}. All rights reserved.</span>
          <span>{profile.location}</span>
        </div>
      </div>
    </footer>
  )
}
