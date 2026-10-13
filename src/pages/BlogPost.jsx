import { Link, useParams } from 'react-router-dom'
import { getPost, posts } from '../data/blog.js'
import { getProject } from '../data/projects.js'
import NotFound from './NotFound.jsx'
import { usePageSeo, buildBlogPostingSchema, buildFAQSchema } from '../components/usePageSeo.js'
import { profile, SITE_URL } from '../data/site.js'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  const blogSchema = post ? buildBlogPostingSchema(post) : undefined

  // FAQ schema for common questions about the blog topic
  const faqSchema = post
    ? buildFAQSchema([
        {
          question: `What is ${post.title} about?`,
          answer: post.excerpt,
        },
        {
          question: 'Who is the author?',
          answer: `${post.author} is a Full-Stack Developer, Backend Engineer & AI/ML Engineer based in Kenya.`,
        },
        {
          question: 'What technologies are covered?',
          answer: post.relatedProjects
            ? `This post covers ${post.category} and relates to ${post.relatedProjects.map((s) => getProject(s)?.name).filter(Boolean).join(', ')}.`
            : `This post covers ${post.category} and related software engineering topics.`,
        },
      ])
    : undefined

  usePageSeo({
    title: post ? `${post.title} — Fredrick Onyango` : 'Post not found',
    description: post ? post.excerpt : 'Post not found',
    path: `/blog/${slug}`,
    type: 'Article',
    extraSchema: {
      '@type': 'Article',
      headline: post?.title,
      datePublished: post?.date,
      dateModified: post?.date,
      author: { '@type': 'Person', name: post?.author, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: 'Fredrick Onyango',
        logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-cover.png` },
      },
      articleSection: post?.category,
      keywords: [post?.category, 'AI Engineering', 'Software Engineering', 'Kenya', 'RAG', 'System Architecture'].join(', '),
      wordCount: post?.body.reduce((acc, sec) => acc + sec.p.join(' ').split(' ').length, 0),
      timeRequired: post ? `PT${post.readingMinutes}M` : undefined,
      inLanguage: 'en-KE',
    },
    jsonLd: [blogSchema, faqSchema].filter(Boolean),
    lastmod: post?.date,
    ogImage: `${SITE_URL}/og-cover.png`,
  })

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
