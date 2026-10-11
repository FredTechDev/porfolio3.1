import { Link } from 'react-router-dom'
import { profile } from '../data/site.js'

export default function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-name">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="hero-kicker">
            <span aria-hidden="true">⌁</span> {profile.shortRole}
          </p>
          <h1 id="hero-name">{profile.name}</h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-supporting">{profile.heroSupporting}</p>

          <div className="btn-row">
            <a className="btn btn--primary" href="#projects">
              View My Work
            </a>
            <Link className="btn btn--ghost" to="/contact">
              Contact Me
            </Link>
          </div>

          <p className="hero-links">
            <a href={profile.github} rel="noopener noreferrer">
              GitHub
            </a>{' '}
            ·{' '}
            <a href={profile.linkedin} rel="noopener noreferrer">
              LinkedIn
            </a>{' '}
            · {profile.location}
          </p>
        </div>

        <figure className="hero-photo">
          <img
            src="/fredrick-onyango.jpg"
            alt="Fredrick Onyango"
            width="512"
            height="683"
            fetchPriority="high"
          />
        </figure>
      </div>
    </section>
  )
}
