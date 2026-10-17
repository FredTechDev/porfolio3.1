import { Link, useParams } from 'react-router-dom'
import { categories, getCategory, postsInCategory } from '../data/blog.js'
import { getProject } from '../data/projects.js'
import { getLabExperiment } from '../data/lab.js'
import { services, profile } from '../data/site.js'
import NotFound from './NotFound.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function BlogCategory() {
  const { slug } = useParams()
  const category = getCategory(slug)
  const inCategory = postsInCategory(slug)

  usePageSeo(getSeo(`/blog/${slug}`))

  if (!category) return <NotFound />

  const relatedProjects = category.relatedProjects.map(getProject).filter(Boolean)
  const relatedServices = services.filter((s) => category.relatedServices.includes(s.title))
  const relatedLab = category.relatedLab.map(getLabExperiment).filter(Boolean)
  const otherCategories = categories.filter((c) => c.slug !== slug)

  return (
    <div className="page-head container" style={{ paddingBottom: '4rem' }}>
      <p className="section-kicker">
        <Link to="/blog">Blog</Link> / {category.name}
      </p>
      <h1>{category.name}</h1>
      <p className="muted" style={{ maxWidth: 680, marginBottom: '1.5rem' }}>
        {category.summary}
      </p>

      {category.intro.map((para, i) => (
        <p key={i} style={{ maxWidth: 680 }}>
          {para}
        </p>
      ))}

      <h2 style={{ marginTop: '2.5rem', fontSize: '1.3rem' }}>
        Writing on {category.name.toLowerCase()} ({inCategory.length})
      </h2>
      <div className="timeline">
        {inCategory.map((p) => (
          <article className="card card--hover post-card" key={p.slug}>
            <div className="post-meta">
              <time dateTime={p.date}>{p.date}</time>
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

      {relatedProjects.length > 0 && (
        <>
          <h2 style={{ marginTop: '2.5rem', fontSize: '1.3rem' }}>Built in practice</h2>
          <div className="grid grid--2">
            {relatedProjects.map((p) => (
              <Link className="card card--hover" key={p.slug} to={`/projects/${p.slug}`}>
                <h3>{p.name}</h3>
                <p>{p.summary}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {relatedServices.length > 0 && (
        <>
          <h2 style={{ marginTop: '2.5rem', fontSize: '1.3rem' }}>Hire for this</h2>
          <div className="grid grid--2">
            {relatedServices.map((s) => (
              <Link className="card card--hover" key={s.title} to="/services">
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      {relatedLab.length > 0 && (
        <>
          <h2 style={{ marginTop: '2.5rem', fontSize: '1.3rem' }}>Experiments in the lab</h2>
          <div className="grid grid--2">
            {relatedLab.map((x) => (
              <Link className="card card--hover" key={x.slug} to={`/lab/${x.slug}`}>
                <h3>{x.name}</h3>
                <p>{x.description}</p>
              </Link>
            ))}
          </div>
        </>
      )}

      <h2 style={{ marginTop: '2.5rem', fontSize: '1.3rem' }}>Other topics</h2>
      <div className="article-tags">
        {otherCategories.map((c) => (
          <Link className="chip" key={c.slug} to={`/blog/${c.slug}`}>
            {c.name}
          </Link>
        ))}
      </div>

      <p style={{ marginTop: '2rem' }}>
        <Link to="/blog">← All writing</Link> · <Link to="/contact">Work with {profile.name}</Link>
      </p>
    </div>
  )
}
