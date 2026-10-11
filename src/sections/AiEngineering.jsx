import SectionHeading from '../components/SectionHeading.jsx'
import FlowDiagram from '../components/FlowDiagram.jsx'

const concepts = [
  'Retrieval-Augmented Generation',
  'Embeddings',
  'Vector databases / pgvector',
  'Document processing',
  'LLM integration',
  'AI provider fallback architecture',
  'Prompt engineering',
  'Cloud AI',
  'Machine learning',
  'Computer vision',
  'AI system architecture',
]

export default function AiEngineering() {
  return (
    <section className="section" id="ai-engineering" aria-labelledby="ai-title">
      <div className="container">
        <SectionHeading kicker="AI & Engineering" title="Beyond calling an AI API">
          AI features only work as products when the engineering around them does:
          retrieval quality, fallback chains, data models and security. This is the
          pipeline behind Kilele Archade's tutor.
        </SectionHeading>

        <div className="about-grid">
          <FlowDiagram
            title="kilele-archade / ai-tutor-request"
            steps={[
              { label: 'Student question', note: 'from a subject, level and competence' },
              { label: 'Frontend (React + TypeScript)' },
              { label: 'API layer', note: 'Supabase' },
              { label: 'Authentication & row-level security' },
              { label: 'Application logic', note: 'resolve curriculum scope for the query' },
              { label: 'Document retrieval', note: 'metadata filter + pgvector similarity search' },
              { label: 'Relevant context', note: 're-ranked passages within token budget' },
              { label: 'LLM / AI provider', note: 'primary provider with transparent fallback chain' },
              { label: 'Grounded response + citations', note: 'Cloudinary assets attached where relevant' },
            ]}
          />

          <div>
            <h3>What I work with</h3>
            <div className="tag-row">
              {concepts.map((c) => (
                <span className="chip" key={c}>
                  {c}
                </span>
              ))}
            </div>

            <h3 style={{ marginTop: '2rem' }}>How I think about AI systems</h3>
            <ul className="philosophy">
              <li>Retrieval quality, not model size, decides whether answers are trustworthy.</li>
              <li>Every provider is replaceable — build the fallback before you need it.</li>
              <li>Ground answers in your own data and cite it, so users can verify.</li>
              <li>An AI feature is a full pipeline: ingestion → indexing → retrieval → prompting → evaluation.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
