import { Link } from 'react-router-dom'
import { posts } from '../data/blog.js'
import { usePageSeo } from '../components/usePageSeo.js'
import { SITE_URL } from '../data/site.js'

export default function Blog() {
  usePageSeo({
    title: 'Blog — Fredrick Onyango | AI Engineering, System Architecture & Software Development',
    description:
      'Technical writing by Fredrick Onyango on AI engineering, RAG pipelines, PostgreSQL/pgvector, system architecture, and building production software. Lessons from building Kilele Archade and Apex.',
    path: '/blog',
    type: 'Blog',
    extraSchema: {
      '@type': 'Blog',
      name: 'Fredrick Onyango — Technical Blog',
      description: 'Technical writing on AI engineering, RAG, system architecture and building production software',
      author: {
        '@type': 'Person',
        name: 'Fredrick Onyango',
        url: SITE_URL,
      },
      blogPost: posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
        author: { '@type': 'Person', name: p.author },
      })),
    },
    lastmod: posts[0]?.date || '2026-01-15',
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
