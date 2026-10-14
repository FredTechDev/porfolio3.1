import { SITE_URL, profile } from '../data/site.js'

const CODE_LANGUAGES = ['TypeScript', 'JavaScript', 'Python', 'Java', 'Go', 'C++', 'C']
const publicLive = (live) => live && !live.includes('example.com')

export function buildProductSchema(project) {
  const offers = publicLive(project.live)
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
    brand: { '@type': 'Brand', name: profile.name },
    author: { '@type': 'Person', name: profile.name },
    ...(offers && { offers }),
    category: project.tags.join(', '),
    keywords: project.stack.join(', '),
  }
}

export function buildSoftwareApplicationSchema(project) {
  return {
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.summary,
    applicationCategory: 'DeveloperApplication',
    operatingSystem: 'Cloud, Web, Cross-platform',
    ...(publicLive(project.live) && { url: project.live }),
    author: { '@type': 'Person', name: profile.name },
    ...(publicLive(project.live) && {
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'KES',
        availability: 'https://schema.org/InStock',
        url: project.live,
      },
    }),
    featureList: project.caseStudy?.features || [],
    softwareVersion: '1.0',
    datePublished: '2025-01-01',
    keywords: project.stack.join(', '),
  }
}

export function buildSoftwareSourceCodeSchema({ name, description, repoUrl, language, datePublished }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareSourceCode',
    name,
    description,
    codeRepository: repoUrl,
    programmingLanguage: language,
    datePublished,
    author: { '@type': 'Person', name: profile.name },
    dependsOn: 'GitHub',
  }
}

export function repoLanguage(stack) {
  return stack.find((s) => CODE_LANGUAGES.includes(s)) || 'TypeScript'
}

export function buildBlogPostingSchema(post) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.date,
    author: { '@type': 'Person', name: post.author, url: SITE_URL },
    publisher: {
      '@type': 'Organization',
      name: profile.name,
      logo: { '@type': 'ImageObject', url: `${SITE_URL}/og-cover.png` },
    },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE_URL}/blog/${post.slug}` },
    articleSection: post.category,
    keywords: [post.category, 'AI Engineering', 'Software Engineering', 'Kenya'].join(', '),
    wordCount: wordCount(post),
    timeRequired: `PT${post.readingMinutes}M`,
    inLanguage: 'en-KE',
  }
}

export function wordCount(post) {
  return post.body.reduce((acc, sec) => acc + sec.p.join(' ').split(' ').length, 0)
}

export function buildFAQSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  }
}

export function postFaqs(post) {
  return buildFAQSchema([
    { question: `What is ${post.title} about?`, answer: post.excerpt },
    {
      question: 'Who is the author?',
      answer: `${post.author} is a Full-Stack Developer, Backend Engineer & AI/ML Engineer based in Kenya.`,
    },
    {
      question: 'What technologies are covered?',
      answer: post.relatedProjects?.length
        ? `This post covers ${post.category} and relates to products on this site built with that stack.`
        : `This post covers ${post.category} and related software engineering topics.`,
    },
  ])
}
