import { profile } from '../data/site.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function GithubSection() {
  return (
    <section className="section section--alt" id="github" aria-labelledby="github-title">
      <div className="container">
        <SectionHeading kicker="GitHub" title="The code is the conversation">
          Selected repositories, recent activity and the source behind most of this
          portfolio. Code quality speaks louder than contribution graphs.
        </SectionHeading>

        <div className="card" style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ margin: '0 0 0.25rem' }}>{profile.github.replace('https://', '')}</h3>
            <p className="muted" style={{ margin: 0, fontSize: '0.92rem' }}>
              Projects, experiments and product code under one profile.
            </p>
          </div>
          <a className="btn btn--primary" href={profile.github} rel="noopener noreferrer">
            View GitHub
          </a>
        </div>
      </div>
    </section>
  )
}
