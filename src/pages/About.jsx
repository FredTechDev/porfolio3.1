import About from '../sections/About.jsx'
import Education from '../sections/Education.jsx'
import TechStack from '../sections/TechStack.jsx'
import Achievements from '../sections/Achievements.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function AboutPage() {
  usePageSeo(getSeo('/about'))

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">About</p>
        <h1>The engineer behind the products</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Background, working philosophy, the tools I use daily and what I have shipped so far.
        </p>
      </div>

      <About />
      <Education />
      <TechStack />
      <Achievements />

      <PageNav
        links={[
          { to: '/experience', hint: 'Next', label: 'Experience' },
          { to: '/projects', hint: 'See also', label: 'Projects' },
        ]}
      />
    </>
  )
}
