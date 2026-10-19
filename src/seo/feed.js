import { SITE_URL, profile } from '../data/site.js'
import { posts } from '../data/blog.js'
import { urlFor } from './head.js'

const esc = (v) =>
  String(v)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')

const rfc822 = (date) => new Date(`${date}T00:00:00Z`).toUTCString()

// Full post body as HTML. Wrapped in CDATA so the markup reaches readers intact
// without individually escaping every tag.
function postHtml(post) {
  const url = urlFor(`/blog/${post.slug}`)
  const blocks = post.body.flatMap((sec) => [
    `<h2>${sec.h}</h2>`,
    ...sec.p.map((para) => `<p>${para}</p>`),
  ])
  const inner =
    `<p><em>${post.excerpt}</em></p>` +
    blocks.join('') +
    `<p>Read the full article at <a href="${url}">${url}</a>.</p>`
  return `<![CDATA[<p>Posted by ${profile.name} on <a href="${urlFor('/blog')}">${SITE_URL}</a>.</p>${inner}]]>`
}

/**
 * RSS 2.0 feed for the blog, written to dist/feed.xml by the prerender step.
 * A feed is a standard discovery signal: crawlers, AI assistants and reader
 * apps that follow it learn about new posts without waiting on the sitemap.
 */
export function buildRssFeed() {
  const siteLink = urlFor('/')
  const feedLink = `${SITE_URL}/feed.xml`
  const latest = posts.reduce((max, p) => (p.date > max ? p.date : max), posts[0]?.date ?? '')

  const items = posts
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .map((post) => {
      const link = urlFor(`/blog/${post.slug}`)
      const categories = [post.category, ...(post.topics || [])]
        .filter(Boolean)
        .map((c) => `      <category>${esc(c)}</category>`)
        .join('\n')
      return [
        '    <item>',
        `      <title>${esc(post.title)}</title>`,
        `      <link>${esc(link)}</link>`,
        `      <guid isPermaLink="true">${esc(link)}</guid>`,
        `      <pubDate>${rfc822(post.date)}</pubDate>`,
        `      <dc:creator>${esc(profile.name)}</dc:creator>`,
        `      <description>${esc(post.excerpt)}</description>`,
        categories,
        `      <content:encoded>${postHtml(post)}</content:encoded>`,
        '    </item>',
      ]
        .filter(Boolean)
        .join('\n')
    })
    .join('\n')

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0"',
    '      xmlns:atom="http://www.w3.org/2005/Atom"',
    '      xmlns:dc="http://purl.org/dc/elements/1.1/"',
    '      xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    '  <channel>',
    `    <title>${esc(`${profile.name} — Technical Blog`)}</title>`,
    `    <link>${esc(siteLink)}</link>`,
    `    <atom:link href="${esc(feedLink)}" rel="self" type="application/rss+xml" />`,
    '    <description>' +
      esc('Writing on AI engineering, RAG pipelines, PostgreSQL and pgvector, system architecture and shipping products from Kenya.') +
      '</description>',
    '    <language>en-KE</language>',
    `    <lastBuildDate>${rfc822(latest)}</lastBuildDate>`,
    `    <managingEditor>${esc(profile.email)} (${esc(profile.name)})</managingEditor>`,
    `    <webMaster>${esc(profile.email)} (${esc(profile.name)})</webMaster>`,
    items,
    '  </channel>',
    '</rss>',
    '',
  ].join('\n')
}
