import { education, certifications } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Education() {
  return (
    <section className="section section--alt" id="education" aria-labelledby="edu-title">
      <div className="container">
        <SectionHeading kicker="Education" title="What I studied, and what I have certified in">
          Formal study behind the engineering, plus any credential I can link to.
        </SectionHeading>

        <div className="edu-card">
          <div className="edu-card-head">
            <h3>{education.qualification}</h3>
            <span className="status-badge">{education.status}</span>
          </div>
          <p className="edu-school">
            {education.school}
            {education.shortSchool && education.shortSchool !== education.school ? (
              <span className="edu-short"> · {education.shortSchool}</span>
            ) : null}
          </p>
          {education.period && <p className="muted edu-period">{education.period}</p>}
          {education.coursework.length > 0 && (
            <>
              <h4 className="edu-sub">Relevant coursework</h4>
              <div className="tag-row">
                {education.coursework.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {certifications.length > 0 && (
          <>
            <h3 className="edu-certs-title">Certifications</h3>
            <div className="grid grid--3">
              {certifications.map((c) => (
                <article className="card" key={c.name}>
                  <h4>{c.name}</h4>
                  <p className="muted edu-cert-issuer">{c.issuer}</p>
                  <div className="edu-cert-foot">
                    {c.date && <span className="edu-cert-date">{c.date}</span>}
                    {c.url && (
                      <a className="edu-cert-link" href={c.url} rel="noopener noreferrer">
                        Verify →
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
