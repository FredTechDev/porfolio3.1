import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import AboutPage from './pages/About.jsx'
import ExperiencePage from './pages/Experience.jsx'
import AiEngineeringPage from './pages/AiEngineering.jsx'
import LabPage from './pages/Lab.jsx'
import ContactPage from './pages/Contact.jsx'
import Projects from './pages/Projects.jsx'
import ProjectDetail from './pages/ProjectDetail.jsx'
import Blog from './pages/Blog.jsx'
import BlogPost from './pages/BlogPost.jsx'
import ExternalRedirect from './pages/ExternalRedirect.jsx'
import NotFound from './pages/NotFound.jsx'
import { profile } from './data/site.js'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="experience" element={<ExperiencePage />} />
        <Route path="ai-engineering" element={<AiEngineeringPage />} />
        <Route path="lab" element={<LabPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="projects" element={<Projects />} />
        <Route path="projects/:slug" element={<ProjectDetail />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/:slug" element={<BlogPost />} />

        {/* clean redirect routes (spec §25) — never point at private infrastructure */}
        <Route path="github" element={<ExternalRedirect to={profile.github} />} />
        <Route path="linkedin" element={<ExternalRedirect to={profile.linkedin} />} />
        <Route path="email" element={<ExternalRedirect to={`mailto:${profile.email}`} />} />
        <Route path="cv" element={<ExternalRedirect to={profile.cvPath} />} />
        <Route path="kilelearchade" element={<ExternalRedirect to="https://kilelearchade.co.ke" />} />
        <Route path="apex" element={<ExternalRedirect to="/projects/apex" internal />} />

        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}
