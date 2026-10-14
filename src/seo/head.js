import { SITE_URL, profile } from '../data/site.js'

export const BRAND = 'Fredrick Onyango'
const OG_IMAGE = `${SITE_URL}/og-cover.png`

export function urlFor(path) {
  return path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`
}

export function attrValue(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
}

export function textValue(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

/**
 * The complete `<head>` payload for a page. `usePageSeo` applies these to the
 * live document and the prerender build writes them into static HTML, so both
 * views of a route are produced from the same data.
 */
export function buildHead(opts) {
  const {
    title,
    description,
    path,
    type = 'WebPage',
    extraSchema = {},
    ogImage,
    lastmod,
    noindex = false,
    nofollow = false,
    canonicalPath = path,
    metaRefresh,
    jsonLd,
  } = opts

  const url = urlFor(canonicalPath)
  const img = ogImage || OG_IMAGE

  const metas = [
    { name: 'description', content: description },
    { name: 'robots', content: `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}` },
    { name: 'author', content: profile.name },
    { name: 'geo.region', content: 'KE' },
    { name: 'geo.placename', content: 'Nairobi, Kenya' },
    { name: 'geo.position', content: '-1.2921;36.8219' },
    { name: 'ICBM', content: '-1.2921, 36.8219' },
    { property: 'og:type', content: type === 'Article' ? 'article' : 'website' },
    { property: 'og:site_name', content: BRAND },
    { property: 'og:title', content: title },
    { property: 'og:description', content: description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: img },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:image:alt', content: title },
    { property: 'og:locale', content: 'en_KE' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: description },
    { name: 'twitter:image', content: img },
    { name: 'twitter:image:alt', content: title },
    { name: 'twitter:site', content: '@FredTechDev' },
    { name: 'twitter:creator', content: '@FredTechDev' },
  ]

  if (type === 'Article' && lastmod) {
    metas.push(
      { property: 'article:published_time', content: lastmod },
      { property: 'article:modified_time', content: lastmod },
      { property: 'article:author', content: profile.name },
    )
  }

  return {
    title,
    ...(metaRefresh && { metaRefresh }),
    metas,
    links: [
      { rel: 'canonical', href: url },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com' },
      { rel: 'preconnect', href: 'https://res.cloudinary.com' },
    ],
    jsonLd: buildSchemas({ title, description, path, type, extraSchema, jsonLd }),
  }
}

function buildSchemas({ title, description, path, type, extraSchema, jsonLd }) {
  const schemas = [
    {
      '@context': 'https://schema.org',
      '@type': type,
      name: title,
      description,
      url: urlFor(path),
      isPartOf: { '@type': 'WebSite', name: `${BRAND} — Portfolio`, url: SITE_URL },
      author: { '@type': 'Person', name: profile.name, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: BRAND,
        logo: { '@type': 'ImageObject', url: OG_IMAGE },
      },
      inLanguage: 'en',
      ...extraSchema,
    },
    buildBreadcrumbs(path),
    buildOrganization(),
  ]

  if (jsonLd) schemas.push(...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]))
  return schemas
}

function buildBreadcrumbs(path) {
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL }]
  let currentPath = ''
  path
    .split('/')
    .filter(Boolean)
    .forEach((segment, i) => {
      currentPath += `/${segment}`
      items.push({
        '@type': 'ListItem',
        position: i + 2,
        name: segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        item: urlFor(currentPath),
      })
    })
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: BRAND,
    url: SITE_URL,
    logo: OG_IMAGE,
    sameAs: [profile.github, profile.linkedin],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      email: profile.email,
      availableLanguage: 'English',
      areaServed: 'KE',
    },
    address: { '@type': 'PostalAddress', addressCountry: 'KE', addressRegion: 'Nairobi' },
    founder: { '@type': 'Person', name: profile.name, url: SITE_URL },
  }
}

function metaTag({ name, property, content }) {
  const key = name ? `name="${attrValue(name)}"` : `property="${attrValue(property)}"`
  return `<meta ${key} content="${attrValue(content)}" />`
}

export function headToHtml({ title, metas, links, jsonLd, metaRefresh }) {
  return [
    `<title>${textValue(title)}</title>`,
    ...(metaRefresh ? [`<meta http-equiv="refresh" content="${attrValue(metaRefresh)}" />`] : []),
    ...metas.map(metaTag),
    ...links.map(({ rel, href }) => `<link rel="${attrValue(rel)}" href="${attrValue(href)}" />`),
    ...jsonLd.map((schema) => `<script type="application/ld+json">${JSON.stringify(schema)}</script>`),
  ].join('\n    ')
}
