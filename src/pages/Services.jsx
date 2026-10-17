import { Link } from 'react-router-dom'
import Availability from '../components/Availability.jsx'
import PageNav from '../components/PageNav.jsx'
import SectionHeading from '../components/SectionHeading.jsx'
import TechIcon from '../components/TechIcon.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { philosophy, services, skillGroups } from '../data/site.js'
import { getSeo } from '../seo/routes.js'

const engagements = [
  {
    title: 'Product build',
    body: 'End-to-end delivery — scope, architecture, build and launch of a first production version, the way I shipped Kilele Archade and Apex.',
  },
  {
    title: 'Freelance / contract',
    body: 'Backend features, AI and RAG integrations, or frontend work delivered inside your existing codebase and process.',
  },
  {
    title: 'Remote role',
    body: 'Full-stack, backend or AI/ML engineering for teams hiring from Kenya or working globally remote.',
  },
]

export default function Services() {
  usePageSeo(getSeo('/services'))

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Services</p>
        <h1>Hire Fredrick Onyango — full-stack, backend &amp; AI engineering</h1>
        <p className="muted" style={{ maxWidth: 680 }}>
          Kenya-based engineer building intelligent, scalable products: Kilele Archade, a live AI
          learning platform at kilelearchade.co.ke, and Apex, a PropTech platform. Available for
          product builds, freelance contracts and remote roles worldwide.
        </p>
        <Availability />
      </div>

      <section className="section" aria-label="What I deliver">
        <div className="container">
          <SectionHeading kicker="What I deliver" title="Engineering services">
            Six service lines — every one backed by production software you can try or read on
            GitHub, not slideware.
          </SectionHeading>
          <div className="grid grid--3">
            {services.map((s) => (
              <article className="card card--hover" key={s.title}>
                <h3>{s.title}</h3>
                <p className="muted" style={{ fontSize: '0.92rem' }}>
                  {s.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Working together">
        <div className="container">
          <div
            style={{
              display: 'flex',
              gap: '2.5rem',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginBottom: '2.5rem',
            }}
          >
            <picture>
              <source
                type="image/webp"
                srcSet="/fredrick-onyango-360w.webp 360w, /fredrick-onyango-720w.webp 720w"
                sizes="360px"
              />
              <img
                src="/fredrick-onyango-360w.jpg"
                srcSet="/fredrick-onyango-360w.jpg 360w, /fredrick-onyango-720w.jpg 720w"
                sizes="360px"
                alt="Fredrick Onyango — Full-Stack Developer, Backend Engineer and AI/ML Engineer based in Nairobi, Kenya"
                width="360"
                height="480"
                loading="lazy"
                style={{ borderRadius: '1rem', objectFit: 'cover', maxWidth: 240 }}
              />
            </picture>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h2 style={{ marginTop: 0 }}>Working together</h2>
              <p className="muted">
                My operating principles: understand the real problem before writing code, design
                the architecture first, ship working software, then improve it continuously. You
                get direct communication with the engineer building your product — no handoff
                layers.
              </p>
              <ol className="muted" style={{ paddingLeft: '1.2rem' }}>
                {philosophy.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ol>
            </div>
          </div>

          <div className="grid grid--3">
            {engagements.map((e) => (
              <article className="card" key={e.title}>
                <h3>{e.title}</h3>
                <p className="muted" style={{ fontSize: '0.92rem' }}>
                  {e.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" aria-label="Stack">
        <div className="container">
          <SectionHeading kicker="Stack" title="Technologies I build with" />
          {skillGroups.map((g) => (
            <div key={g.category} style={{ marginBottom: '1rem' }}>
              <p className="muted" style={{ fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                {g.category}
              </p>
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

          <div className="btn-row" style={{ marginTop: '2rem' }}>
            <Link className="btn btn--primary" to="/contact">
              Start a project
            </Link>
            <Link className="btn btn--ghost" to="/projects">
              See the proof
            </Link>
          </div>
        </div>
      </section>

      <PageNav
        links={[
          { to: '/contact', hint: 'Next', label: 'Contact' },
          { to: '/projects', hint: 'See also', label: 'Projects' },
        ]}
      />
    </>
  )
}
