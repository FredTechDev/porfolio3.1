import { Link } from 'react-router-dom'
import { posts, categories, categoryForPost } from '../data/blog.js'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function Blog() {
  usePageSeo(getSeo('/blog'))

  return (
    <div className="page-head container" style={{ paddingBottom: '4rem' }}>
      <p className="section-kicker">Blog</p>
      <h1>Technical writing</h1>
      <p className="muted" style={{ maxWidth: 640, marginBottom: '2rem' }}>
        Lessons from building Kilele Archade, Apex and the experiments around them.
      </p>

      <div className="article-tags" style={{ marginBottom: '2.5rem' }}>
        {categories.map((c) => (
          <Link className="chip" key={c.slug} to={`/blog/${c.slug}`}>
            {c.name}
            <span style={{ opacity: 0.65 }}> · {posts.filter((p) => p.category === c.name).length}</span>
          </Link>
        ))}
      </div>

      <div className="timeline">
        {posts.map((p) => {
          const category = categoryForPost(p)
          return (
            <article className="card card--hover post-card" key={p.slug}>
              <div className="post-meta">
                <time dateTime={p.date}>{p.date}</time>
                {category ? (
                  <Link to={`/blog/${category.slug}`}>{p.category}</Link>
                ) : (
                  <span>{p.category}</span>
                )}
                <span>{p.readingMinutes} min read</span>
                <span>{p.author}</span>
              </div>
              <h3>
                <Link to={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              <p>{p.excerpt}</p>
            </article>
          )
        })}
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link to="/">← Back to home</Link>
      </p>
    </div>
  )
}
