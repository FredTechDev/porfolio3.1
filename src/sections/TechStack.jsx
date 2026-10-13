import { skillGroups } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'
import TechIcon from '../components/TechIcon.jsx'

export default function TechStack() {
  return (
    <section className="section section--alt" id="tech-stack" aria-labelledby="stack-title">
      <div className="container">
        <SectionHeading kicker="Tech Stack" title="Tools I use to ship — not badges I collect">
          No fake percentages. Every technology here appears in a project you can read
          about on this site.
        </SectionHeading>

        <div className="skills-grid">
          {skillGroups.map((g) => (
            <div className="card skill-group" key={g.category}>
              <h3>{g.category}</h3>
              <div className="tag-row">
                {g.items.map((t) => (
                  <span className="chip chip--icon" key={t}>
                    <TechIcon name={t} />
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
