import Contact from '../sections/Contact.jsx'
import Availability from '../components/Availability.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { profile, SITE_URL } from '../data/site.js'

export default function ContactPage() {
  usePageSeo({
    title: 'Contact — Fredrick Onyango | Hire Full-Stack, Backend & AI/ML Engineer (Kenya/Remote)',
    description:
      'Contact Fredrick Onyango for full-stack development, backend engineering, AI/ML engineering, and system architecture projects. Available for remote work globally and Kenya-based opportunities. Email, GitHub, LinkedIn.',
    path: '/contact',
    type: 'ContactPage',
    extraSchema: {
      '@type': 'ContactPage',
      name: 'Contact Fredrick Onyango',
      description: 'Get in touch for software engineering, AI/ML, backend and full-stack projects',
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
    lastmod: '2026-01-15',
  })

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Contact</p>
        <h1>Let's build something</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Project enquiries, collaborations or questions about anything on this site — every serious
          message gets a reply.
        </p>
        <Availability />
      </div>

      <Contact />

      <PageNav
        links={[
          { to: '/projects', hint: 'Before you write', label: 'Browse projects' },
          { to: '/about', hint: 'Or', label: 'About me' },
        ]}
      />
    </>
  )
}