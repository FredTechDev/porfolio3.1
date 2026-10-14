import Experience from '../sections/Experience.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function ExperiencePage() {
  usePageSeo(getSeo('/experience'))

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Experience</p>
        <h1>Where I have worked and built</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Employment and self-driven product work — both are engineering experience.
        </p>
      </div>

      <Experience />

      <PageNav
        links={[
          { to: '/projects', hint: 'Next', label: 'Projects' },
          { to: '/contact', hint: 'Or', label: 'Get in touch' },
        ]}
      />
    </>
  )
}
