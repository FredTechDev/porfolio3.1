import { Link } from 'react-router-dom'
import { projects } from '../data/projects.js'
import ProjectCard from '../components/ProjectCard.jsx'
import SectionHeading from '../components/SectionHeading.jsx'

const visuals = { 'kilele-archade': 'edu', apex: 'prop', mediflow: 'med' }

export default function FeaturedProjects() {
  return (
    <section className="section section--alt" id="projects" aria-labelledby="projects-title">
      <div className="container">
        <SectionHeading kicker="Featured Projects" title="Real problems. Working software.">
          Each project below is a full story: problem, architecture, implementation and
          result. Start with a case study.
        </SectionHeading>

        <div className="grid grid--3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} visual={visuals[p.slug]} />
          ))}
        </div>

        <p style={{ marginTop: '2rem' }}>
          <Link className="btn btn--ghost" to="/projects">
            All projects →
          </Link>
        </p>
      </div>
    </section>
  )
}
