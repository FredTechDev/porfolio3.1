import { profile, education, philosophy, synbree } from '../data/site.js'
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
              I'm the founder of{' '}
              <a href={synbree.url} rel="noopener noreferrer">
                {synbree.name}
              </a>
              , a software engineering and digital innovation company building
              thoughtful digital products, intelligent systems, and software
              solutions that solve real problems.{' '}
              <a href={synbree.url} rel="noopener noreferrer">
                {synbree.workCta}
              </a>
              .
            </p>
            <p>
              I build practical technology solutions with modern software engineering,
              artificial intelligence, cloud computing, and data-driven systems — and
              I own them from architecture through to the deployed product.
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
              <strong>Founder of</strong>
              <span>
                <a href={synbree.url} rel="noopener noreferrer">
                  {synbree.name}
                </a>{' '}
                — {synbree.shortDescription}
              </span>
            </li>
            <li>
              <strong>Education</strong>
              <span>
                <a href={education.schoolUrl} rel="noopener noreferrer">
                  {education.school}
                </a>{' '}
                ({education.shortSchool}) · {education.qualification}, {education.status}
              </span>
            </li>
            <li>
              <strong>Based in</strong>
              <span>{profile.location}</span>
            </li>
            <li>
              <strong>Also known as</strong>
              <span>{profile.nicknames.join(' · ')}</span>
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
                I don't ship throwaway code — I build products designed around real
                users and real problems.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  )
}
