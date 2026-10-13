import { Link, useParams } from 'react-router-dom'
import { getProject } from '../data/projects.js'
import ProjectVisual from '../components/ProjectVisual.jsx'
import FlowDiagram from '../components/FlowDiagram.jsx'
import NotFound from './NotFound.jsx'
import { usePageSeo, buildProductSchema, buildSoftwareSourceCodeSchema } from '../components/usePageSeo.js'
import { profile, SITE_URL } from '../data/site.js'

const visuals = { 'kilele-archade': 'edu', apex: 'prop', mediflow: 'med' }

function CaseSection({ title, children }) {
  return (
    <section className="case-section">
      <h2>{title}</h2>
      {children}
    </section>
  )
}

export default function ProjectDetail() {
  const { slug } = useParams()
  const project = getProject(slug)

  const productSchema = project ? buildProductSchema(project) : undefined
  const repoSchema = project?.repo
    ? buildSoftwareSourceCodeSchema({
        name: `${project.name} Source Code`,
        description: project.summary,
        repoUrl: project.repo,
        language: project.stack.find((s) => ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'C++', 'C'].includes(s)) || 'TypeScript',
        datePublished: '2025-01-01',
      })
    : undefined

  usePageSeo({
    title: project ? `${project.name} — Case Study | Fredrick Onyango` : 'Project not found',
    description: project
      ? `${project.summary} Problem, solution, architecture and results for ${project.name}. Built with ${project.stack.slice(0, 5).join(', ')}.`
      : 'Project not found',
    path: `/projects/${slug}`,
    type: 'SoftwareApplication',
    extraSchema: {
      '@type': 'SoftwareApplication',
      name: project?.name,
      description: project?.summary,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Cloud, Web, Cross-platform',
      ...(project?.live && !project.live.includes('example.com') ? { url: project.live } : {}),
      author: { '@type': 'Person', name: profile.name },
      offers: project?.live && !project.live.includes('example.com')
        ? {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'KES',
            availability: 'https://schema.org/InStock',
            url: project.live,
          }
        : undefined,
      featureList: project?.caseStudy?.features || [],
      softwareVersion: '1.0',
      datePublished: '2025-01-01',
      keywords: project?.stack.join(', '),
    },
    jsonLd: [productSchema, repoSchema].filter(Boolean),
    lastmod: '2026-01-15',
  })

  if (!project) return <NotFound />
  const cs = project.caseStudy

  return (
    <>
      <header className="case-hero">
        <div className="container">
          <p className="section-kicker">
            <Link to="/projects">Projects</Link> / {project.slug}
          </p>
          <h1>{project.name}</h1>
          <p className="case-hero-summary">{cs.overview}</p>

          <div className="case-meta-row">
            <div>
              <dt>Status</dt>
              <dd>{project.status}</dd>
            </div>
            <div>
              <dt>My role</dt>
              <dd>{project.role}</dd>
            </div>
            <div>
              <dt>Domain</dt>
              <dd>{project.tags.join(', ')}</dd>
            </div>
          </div>

          <div className="btn-row" style={{ marginTop: '1.5rem' }}>
            {project.live && !project.live.includes('example.com') && (
              <a className="btn btn--primary" href={project.live} rel="noopener noreferrer">
                Live Demo
              </a>
            )}
            {project.repo && (
              <a className="btn btn--ghost" href={project.repo} rel="noopener noreferrer">
                GitHub
              </a>
            )}
            {project.slug === 'kilele-archade' && (
              <a className="btn btn--ghost" href="https://kilelearchade.co.ke" rel="noopener noreferrer">
                Live Website
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="container case-body">
        <CaseSection title="Problem">{cs.problem}</CaseSection>
        <CaseSection title="Solution">{cs.solution}</CaseSection>

        <CaseSection title="My role">
          <ul>
            {cs.role.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection title="Key features">
          <ul>
            {cs.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection title="Architecture">
          <FlowDiagram title={`${project.slug} / system-overview`} steps={cs.architecture.map((label, i) => (i === 0 ? label : { label }))} />
        </CaseSection>

        <CaseSection title="Technology stack">
          <div className="tag-row">
            {project.stack.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
          <p className="muted" style={{ marginTop: '1rem' }}>
            {cs.stackNote}
          </p>
        </CaseSection>

        <CaseSection title="Challenges">
          <ul>
            {cs.challenges.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection title="Solutions">
          <ul>
            {cs.solutions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </CaseSection>

        <CaseSection title="Results & current status">{cs.results}</CaseSection>

        <CaseSection title="Screenshots">
          <ProjectVisual kind={visuals[project.slug]} label={`${project.name} UI`} />
          {/* TODO: replace the placeholder artwork above with real screenshots:
              <img src={`/images/${project.slug}-1.webp`} alt="..." loading="lazy" /> */}
        </CaseSection>

        <CaseSection title="Links">
          <div className="btn-row">
            {cs.links.map((l) => (
              <a className="btn btn--ghost btn--sm" href={l.href} key={l.label} rel="noopener noreferrer">
                {l.label}
              </a>
            ))}
            <span className="chip">{SITE_URL}/projects/{project.slug}</span>
          </div>
        </CaseSection>

        <p style={{ paddingTop: '1.5rem' }}>
          <Link to="/projects">← All projects</Link>
        </p>
      </div>
    </>
  )
}
