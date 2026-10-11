import AiEngineering from '../sections/AiEngineering.jsx'
import SystemArchitecture from '../sections/SystemArchitecture.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'

export default function AiEngineeringPage() {
  usePageSeo({
    title: 'AI & Engineering — Fredrick Onyango',
    description:
      'How Fredrick Onyango approaches AI engineering: RAG pipelines, LLM integration patterns and system architecture behind his products.',
    path: '/ai-engineering',
  })

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">AI & Engineering</p>
        <h1>AI systems, designed end to end</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          The pipelines I build and the architecture decisions behind them — from retrieval to deployment.
        </p>
      </div>

      <AiEngineering />
      <SystemArchitecture />

      <PageNav
        links={[
          { to: '/lab', hint: 'Next', label: 'Lab' },
          { to: '/projects', hint: 'See also', label: 'Projects' },
        ]}
      />
    </>
  )
}
