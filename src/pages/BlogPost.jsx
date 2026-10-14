import { Link, useParams } from 'react-router-dom'
import { getPost, posts } from '../data/blog.js'
import { getProject } from '../data/projects.js'
import NotFound from './NotFound.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { profile, SITE_URL } from '../data/site.js'
import { getSeo } from '../seo/routes.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  usePageSeo(getSeo(`/blog/${slug}`))

  if (!post) return <NotFound />

  const shareUrl = encodeURIComponent(`${SITE_URL}/blog/${post.slug}`)
  const shareText = encodeURIComponent(`${post.title} — by ${profile.name}`)

  return (
    <div className="container" style={{ paddingBlock: 'clamp(2.5rem,6vw,4rem) 4rem' }}>
      <article className="article">
        <p className="section-kicker">
          <Link to="/blog">Blog</Link> / {post.category}
        </p>
        <h1 style={{ fontSize: 'clamp(1.7rem, 4.5vw, 2.4rem)' }}>{post.title}</h1>
        <div className="article-meta">
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.author}</span>
          <span>{post.readingMinutes} min read</span>
        </div>

        {post.body.map((sec) => (
          <section key={sec.h}>
            <h2>{sec.h}</h2>
            {sec.p.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </section>
        ))}

        <div className="article-tags">
          <span className="chip">{post.category}</span>
          {post.relatedProjects?.map((s) => {
            const p = getProject(s)
            return p ? (
              <Link className="chip chip--accent" key={s} to={`/projects/${s}`}>
                {p.name} case study →
              </Link>
            ) : null
          })}
          <a className="chip" href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`} rel="noopener noreferrer">
            Share on X
          </a>
          <a
            className="chip"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
            rel="noopener noreferrer"
          >
            Share on LinkedIn
          </a>
        </div>
      </article>

      {posts.length > 1 && (
        <aside style={{ marginTop: '3rem' }}>
          <h2 style={{ fontSize: '1.15rem' }}>More writing</h2>
          <div className="grid grid--2">
            {posts
              .filter((p) => p.slug !== post.slug)
              .map((p) => (
                <Link className="card card--hover post-card" key={p.slug} to={`/blog/${p.slug}`}>
                  <div className="post-meta">
                    <time dateTime={p.date}>{p.date}</time>
                    <span>{p.category}</span>
                  </div>
                  <h3>{p.title}</h3>
                </Link>
              ))}
          </div>
        </aside>
      )}
    </div>
  )
}
