import { profile, SITE_URL, education, certifications, experiences, services } from '../data/site.js'
import { projects, getProject } from '../data/projects.js'
import { posts, getPost, categories, getCategory, postsInCategory } from '../data/blog.js'
import { labExperiments, getLabExperiment } from '../data/lab.js'
import { SAME_AS } from './head.js'
import {
  buildBlogPostingSchema,
  buildProductSchema,
  buildSoftwareApplicationSchema,
  buildSoftwareSourceCodeSchema,
  buildKileleOrganizationSchema,
  postFaqs,
  repoLanguage,
  PERSON_ID,
  KILELE_ORG_ID,
  KILELE_URL,
  personRef,
} from './schemas.js'

// Per-route social cards, produced by scripts/og-images.mjs and committed as
// static assets so the deploy never has to rasterise anything.
const ogCard = (name) => `${SITE_URL}/og/${name}.png`

// fred1 is the site's profile picture: it is the Person.image entity and the
// home/about/services sitemap image, so search engines index it. 720w render.
const PORTRAIT = `${SITE_URL}/fred1-720w.jpg`
const LOGO = `${SITE_URL}/fred1-logo.jpg`

// Periods read "2025 — Present". A bare year is valid ISO 8601; inventing a
// month would put a precise-looking date in the graph that nobody has confirmed.
const yearOf = (period) => /^\s*(\d{4})\b/.exec(period ?? '')?.[1]

const occupations = experiences.map((exp) => ({
  '@type': 'EmploymentRole',
  roleName: exp.role,
  ...(yearOf(exp.period) && { startDate: yearOf(exp.period) }),
  worksFor: { '@type': 'Organization', name: exp.org },
  description: exp.points.join(' '),
}))

const personEntity = (extra = {}) => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
  alternateName: profile.nicknames,
  jobTitle: profile.role,
  url: SITE_URL,
  image: PORTRAIT,
  email: `mailto:${profile.email}`,
  address: { '@type': 'PostalAddress', addressCountry: 'KE', addressRegion: 'Nairobi' },
  knowsAbout: [
    'Software Engineering',
    'Full-Stack Development',
    'Backend Engineering',
    'AI/ML Engineering',
    'System Architecture',
    'Retrieval-Augmented Generation',
    'PostgreSQL',
    'Cloud Deployment',
    'React',
    'TypeScript',
    'Python',
    'Java',
    'Spring Boot',
  ],
  sameAs: SAME_AS,
  hasOccupation: occupations,
  worksFor: {
    '@type': 'Organization',
    '@id': KILELE_ORG_ID,
    name: 'Kilele Archade',
    url: KILELE_URL,
  },
  ...extra,
})

const home = {
  title: `${profile.name} — Full-Stack Developer, Backend Engineer & AI/ML Engineer | Kenya`,
  description:
    'Fredrick Onyango — Full-Stack, Backend & AI/ML Engineer in Nairobi. I build AI-powered products end to end: Kilele Archade (EdTech) and Apex (PropTech).',
  path: '/',
  type: 'WebPage',
  ogImage: ogCard('home'),
  sitemapImage: {
    url: PORTRAIT,
    caption: 'Fredrick Onyango — Full-Stack Developer, Backend Engineer and AI/ML Engineer based in Nairobi, Kenya',
  },
  extraSchema: { '@type': 'ProfilePage', mainEntity: personEntity() },
  jsonLd: [buildKileleOrganizationSchema()],
}

const about = {
  title: 'About — Fredrick Onyango | Full-Stack, Backend & AI/ML Engineer from Kenya',
  description:
    'Who I am and how I work: engineering philosophy, full stack (React, TypeScript, Python, Java, PostgreSQL, AI/ML) and the products I have shipped from Nairobi.',
  path: '/about',
  type: 'ProfilePage',
  ogImage: ogCard('about'),
  sitemapImage: {
    url: PORTRAIT,
    caption: 'Fredrick Onyango — Full-Stack Developer, Backend Engineer and AI/ML Engineer from Nairobi, Kenya',
  },
  extraSchema: {
    '@type': 'ProfilePage',
    mainEntity: personEntity({
      alumniOf: { '@type': 'EducationalOrganization', name: education.school },
      ...(certifications.length > 0 && {
        hasCredential: certifications.map((c) => ({
          '@type': 'EducationalOccupationalCredential',
          name: c.name,
          credentialCategory: 'certification',
          recognizedBy: { '@type': 'Organization', name: c.issuer },
          url: c.url,
        })),
      }),
    }),
  },
}

