import LabSection from '../sections/LabSection.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo, buildSoftwareSourceCodeSchema } from '../components/usePageSeo.js'
import { labExperiments } from '../data/lab.js'
import { SITE_URL } from '../data/site.js'

export default function LabPage() {
  const repoSchemas = labExperiments.map((exp) =>
    buildSoftwareSourceCodeSchema({
      name: exp.name,
      description: exp.description,
      repoUrl: exp.repo,
      language: exp.stack[0],
      datePublished: '2025-01-01',
    })
  )

  usePageSeo({
    title: 'Lab — Fredrick Onyango | AI, IoT & Engineering Experiments with Source Code',
    description:
      "Explore Fredrick Onyango's lab experiments: ESP32 IoT weather systems, RAG strategy benchmarks, AI provider fallback harnesses, computer vision attendance, and automation scripts. All with public GitHub repositories.",
    path: '/lab',
    type: 'CollectionPage',
    extraSchema: {
      '@type': 'ItemList',
      name: 'Engineering Lab Experiments',
      description: 'Collection of AI, IoT, data engineering and automation experiments by Fredrick Onyango',
      itemListElement: labExperiments.map((exp, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: exp.repo,
        name: exp.name,
      })),
    },
    jsonLd: repoSchemas,
    lastmod: '2026-01-15',
  })

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