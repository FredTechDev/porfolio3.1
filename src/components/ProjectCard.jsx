import { Link } from 'react-router-dom'
import ProjectVisual from './ProjectVisual.jsx'

export default function ProjectCard({ project, visual = 'generic' }) {
  return (
    <article className="card card--hover project-card">
      <ProjectVisual kind={visual} label={project.name} />
      <div className="project-card-body">
        <div className="project-card-head">
          <h3>
            <Link to={`/projects/${project.slug}`}>{project.name}</Link>
          </h3>
          <span className="status-badge">{project.status}</span>
        </div>

        <p>{project.summary}</p>
        <p className="project-problem">{project.problem}</p>

        <div className="tag-row" aria-label="Technology stack">
          {project.stack.slice(0, 6).map((t) => (
            <span className="chip" key={t}>
              {t}
            </span>
          ))}
          {project.stack.length > 6 && (
            <span className="chip">+{project.stack.length - 6}</span>
          )}
        </div>

        <div className="project-card-footer">
          <Link className="project-card-link" to={`/projects/${project.slug}`}>
            Case study →
          </Link>
          <div className="btn-row">
            {project.live && !project.live.includes('example.com') && (
              <a className="btn btn--primary btn--sm" href={project.live} rel="noopener noreferrer">
                Live Demo
              </a>
            )}
            {project.repo && (
              <a className="btn btn--ghost btn--sm" href={project.repo} rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
