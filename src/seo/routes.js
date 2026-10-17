import { profile, SITE_URL, education, certifications, experiences, services } from '../data/site.js'
import { projects, getProject } from '../data/projects.js'
import { posts, getPost } from '../data/blog.js'
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
  wordCount,
  PERSON_ID,
  KILELE_ORG_ID,
  KILELE_URL,
  personRef,
} from './schemas.js'

const UPDATED = '2026-10-17'
const ogCover = `${SITE_URL}/og-cover.png`

const PORTRAIT = `${SITE_URL}/fredrick-onyango.jpg`

const personEntity = (extra = {}) => ({
  '@type': 'Person',
  '@id': PERSON_ID,
  name: profile.name,
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
    'Fredrick Onyango — Kenya-based Full-Stack Developer, Backend Engineer & AI/ML Engineer. Building intelligent, scalable products: Kilele Archade (AI EdTech), Apex (PropTech). Available for remote work globally.',
  path: '/',
  type: 'WebPage',
  lastmod: UPDATED,
  ogImage: ogCover,
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
    'Learn about Fredrick Onyango: background, engineering philosophy, full tech stack (React, TypeScript, Python, Java, PostgreSQL, AI/ML), and achievements as a software engineer building Kilele Archade and Apex.',
  path: '/about',
  type: 'ProfilePage',
  lastmod: UPDATED,
  ogImage: PORTRAIT,
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
    'Professional experience of Fredrick Onyango: Development work at Cine Creatives (full-stack), Founder & Lead at Apex (PropTech rental management), and Builder at Kilele Archade (AI EdTech platform). Full-stack, backend and AI/ML engineering experience.',
  path: '/experience',
  type: 'WebPage',
  lastmod: UPDATED,
  extraSchema: {
    '@type': 'ItemList',
    name: 'Professional Experience',
    itemListElement: experiences.map((exp, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      item: {
        '@type': exp.type === 'Employment' ? 'JobPosting' : 'Project',
        name: exp.role,
        hiringOrganization: { '@type': 'Organization', name: exp.org },
        datePosted: exp.period.split(' — ')[0],
        description: exp.points.join(' '),
        jobLocation: { '@type': 'Place', address: { '@type': 'PostalAddress', addressCountry: 'KE' } },
      },
    })),
  },
}

const aiEngineering = {
  title: 'AI & Engineering — Fredrick Onyango | RAG, LLM Integration & System Architecture',
  description:
    'How Fredrick Onyango approaches AI engineering: RAG pipelines, LLM integration patterns, pgvector retrieval, provider fallback architectures, and system design behind Kilele Archade and Apex. Deep technical dive into production AI systems.',
  path: '/ai-engineering',
  type: 'WebPage',
  lastmod: UPDATED,
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
    "Explore Fredrick Onyango's lab experiments: ESP32 IoT weather systems, RAG strategy benchmarks, AI provider fallback harnesses, computer vision attendance, and automation scripts. All with public GitHub repositories.",
  path: '/lab',
  type: 'CollectionPage',
  lastmod: UPDATED,
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
      datePublished: '2025-01-01',
    }),
  ),
}

const projectsPage = {
  title: 'Projects — Fredrick Onyango | Full-Stack, AI/ML & Backend Engineering Portfolio',
  description:
    "Explore Fredrick Onyango's software projects: Kilele Archade (AI EdTech), Apex (PropTech rental management), MediFlow (HealthTech), plus AI, data engineering and IoT experiments. Full case studies with architecture, stack and results.",
  path: '/projects',
  type: 'CollectionPage',
  lastmod: UPDATED,
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
    'Technical writing by Fredrick Onyango on AI engineering, RAG pipelines, PostgreSQL/pgvector, system architecture, and building production software. Lessons from building Kilele Archade and Apex.',
  path: '/blog',
  type: 'Blog',
  lastmod: posts[0]?.date ?? UPDATED,
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
    'Hire Fredrick Onyango for end-to-end software delivery: AI/ML and RAG systems, full-stack React products, backend APIs in Node.js and Spring Boot, PostgreSQL data design and cloud deployments. Kenya-based, available for remote work globally.',
  path: '/services',
  type: 'WebPage',
  lastmod: UPDATED,
  ogImage: PORTRAIT,
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
    'Contact Fredrick Onyango for full-stack development, backend engineering, AI/ML engineering, and system architecture projects. Available for remote work globally and Kenya-based opportunities. Email, GitHub, LinkedIn.',
  path: '/contact',
  type: 'ContactPage',
  lastmod: UPDATED,
  extraSchema: {
    '@type': 'ContactPage',
    name: 'Contact Fredrick Onyango',
    description:
      'Get in touch for software engineering, AI/ML, backend and full-stack projects',
    mainEntity: {
      '@type': 'Person',
      name: profile.name,
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
    description: `${project.summary} Problem, solution, architecture and results for ${project.name}. Built with ${project.stack.slice(0, 5).join(', ')}.`,
    path: `/projects/${project.slug}`,
    type: 'SoftwareApplication',
    lastmod: UPDATED,
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
          datePublished: '2025-01-01',
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
    ogImage: ogCover,
    extraSchema: {
      '@type': 'Article',
      headline: post.title,
      datePublished: post.date,
      dateModified: post.date,
      author: { '@type': 'Person', name: post.author, url: SITE_URL },
      publisher: {
        '@type': 'Organization',
        name: profile.name,
        logo: { '@type': 'ImageObject', url: ogCover },
      },
      articleSection: post.category,
      keywords: [
        post.category,
        'AI Engineering',
        'Software Engineering',
        'Kenya',
        'RAG',
        'System Architecture',
      ].join(', '),
      wordCount: wordCount(post),
      timeRequired: `PT${post.readingMinutes}M`,
      inLanguage: 'en-KE',
    },
    jsonLd: [buildBlogPostingSchema(post), postFaqs(post)],
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
    lastmod: UPDATED,
    extraSchema: {
      '@type': 'TechArticle',
      headline: exp.name,
      description: exp.description,
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
  if (post) return blogDetail(post[1])

  return notFound(path)
}

/** Every route that should exist as static HTML — the prerender contract. */
export function allSeoPaths() {
  return [
    ...indexables.map((o) => o.path),
    ...projects.filter((p) => p.featured).map((p) => `/projects/${p.slug}`),
    ...labExperiments.map((x) => `/lab/${x.slug}`),
    ...posts.map((p) => `/blog/${p.slug}`),
    ...redirectRoutes.map((s) => s.path),
  ]
}

/** Routes a crawler should be told about. */
export function sitemapPaths() {
  return [
    ...indexables.map((o) => ({ path: o.path, lastmod: o.lastmod, image: o.sitemapImage })),
    ...projects
      .filter((p) => p.featured)
      .map((p) => ({ path: `/projects/${p.slug}`, lastmod: UPDATED })),
    ...labExperiments.map((x) => ({ path: `/lab/${x.slug}`, lastmod: UPDATED })),
    ...posts.map((p) => ({ path: `/blog/${p.slug}`, lastmod: p.date })),
  ]
}