const experience = {
  title: 'Experience — Fredrick Onyango | Cine Creatives, Apex & Kilele Archade',
  description:
    'Developer at Cine Creatives, Founder of Apex (PropTech) and Builder of Kilele Archade (AI EdTech). Full-stack, backend and AI/ML engineering work since 2025.',
  path: '/experience',
  type: 'WebPage',
  ogImage: ogCard('experience'),
  extraSchema: {
    '@type': 'ItemList',
    name: 'Professional Experience',
    itemListElement: occupations.map((role, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        ...role,
        organization: role.worksFor,
        location: {
          '@type': 'Place',
          address: { '@type': 'PostalAddress', addressCountry: 'KE' },
        },
      },
    })),
  },
}

const aiEngineering = {
  title: 'AI & Engineering — Fredrick Onyango | RAG, LLM Integration & System Architecture',
  description:
    'How I build production AI: RAG pipelines, pgvector retrieval, LLM integration and provider fallback, plus the system design behind Kilele Archade and Apex.',
  path: '/ai-engineering',
  type: 'WebPage',
  ogImage: ogCard('ai-engineering'),
  extraSchema: {
    '@type': 'TechArticle',
    headline: 'AI & Engineering — System Architecture & RAG Pipelines',
    description:
      'Technical deep-dive into AI engineering practices: RAG, LLM integration, vector search, system architecture',
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
    publisher: { '@type': 'Organization', name: profile.name, url: SITE_URL },
    articleSection: 'AI Engineering',
    keywords:
      'RAG, Retrieval-Augmented Generation, LLM, AI Engineering, pgvector, Vector Search, System Architecture, Machine Learning, Kenya',
    learningResourceType: 'Technical Guide',
    audience: { '@type': 'Audience', audienceType: 'Software Engineers, AI Engineers, CTOs' },
  },
}

const lab = {
  title: 'Lab — Fredrick Onyango | AI, IoT & Engineering Experiments with Source Code',
  description:
    'Hands-on experiments with public source code: ESP32 IoT weather station, RAG strategy benchmarks, AI provider fallback harness, computer vision attendance.',
  path: '/lab',
  type: 'CollectionPage',
  ogImage: ogCard('lab'),
  extraSchema: {
    '@type': 'ItemList',
    name: 'Engineering Lab Experiments',
    description:
      'Collection of AI, IoT, data engineering and automation experiments by Fredrick Onyango',
    itemListElement: labExperiments.map((exp, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: exp.repo,
      name: exp.name,
    })),
  },
  jsonLd: labExperiments.map((exp) =>
    buildSoftwareSourceCodeSchema({
      name: exp.name,
      description: exp.description,
      repoUrl: exp.repo,
      language: repoLanguage(exp.stack),
      datePublished: exp.date,
    }),
  ),
}

