import Hero from '../sections/Hero.jsx'
import FeaturedProjects from '../sections/FeaturedProjects.jsx'
import BuildingProducts from '../sections/BuildingProducts.jsx'
import BlogPreview from '../sections/BlogPreview.jsx'
import GithubSection from '../sections/GithubSection.jsx'
import HomeContactCTA from '../components/HomeContactCTA.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { SITE_URL, profile } from '../data/site.js'

export default function Home() {
  usePageSeo({
    title: `${profile.name} — Full-Stack Developer, Backend Engineer & AI/ML Engineer`,
    description:
      'Portfolio of Fredrick Onyango, a Kenya-based software engineer building intelligent, scalable products including Kilele Archade and Apex.',
    path: '/',
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Featured projects',
      itemListElement: [
        { '@type': 'ListItem', position: 1, url: `${SITE_URL}/projects/kilele-archade` },
        { '@type': 'ListItem', position: 2, url: `${SITE_URL}/projects/apex` },
      ],
    },
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
