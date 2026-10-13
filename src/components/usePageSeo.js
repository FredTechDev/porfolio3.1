import { useEffect } from 'react'
import { SITE_URL, profile } from '../data/site.js'

function setMeta(attr, name, content) {
  let el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

function removeMeta(attr, name) {
  const el = document.head.querySelector(`meta[${attr}="${name}"]`)
  if (el) el.remove()
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.rel = rel
    document.head.appendChild(el)
  }
  el.href = href
}

function removeLink(rel) {
  const el = document.head.querySelector(`link[rel="${rel}"]`)
  if (el) el.remove()
}

/**
 * Build comprehensive structured data for the page
 */
function buildStructuredData({ title, description, path, type = 'WebPage', extra = {} }) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const base = {
    '@context': 'https://schema.org',
    '@type': type,
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: 'Fredrick Onyango — Portfolio',
      url: SITE_URL,
    },
    author: {
      '@type': 'Person',
      name: profile.name,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fredrick Onyango',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-cover.png`,
      },
    },
    inLanguage: 'en',
    ...extra,
  }
  return base
}

/**
 * Build BreadcrumbList structured data
 */
function buildBreadcrumbs(path) {
  const segments = path.split('/').filter(Boolean)
  const items = [
    { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
  ]
  let currentPath = ''
  segments.forEach((seg, i) => {
    currentPath += `/${seg}`
    const label = seg
      .replace(/-/g, ' ')
      .replace(/\b\w/g, (c) => c.toUpperCase())
    items.push({
      '@type': 'ListItem',
      position: i + 2,
      name: label,
      item: `${SITE_URL}${currentPath}`,
    })
  })
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  }
}

/**
 * Build Organization structured data
 */
function buildOrganization() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Fredrick Onyango',
    url: SITE_URL,
    logo: `${SITE_URL}/og-cover.png`,
    sameAs: [
      profile.github,
      profile.linkedin,
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '',
      contactType: 'customer service',
      email: profile.email,
      availableLanguage: 'English',
      areaServed: 'KE',
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'KE',
      addressRegion: 'Nairobi',
    },
    founder: {
      '@type': 'Person',
      name: profile.name,
      url: SITE_URL,
    },
  }
}

/**
 * Per-page SEO: unique title, description, canonical, Open Graph, Twitter,
 * geo tags, and comprehensive structured data (WebPage, BreadcrumbList, Organization).
 *
 * @param {Object} options
 * @param {string} options.title - Page title
 * @param {string} options.description - Page description
 * @param {string} options.path - Route path (e.g. "/projects/apex")
 * @param {Object} [options.jsonLd] - Additional custom JSON-LD (merged with base schemas)
 * @param {string} [options.type='WebPage'] - Schema.org type (WebPage, Article, Product, etc.)
 * @param {Object} [options.extraSchema] - Extra properties to merge into the WebPage schema
 * @param {Array<Object>} [options.breadcrumbs] - Custom breadcrumb items (auto-generated if omitted)
 * @param {string} [options.ogImage] - Custom OG image URL
 * @param {string} [options.lastmod] - ISO date for lastmod (sitemap)
 * @param {boolean} [options.noindex] - Add noindex robots meta
 * @param {boolean} [options.nofollow] - Add nofollow robots meta
 */
