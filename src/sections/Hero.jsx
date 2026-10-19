import { Link } from 'react-router-dom'
import Availability from '../components/Availability.jsx'
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
          <p className="hero-aka">
            Also known as{' '}
            {profile.nicknames.map((n, i) => (
              <span key={n}>
                {i > 0 && ' · '}
                {n}
              </span>
            ))}
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-supporting">{profile.heroSupporting}</p>

          <Availability />

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
          {/* The frame is capped at 340px by .hero-photo, so 360w covers 1x and
              720w covers 2x. */}
          <picture>
            <source
              type="image/webp"
              srcSet="/fred3-360w.webp 360w, /fred3-720w.webp 720w"
              sizes="360px"
            />
            <img
              src="/fred3-360w.jpg"
              srcSet="/fred3-360w.jpg 360w, /fred3-720w.jpg 720w"
              sizes="360px"
              alt="Fredrick Onyango, Full-Stack Developer, Backend Engineer and AI/ML Engineer based in Nairobi, Kenya"
              width="360"
              height="480"
              fetchPriority="high"
            />
          </picture>
        </figure>
      </div>
    </section>
  )
}
