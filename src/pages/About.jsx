import About from '../sections/About.jsx'
import Education from '../sections/Education.jsx'
import TechStack from '../sections/TechStack.jsx'
import Achievements from '../sections/Achievements.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { profile, education, certifications, SITE_URL } from '../data/site.js'

export default function AboutPage() {
  usePageSeo({
    title: 'About — Fredrick Onyango | Full-Stack, Backend & AI/ML Engineer from Kenya',
    description:
      'Learn about Fredrick Onyango: background, engineering philosophy, full tech stack (React, TypeScript, Python, Java, PostgreSQL, AI/ML), and achievements as a software engineer building Kilele Archade and Apex.',
    path: '/about',
    type: 'ProfilePage',
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
        alumniOf: {
          '@type': 'EducationalOrganization',
          name: education.school,
        },
        ...(certifications.length > 0 && {
          hasCredential: certifications.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c.name,
            credentialCategory: 'certification',
            recognizedBy: { '@type': 'Organization', name: c.issuer },
            url: c.url,
          })),
        }),
      },
    },
    lastmod: '2026-01-15',
  })

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">About</p>
        <h1>The engineer behind the products</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Background, working philosophy, the tools I use daily and what I have shipped so far.
        </p>
      </div>

      <About />
      <Education />
      <TechStack />
      <Achievements />

      <PageNav
        links={[
          { to: '/experience', hint: 'Next', label: 'Experience' },
          { to: '/projects', hint: 'See also', label: 'Projects' },
        ]}
      />
    </>
  )
}
