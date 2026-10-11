import { profile, education, philosophy } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function About() {
  return (
    <section className="section" id="about" aria-labelledby="about-title">
      <div className="container">
        <SectionHeading kicker="About" title="Who I am and what I build">
          Software engineering is how I turn real-world problems into working products.
        </SectionHeading>

        <div className="about-grid">
          <div>
            <p>
              I'm an enthusiastic IT student and software developer focused on building
              practical technology solutions using modern software engineering,
              artificial intelligence, cloud computing, and data-driven systems.
            </p>
            <p className="muted">
              My interests span full-stack development, backend engineering, AI/ML,
              system architecture, databases, cloud technologies, and product
              development.
            </p>
            <p className="muted">
              I enjoy taking ideas from concept to working software — understanding the
              problem, designing the architecture, building the system, integrating the
              necessary technologies, and continuously improving the product.
            </p>

            <h3 style={{ marginTop: '1.75rem' }}>Engineering philosophy</h3>
            <ul className="philosophy">
              {philosophy.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>

            <div className="btn-row" style={{ marginTop: '1.75rem' }}>
              <a className="btn btn--ghost btn--sm" href={profile.cvPath} download>
                Download CV
              </a>
            </div>
          </div>

          <ul className="about-facts">
            <li>
              <strong>Education</strong>
              <span>
                {education.qualification} — {education.school} ({education.status})
              </span>
            </li>
            <li>
              <strong>Based in</strong>
              <span>{profile.location}</span>
            </li>
            <li>
              <strong>Focus areas</strong>
              <span>Full-stack · Backend · AI/ML · Data · Cloud · Architecture</span>
            </li>
            <li>
              <strong>Products I build</strong>
              <span>Kilele Archade (EdTech + AI) · Apex (PropTech SaaS)</span>
            </li>
            <li>
              <strong>Entrepreneurial drive</strong>
              <span>
                I don't only build assignments — I build products designed around real
                users and real problems.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