export function usePageSeo({
  title,
  description,
  path = '/',
  jsonLd,
  type = 'WebPage',
  extraSchema = {},
  breadcrumbs,
  ogImage,
  lastmod,
  noindex = false,
  nofollow = false,
}) {
  const url = `${SITE_URL}${path === '/' ? '/' : path}`
  const ogImg = ogImage || `${SITE_URL}/og-cover.png`
  const robotsContent = `${noindex ? 'noindex' : 'index'}, ${nofollow ? 'nofollow' : 'follow'}`

  useEffect(() => {
    // --- Basic Meta ---
    document.title = title
    setMeta('name', 'description', description)
    setMeta('name', 'robots', robotsContent)

    // --- Geo / Local (Kenya focus) ---
    setMeta('name', 'geo.region', 'KE')
    setMeta('name', 'geo.placename', 'Nairobi, Kenya')
    setMeta('name', 'geo.position', '-1.2921;36.8219') // Nairobi coordinates
    setMeta('name', 'ICBM', '-1.2921, 36.8219')

    // --- Canonical ---
    setLink('canonical', url)

    // --- Open Graph ---
    setMeta('property', 'og:type', type === 'Article' ? 'article' : 'website')
    setMeta('property', 'og:site_name', 'Fredrick Onyango')
    setMeta('property', 'og:title', title)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', url)
    setMeta('property', 'og:image', ogImg)
    setMeta('property', 'og:image:width', '1200')
    setMeta('property', 'og:image:height', '630')
    setMeta('property', 'og:image:alt', title)
    setMeta('property', 'og:locale', 'en_KE')
    if (type === 'Article' && lastmod) {
      setMeta('property', 'article:published_time', lastmod)
      setMeta('property', 'article:modified_time', lastmod)
      setMeta('property', 'article:author', profile.name)
    }

    // --- Twitter ---
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:site', '@FredTechDev')
    setMeta('name', 'twitter:creator', '@FredTechDev')
    setMeta('name', 'twitter:title', title)
    setMeta('name', 'twitter:description', description)
    setMeta('name', 'twitter:image', ogImg)
    setMeta('name', 'twitter:image:alt', title)

    // --- Preconnect hints for performance ---
    setLink('preconnect', 'https://fonts.googleapis.com')
    setLink('preconnect', 'https://fonts.gstatic.com')
    setLink('preconnect', 'https://res.cloudinary.com')
    setLink('dns-prefetch', 'https://www.google-analytics.com')

    // --- Structured Data: WebPage (or custom type) + BreadcrumbList + Organization ---
    const pageSchema = buildStructuredData({
      title,
      description,
      path,
      type,
      extra: extraSchema,
    })
    const breadcrumbSchema = buildBreadcrumbs(breadcrumbs ? breadcrumbs.join('/') : path)
    const orgSchema = buildOrganization()

    const allSchemas = [pageSchema, breadcrumbSchema, orgSchema]
    if (jsonLd) allSchemas.push(jsonLd)

    const ldKey = JSON.stringify(allSchemas)

    let ld = document.head.querySelector('script[data-page-jsonld]')
    if (!ld) {
      ld = document.createElement('script')
      ld.type = 'application/ld+json'
      ld.dataset.pageJsonld = 'true'
      document.head.appendChild(ld)
    }
    ld.textContent = JSON.stringify(allSchemas)

    return () => {
      if (ld) ld.remove()
    }
  }, [title, description, path, jsonLd, type, extraSchema, breadcrumbs, ogImage, lastmod, noindex, nofollow, robotsContent, ogImg, url])
}

/**
 * Helper: Product schema for featured products (Kilele, Apex)
 */
export function buildProductSchema(project) {
  const offers = project.live && !project.live.includes('example.com')
    ? {
        '@type': 'Offer',
        url: project.live,
        price: '0',
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
      }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.name,
    description: project.summary,
    url: `${SITE_URL}/projects/${project.slug}`,
    brand: {
      '@type': 'Brand',
      name: 'Fredrick Onyango',
    },
    author: {
      '@type': 'Person',
      name: profile.name,
    },
    ...(offers && { offers }),
    category: project.tags.join(', '),
    keywords: project.stack.join(', '),
  }
}

/**
 * Helper: SoftwareSourceCode schema for GitHub repos
 */
export function buildSoftwareSourceCodeSchema({ name, description, repoUrl, language, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    codeRepository: repoUrl,
    programmingLanguage: language,
    datePublished,
    author: {
      '@type': 'Person',
      name: profile.name,
    },
  }
}

/**
 * Helper: BlogPosting schema (enhanced Article)
 */
export function buildBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: SITE_URL,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Fredrick Onyango',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-cover.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    articleSection: post.category,
    keywords: [post.category, 'AI Engineering', 'Software Engineering', 'Kenya'].join(', '),
    wordCount: post.body.reduce((acc, sec) => acc + sec.p.join(' ').split(' ').length, 0),
    timeRequired: `PT${post.readingMinutes}M`,
    inLanguage: 'en-KE',
  }
}

/**
 * Helper: Course schema for educational content
 */
export function buildCourseSchema({ name, description, provider, url, hasCourseInstance }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name,
    description,
    provider: {
      '@type': 'Organization',
      name: provider,
      url: SITE_URL,
    },
    url,
    hasCourseInstance: hasCourseInstance || {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT20H',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
      },
    },
  }
}

/**
 * Helper: FAQPage schema
 */
export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  }
}
