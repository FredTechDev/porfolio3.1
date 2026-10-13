import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects, otherProjects, projectFilters } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import { usePageSeo, buildProductSchema } from '../components/usePageSeo.js'
import { SITE_URL } from '../data/site.js'

const visuals = { 'kilele-archade': 'edu', apex: 'prop', mediflow: 'med' }

export default function Projects() {
  const [filter, setFilter] = useState('all')
  const featuredProducts = projects.filter((p) => p.featured).map(buildProductSchema)
  usePageSeo({
    title: 'Projects — Fredrick Onyango | Full-Stack, AI/ML & Backend Engineering Portfolio',
    description:
      'Explore Fredrick Onyango\'s software projects: Kilele Archade (AI EdTech), Apex (PropTech rental management), MediFlow (HealthTech), plus AI, data engineering and IoT experiments. Full case studies with architecture, stack and results.',
    path: '/projects',
    type: 'CollectionPage',
    extraSchema: {
      '@type': 'ItemList',
      name: 'Software Projects Portfolio',
      description: 'Collection of full-stack, AI/ML, backend and IoT projects by Fredrick Onyango',
      itemListElement: projects
        .filter((p) => p.featured)
        .map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/projects/${p.slug}`,
          name: p.name,
        })),
    },
    lastmod: '2026-01-15',
  })

  const visibleProjects =
    filter === 'all' ? projects : projects.filter((p) => p.filters.includes(filter))
  const visibleGroups =
    filter === 'all' ? otherProjects : otherProjects.filter((g) => g.filters.includes(filter))
  const shown = visibleProjects.length + visibleGroups.reduce((n, g) => n + g.items.length, 0)

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Projects</p>
        <h1>Problem → Solution → Architecture → Result</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Featured work has full case studies. Secondary work ships with source.
        </p>
      </div>

      <div className="container">
        <div className="filter-bar" role="group" aria-label="Filter projects by focus area">
          {projectFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              className={`chip chip--filter${filter === f.id ? ' chip--filter-active' : ''}`}
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
            >
              {f.label}
            </button>
          ))}
          <span className="filter-count" role="status">
            {shown} {shown === 1 ? 'project' : 'projects'}
          </span>
        </div>
      </div>

      {visibleProjects.length > 0 && (
        <section className="section" style={{ paddingTop: '1.5rem' }} aria-label="Featured projects">
          <div className="container">
            <div className="grid grid--3">
              {visibleProjects.map((p) => (
                <ProjectCard key={p.slug} project={p} visual={visuals[p.slug]} />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section section--alt" aria-label="Other work" style={{ marginTop: 0 }}>
        <div className="container">
          <SectionHeading kicker="Other Projects" title="AI, data, engineering and IoT">
            Smaller projects where GitHub and a live demo are enough evidence.
          </SectionHeading>

          {visibleGroups.map((group) => (
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
