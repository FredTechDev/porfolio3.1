import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'
import SectionHeading from '../components/SectionHeading.jsx'
import FlowDiagram from '../components/FlowDiagram.jsx'

export default function SystemArchitecture() {
  return (
    <section className="section section--alt" id="architecture" aria-labelledby="arch-title">
      <div className="container">
        <SectionHeading kicker="System Architecture" title="How the products are put together">
          Selected architectures from shipped work — authentication, business logic,
          data, external services and the AI layer, each in its proper place.
        </SectionHeading>

        <div className="grid grid--2">
          {projects
            .filter((p) => p.caseStudy?.architecture)
            .map((p) => (
              <div key={p.slug}>
                <FlowDiagram
                  title={`${p.slug} / system-overview`}
                  steps={p.caseStudy.architecture.map((label, i) =>
                    i === 0 ? label : { label },
                  )}
                />
                <p style={{ marginTop: '0.9rem' }}>
                  <Link to={`/projects/${p.slug}`}>
                    {p.name}: architecture, security and decisions →
                  </Link>
                </p>
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
