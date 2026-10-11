import { achievements, currentlyLearning } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function Achievements() {
  return (
    <section className="section section--alt" id="achievements" aria-labelledby="ach-title">
      <div className="container">
        <div className="about-grid">
          <div>
            <SectionHeading kicker="Achievements" title="Proof, not numbers">
              Genuine milestones only — products launched and competitions entered.
            </SectionHeading>
            <div className="grid grid--2">
              {achievements.map((a) => (
                <div className="card" key={a.title}>
                  <p className="section-kicker" style={{ marginBottom: '0.35rem' }}>
                    {a.kind}
                  </p>
                  <h3 style={{ marginBottom: '0.25rem' }}>{a.title}</h3>
                  <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>
                    {a.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHeading kicker="Currently Exploring" title="What I'm learning now" />
            <div className="tag-row">
              {currentlyLearning.map((t) => (
                <span className="chip chip--accent" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
