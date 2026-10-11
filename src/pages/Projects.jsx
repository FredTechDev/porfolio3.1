import { Link } from 'react-router-dom'
import { projects, otherProjects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { usePageSeo } from '../components/usePageSeo.js'

const visuals = { 'kilele-archade': 'edu', apex: 'prop', mediflow: 'med' }

export default function Projects() {
  usePageSeo({
    title: 'Projects — Fredrick Onyango',
    description:
      'Software projects by Fredrick Onyango: Kilele Archade, Apex and selected AI, data, engineering and IoT work with case studies and source.',
    path: '/projects',
  })

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Projects</p>
        <h1>Problem → Solution → Architecture → Result</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Featured work has full case studies. Secondary work ships with source.
        </p>
      </div>

      <section className="section" style={{ paddingTop: '1.5rem' }} aria-label="Featured projects">
        <div className="container">
          <div className="grid grid--3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} visual={visuals[p.slug]} />
            ))}
          </div>
        </div>
      </section>

      <section className="section section--alt" aria-label="Other work" style={{ marginTop: 0 }}>
        <div className="container">
          <SectionHeading kicker="Other Projects" title="AI, data, engineering and IoT">
            Smaller projects where GitHub and a live demo are enough evidence.
          </SectionHeading>

          {otherProjects.map((group) => (
            <div key={group.category} style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>{group.category}</h2>
              <div className="grid grid--3">
                {group.items.map((p) => (
                  <article className="card card--hover" key={p.name}>
                    <h3>{p.name}</h3>
                    <p className="muted" style={{ fontSize: '0.92rem' }}>
                      {p.description}
                    </p>
                    <div className="tag-row" style={{ marginBottom: '0.9rem' }}>
                      {p.stack.map((t) => (
                        <span className="chip" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="btn-row">
                      {p.repo && (
                        <a className="btn btn--ghost btn--sm" href={p.repo} rel="noopener noreferrer">
                          GitHub
                        </a>
                      )}
                      {p.live && (
                        <a className="btn btn--primary btn--sm" href={p.live} rel="noopener noreferrer">
                          Live Demo
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          ))}

          <p>
            <Link to="/">← Back to home</Link>
          </p>
        </div>
      </section>
    </>
  )
}
