import LabSection from '../sections/LabSection.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function LabPage() {
  usePageSeo(getSeo('/lab'))

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Lab</p>
        <h1>Experiments, prototypes and play</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Smaller builds where I test ideas — IoT, AI, vision, cloud and automation. GitHub is the
          proof; no case study required for every experiment.
        </p>
      </div>

      <LabSection />

      <PageNav
        links={[
          { to: '/ai-engineering', hint: 'Next', label: 'AI & Engineering' },
          { to: '/projects', hint: 'See also', label: 'Projects' },
        ]}
      />
    </>
  )
}
