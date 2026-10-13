import Hero from '../sections/Hero.jsx'
import FeaturedProjects from '../sections/FeaturedProjects.jsx'
import BuildingProducts from '../sections/BuildingProducts.jsx'
import BlogPreview from '../sections/BlogPreview.jsx'
import GithubSection from '../sections/GithubSection.jsx'
import HomeContactCTA from '../components/HomeContactCTA.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { profile, SITE_URL } from '../data/site.js'

export default function Home() {
  usePageSeo({
    title: `${profile.name} — Full-Stack Developer, Backend Engineer & AI/ML Engineer | Kenya`,
    description:
      'Fredrick Onyango — Kenya-based Full-Stack Developer, Backend Engineer & AI/ML Engineer. Building intelligent, scalable products: Kilele Archade (AI EdTech), Apex (PropTech). Available for remote work globally.',
    path: '/',
    type: 'WebPage',
    extraSchema: {
      '@type': 'ProfilePage',
      mainEntity: {
        '@type': 'Person',
        name: profile.name,
        jobTitle: profile.role,
        url: SITE_URL,
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
        sameAs: [profile.github, profile.linkedin],
        worksFor: {
          '@type': 'Organization',
          name: 'Fredrick Onyango',
        },
      },
    },
    lastmod: '2026-01-15',
    ogImage: `${SITE_URL}/og-cover.png`,
  })

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <BuildingProducts />
      <BlogPreview />
      <GithubSection />
      <HomeContactCTA />
    </>
  )
}