const projectsPage = {
  title: 'Projects — Fredrick Onyango | Full-Stack, AI/ML & Backend Engineering Portfolio',
  description:
    'Case studies with architecture, stack and results: Kilele Archade (AI EdTech), Apex (PropTech SaaS) and MediFlow (HealthTech), each built end to end.',
  path: '/projects',
  type: 'CollectionPage',
  ogImage: ogCard('projects'),
  extraSchema: {
    '@type': 'ItemList',
    name: 'Software Projects Portfolio',
    description:
      'Collection of full-stack, AI/ML, backend and IoT projects by Fredrick Onyango',
    itemListElement: projects
      .filter((p) => p.featured)
      .map((project, i) => {
        const { '@context': _standaloneOnly, ...product } = buildProductSchema(project)
        return {
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/projects/${project.slug}`,
          item: product,
        }
      }),
  },
}

const blogPage = {
  title: 'Blog — Fredrick Onyango | AI Engineering, System Architecture & Software Development',
  description:
    'Technical writing on AI engineering, RAG pipelines, PostgreSQL and pgvector, system architecture and product engineering — from building real platforms in Kenya.',
  path: '/blog',
  type: 'Blog',
  ogImage: ogCard('blog'),
  lastmod: posts[0]?.date,
  extraSchema: {
    '@type': 'Blog',
    name: `${profile.name} — Technical Blog`,
    description:
      'Technical writing on AI engineering, RAG, system architecture and building production software',
    author: { '@type': 'Person', name: profile.name, url: SITE_URL },
    blogPost: posts.map((p) => ({
      '@type': 'BlogPosting',
      headline: p.title,
      url: `${SITE_URL}/blog/${p.slug}`,
      datePublished: p.date,
      author: { '@type': 'Person', name: p.author },
    })),
  },
}

const servicesPage = {
  title: 'Services — Hire Fredrick Onyango | Full-Stack, Backend & AI/ML Developer (Kenya / Remote)',
  description:
    'Hire Fredrick Onyango for end-to-end delivery: AI and RAG systems, React products, Node.js and Spring Boot APIs, PostgreSQL design, cloud deployment. Remote worldwide.',
  path: '/services',
  type: 'WebPage',
  ogImage: ogCard('services'),
  sitemapImage: {
    url: PORTRAIT,
    caption:
      'Fredrick Onyango — Full-Stack, Backend and AI/ML Developer available for hire in Kenya and remotely',
  },
  extraSchema: {
    '@type': 'ItemList',
    name: 'Engineering Services',
    itemListElement: services.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': 'Service',
        name: s.title,
        serviceType: s.type,
        description: s.body,
        image: ogCard('services'),
        provider: personRef,
        areaServed: [
          { '@type': 'Country', name: 'Kenya' },
          { '@type': 'Place', name: 'Worldwide (remote)' },
        ],
        url: `${SITE_URL}/services`,
      },
    })),
  },
}

const contact = {
  title: 'Contact — Fredrick Onyango | Hire Full-Stack, Backend & AI/ML Engineer (Kenya/Remote)',
  description:
    'Contact Fredrick Onyango for full-stack, backend, AI/ML and architecture work. Email, WhatsApp, GitHub or LinkedIn — Nairobi-based, remote worldwide.',
  path: '/contact',
  type: 'ContactPage',
  ogImage: ogCard('contact'),
  extraSchema: {
    '@type': 'ContactPage',
    name: 'Contact Fredrick Onyango',
    description:
      'Get in touch for software engineering, AI/ML, backend and full-stack projects',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
      alternateName: profile.nicknames,
      email: `mailto:${profile.email}`,
      url: SITE_URL,
      sameAs: [profile.github, profile.linkedin],
      address: { '@type': 'PostalAddress', addressCountry: 'KE', addressRegion: 'Nairobi' },
      availableLanguage: 'English',
      jobTitle: profile.role,
    },
  },
}

function projectDetail(slug) {
  const project = getProject(slug)
  if (!project) return notFound(`/projects/${slug}`)

  return {
    title: `${project.name} — Case Study | ${profile.name}`,
    description: project.summary,
    path: `/projects/${project.slug}`,
    type: 'SoftwareApplication',
    ogImage: ogCard(`project-${project.slug}`),
    extraSchema: buildSoftwareApplicationSchema(project),
    jsonLd: [
      buildProductSchema(project),
      project.slug === 'kilele-archade' && buildKileleOrganizationSchema(),
      project.repo &&
        buildSoftwareSourceCodeSchema({
          name: `${project.name} Source Code`,
          description: project.summary,
          repoUrl: project.repo,
          language: repoLanguage(project.stack),
        }),
    ].filter(Boolean),
  }
}

function blogDetail(slug) {
  const post = getPost(slug)
  if (!post) return notFound(`/blog/${slug}`)

  return {
    title: `${post.title} — ${profile.name}`,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: 'Article',
    lastmod: post.date,
    ogImage: ogCard(`blog-${post.slug}`),
    // The page node stays a WebPage; buildBlogPostingSchema below is the
    // Article entity. Emitting both as articles described one URL twice.
    extraSchema: { '@type': 'WebPage' },
    jsonLd: [buildBlogPostingSchema(post), postFaqs(post)],
  }
}

function categoryPage(slug) {
  const category = getCategory(slug)
  if (!category) return notFound(`/blog/${slug}`)

  const inCategory = postsInCategory(slug)

  return {
    title: `${category.name} — Writing | ${profile.name}`,
    description: `${category.summary}`,
    path: `/blog/${category.slug}`,
    type: 'CollectionPage',
    lastmod: inCategory[0]?.date,
    ogImage: ogCard(`blog-category-${category.slug}`),
    extraSchema: {
      '@type': 'CollectionPage',
      name: `${category.name} writing`,
      description: category.summary,
      isPartOf: { '@type': 'WebSite', url: `${SITE_URL}/blog` },
      mainEntity: {
        '@type': 'ItemList',
        name: `${category.name} articles`,
        numberOfItems: inCategory.length,
        itemListElement: inCategory.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE_URL}/blog/${p.slug}`,
          item: {
            '@type': 'BlogPosting',
            headline: p.title,
            datePublished: p.date,
            author: personRef,
          },
        })),
      },
    },
  }
}

