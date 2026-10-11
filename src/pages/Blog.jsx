import { Link } from 'react-router-dom'
import { posts } from '../data/blog.js'
import { usePageSeo } from '../components/usePageSeo.js'

export default function Blog() {
  usePageSeo({
    title: 'Blog — Fredrick Onyango',
    description:
      'Technical writing by Fredrick Onyango on AI engineering, RAG, PostgreSQL, system architecture and building production software.',
    path: '/blog',
  })

  return (
    <div className="page-head container" style={{ paddingBottom: '4rem' }}>
      <p className="section-kicker">Blog</p>
      <h1>Technical writing</h1>
      <p className="muted" style={{ maxWidth: 640, marginBottom: '2.5rem' }}>
        Lessons from building Kilele Archade, Apex and the experiments around them.
      </p>

      <div className="timeline">
        {posts.map((p) => (
          <article className="card card--hover post-card" key={p.slug}>
            <div className="post-meta">
              <time dateTime={p.date}>{p.date}</time>
              <span>{p.category}</span>
              <span>{p.readingMinutes} min read</span>
              <span>{p.author}</span>
            </div>
            <h3>
              <Link to={`/blog/${p.slug}`}>{p.title}</Link>
            </h3>
            <p>{p.excerpt}</p>
          </article>
        ))}
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to home</Link>
      </p>
    </div>
  )
}
