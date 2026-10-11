import { experiences } from '../data/site.js'

export default function Experience() {
  return (
    <section className="section" id="experience" aria-label="Experience">
      <div className="container">
        <div className="timeline">
          {experiences.map((e) => (
            <article className="card card--hover timeline-item" key={`${e.role}-${e.org}`}>
              <h3>{e.role}</h3>
              <p className="timeline-meta">
                <span className="timeline-org">{e.org}</span>
                <span>{e.period}</span>
                <span>{e.type}</span>
              </p>
              <ul>
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