function labDetail(slug) {
  const exp = getLabExperiment(slug)
  if (!exp) return notFound(`/lab/${slug}`)

  return {
    title: `${exp.name} — Lab Experiment | ${profile.name}`,
    description: exp.description,
    path: `/lab/${exp.slug}`,
    type: 'WebPage',
    lastmod: exp.date,
    ogImage: ogCard(`lab-${exp.slug}`),
    extraSchema: {
      '@type': 'TechArticle',
      headline: exp.name,
      description: exp.description,
      image: ogCard(`lab-${exp.slug}`),
      author: personRef,
      datePublished: exp.date,
      keywords: [...exp.stack, 'IoT', 'AI Engineering', 'Kenya'].join(', '),
      inLanguage: 'en-KE',
    },
    jsonLd: buildSoftwareSourceCodeSchema({
      name: exp.name,
      description: exp.description,
      repoUrl: exp.repo,
      language: repoLanguage(exp.stack),
      datePublished: exp.date,
    }),
  }
}

/**
 * Clean redirect routes. They exist so links can be shared as short aliases;
 * they are never indexable and carry no canonical of their own beyond the
 * target, so they cannot inherit another page's metadata.
 */
export const redirectRoutes = [
  { path: '/github', to: profile.github, label: 'GitHub' },
  { path: '/linkedin', to: profile.linkedin, label: 'LinkedIn' },
  { path: '/email', to: `mailto:${profile.email}`, label: 'email' },
  { path: '/cv', to: profile.cvPath, label: 'CV (PDF)' },
  { path: '/kilelearchade', to: 'https://kilelearchade.co.ke', label: 'Kilele Archade' },
  { path: '/apex', to: '/projects/apex', label: 'Apex', internal: true },
]

function redirectStub(stub) {
  return {
    title: `Redirecting to ${stub.label} — ${profile.name}`,
    description: `Shortcut from ${profile.name}'s portfolio to ${stub.label}.`,
    path: stub.path,
    type: 'WebPage',
    noindex: true,
    nofollow: true,
    canonicalPath: stub.internal ? stub.to : stub.path,
    metaRefresh: stub.to.startsWith('mailto:') ? undefined : `0;url=${stub.to}`,
  }
}

function notFound(path = '/') {
  return {
    title: `Page not found — ${profile.name}`,
    description:
      'That page does not exist. Browse projects, writing and lab experiments by Fredrick Onyango instead.',
    path,
    type: 'WebPage',
    noindex: true,
  }
}

const indexables = [home, projectsPage, about, servicesPage, experience, aiEngineering, lab, contact, blogPage]

export function getSeo(pathname) {
  const path = pathname.replace(/\/+$/, '') || '/'
  const staticMatch = indexables.find((o) => o.path === path)
  if (staticMatch) return staticMatch

  const stub = redirectRoutes.find((s) => s.path === path)
  if (stub) return redirectStub(stub)

  const project = /^\/projects\/([^/]+)$/.exec(path)
  if (project) return projectDetail(project[1])

  const labExperiment = /^\/lab\/([^/]+)$/.exec(path)
  if (labExperiment) return labDetail(labExperiment[1])

  const post = /^\/blog\/([^/]+)$/.exec(path)
  if (post) {
    // Category slugs live at the same depth as posts, so the hub wins first.
    if (getCategory(post[1])) return categoryPage(post[1])
    return blogDetail(post[1])
  }

  return notFound(path)
}

/** Every route that should exist as static HTML — the prerender contract. */
export function allSeoPaths() {
  return [
    ...indexables.map((o) => o.path),
    ...projects.filter((p) => p.featured).map((p) => `/projects/${p.slug}`),
    ...labExperiments.map((x) => `/lab/${x.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
    ...categories.map((c) => `/blog/${c.slug}`),
    ...redirectRoutes.map((s) => s.path),
  ]
}

/** Routes a crawler should be told about. */
export function sitemapPaths() {
  return [
    ...indexables.map((o) => ({ path: o.path, lastmod: o.lastmod, image: o.sitemapImage })),
    ...projects
      .filter((p) => p.featured)
      .map((p) => ({
        path: `/projects/${p.slug}`,
        image: { url: ogCard(`project-${p.slug}`), caption: `${p.name} — case study by ${profile.name}` },
      })),
    ...labExperiments.map((x) => ({
      path: `/lab/${x.slug}`,
      lastmod: x.date,
      image: { url: ogCard(`lab-${x.slug}`), caption: `${x.name} — lab experiment by ${profile.name}` },
    })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      lastmod: p.date,
      image: { url: ogCard(`blog-${p.slug}`), caption: `${p.title} — article by ${profile.name}` },
    })),
    ...categories.map((c) => ({
      path: `/blog/${c.slug}`,
      lastmod: postsInCategory(c.slug)[0]?.date,
      image: { url: ogCard(`blog-category-${c.slug}`), caption: `${c.name} writing by ${profile.name}` },
    })),
  ]
}
