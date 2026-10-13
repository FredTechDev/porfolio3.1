import AiEngineering from '../sections/AiEngineering.jsx'
import SystemArchitecture from '../sections/SystemArchitecture.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { SITE_URL } from '../data/site.js'

export default function AiEngineeringPage() {
  usePageSeo({
    title: 'AI & Engineering — Fredrick Onyango | RAG, LLM Integration & System Architecture',
    description:
      'How Fredrick Onyango approaches AI engineering: RAG pipelines, LLM integration patterns, pgvector retrieval, provider fallback architectures, and system design behind Kilele Archade and Apex. Deep technical dive into production AI systems.',
    path: '/ai-engineering',
    type: 'WebPage',
    extraSchema: {
      '@type': 'TechArticle',
      headline: 'AI & Engineering — System Architecture & RAG Pipelines',
      description: 'Technical deep-dive into AI engineering practices: RAG, LLM integration, vector search, system architecture',
      author: { '@type': 'Person', name: 'Fredrick Onyango', url: SITE_URL },
      publisher: { '@type': 'Organization', name: 'Fredrick Onyango', url: SITE_URL },
      articleSection: 'AI Engineering',
      keywords: 'RAG, Retrieval-Augmented Generation, LLM, AI Engineering, pgvector, Vector Search, System Architecture, Machine Learning, Kenya',
      learningResourceType: 'Technical Guide',
      audience: { '@type': 'Audience', audienceType: 'Software Engineers, AI Engineers, CTOs' },
    },
    lastmod: '2026-01-15',
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
