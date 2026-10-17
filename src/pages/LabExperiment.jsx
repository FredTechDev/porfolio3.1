import { Link, useParams } from 'react-router-dom'
import PageNav from '../components/PageNav.jsx'
import TechIcon from '../components/TechIcon.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { getLabExperiment } from '../data/lab.js'
import { getSeo } from '../seo/routes.js'
import NotFound from './NotFound.jsx'

export default function LabExperiment() {
  const { slug } = useParams()
  const exp = getLabExperiment(slug)

  usePageSeo(getSeo(`/lab/${slug}`))

  if (!exp) return <NotFound />

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">
          <Link to="/lab">Lab</Link> / {exp.slug}
        </p>
        <h1>{exp.name}</h1>
        <p className="muted" style={{ maxWidth: 680 }}>
          {exp.description}
        </p>
        <div className="tag-row" style={{ margin: '1rem 0' }}>
          {exp.stack.map((t) => (
            <span className="chip chip--icon" key={t}>
              <TechIcon name={t} />
              {t}
            </span>
          ))}
        </div>
        {exp.repo && (
          <div className="btn-row">
            <a className="btn btn--primary" href={exp.repo} rel="noopener noreferrer">
              View source on GitHub
            </a>
          </div>
        )}
      </div>

      <div className="container case-body">
        <section className="case-section">
          <h2>What it tests</h2>
          <p>{exp.problem}</p>
        </section>
        <section className="case-section">
          <h2>How it works</h2>
          {exp.approach.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </section>
        <section className="case-section">
          <h2>What came out of it</h2>
          <p>{exp.outcome}</p>
        </section>
      </div>

      <PageNav
        links={[
          { to: '/lab', hint: 'Back', label: 'All lab experiments' },
          { to: '/ai-engineering', hint: 'See also', label: 'AI & Engineering' },
        ]}
      />
    </>
  )
}
