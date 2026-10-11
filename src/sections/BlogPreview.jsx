import { Link } from 'react-router-dom'
import { posts } from '../data/blog.js'
import SectionHeading from '../components/SectionHeading.jsx'

export default function BlogPreview() {
  return (
    <section className="section" id="blog" aria-labelledby="blog-title">
      <div className="container">
        <SectionHeading kicker="Blog" title="Technical writing">
          Notes from building the products above — AI engineering, databases and
          architecture decisions.
        </SectionHeading>

        <div className="grid grid--3">
          {posts.map((p) => (
            <article className="card card--hover post-card" key={p.slug}>
              <div className="post-meta">
                <time dateTime={p.date}>{p.date}</time>
                <span>{p.category}</span>
                <span>{p.readingMinutes} min read</span>
              </div>
              <h3>
                <Link to={`/blog/${p.slug}`}>{p.title}</Link>
              </h3>
              <p>{p.excerpt}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
