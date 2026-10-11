import { Link } from 'react-router-dom'
import { profile } from '../data/site.js'

export default function HomeContactCTA() {
  return (
    <section className="section home-cta" id="contact" aria-labelledby="home-cta-title">
      <div className="container">
        <p className="section-kicker">Contact</p>
        <h2 id="home-cta-title">Have a problem worth building?</h2>
        <p className="muted" style={{ maxWidth: 560 }}>
          Tell me about your product, platform or idea — I reply to every serious inquiry.
        </p>
        <div className="btn-row">
          <Link className="btn btn--primary" to="/contact">
            Get in touch
          </Link>
          <a className="btn btn--ghost" href={`mailto:${profile.email}`}>
            {profile.email}
          </a>
        </div>
      </div>
    </section>
  )
}
