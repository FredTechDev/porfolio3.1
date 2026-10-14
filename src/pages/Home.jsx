import Hero from '../sections/Hero.jsx'
import FeaturedProjects from '../sections/FeaturedProjects.jsx'
import BuildingProducts from '../sections/BuildingProducts.jsx'
import BlogPreview from '../sections/BlogPreview.jsx'
import GithubSection from '../sections/GithubSection.jsx'
import AskAI from '../components/AskAI.jsx'
import HomeContactCTA from '../components/HomeContactCTA.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { getSeo } from '../seo/routes.js'

export default function Home() {
  usePageSeo(getSeo('/'))

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <BuildingProducts />
      <BlogPreview />
      <GithubSection />
      <AskAI />
      <HomeContactCTA />
    </>
  )
}
