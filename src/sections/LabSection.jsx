import { labExperiments } from '../data/lab.js'

export default function LabSection() {
  return (
    <section className="section" id="lab" aria-label="The Lab">
      <div className="container">
        <div className="grid grid--3">
          {labExperiments.map((x) => (
            <article className="card card--hover" key={x.name}>
              <h3>{x.name}</h3>
              <p className="muted" style={{ fontSize: '0.92rem' }}>
                {x.description}
              </p>
              <div className="tag-row" style={{ marginBottom: '0.9rem' }}>
                {x.stack.map((t) => (
                  <span className="chip" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              {x.repo && (
                <div className="btn-row">
                  <a className="btn btn--ghost btn--sm" href={x.repo} rel="noopener noreferrer">
                    GitHub
                  </a>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
