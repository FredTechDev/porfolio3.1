import Experience from '../sections/Experience.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'
import { experiences } from '../data/site.js'

export default function ExperiencePage() {
  usePageSeo({
    title: 'Experience — Fredrick Onyango | Cine Creatives, Apex & Kilele Archade',
    description:
      'Professional experience of Fredrick Onyango: Development work at Cine Creatives (full-stack), Founder & Lead at Apex (PropTech rental management), and Builder at Kilele Archade (AI EdTech platform). Full-stack, backend and AI/ML engineering experience.',
    path: '/experience',
    type: 'WebPage',
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
    lastmod: '2026-01-15',
  })

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Experience</p>
        <h1>Where I have worked and built</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Employment and self-driven product work — both are engineering experience.
        </p>
      </div>

      <Experience />

      <PageNav
        links={[
          { to: '/projects', hint: 'Next', label: 'Projects' },
          { to: '/contact', hint: 'Or', label: 'Get in touch' },
        ]}
      />
    </>
  )
}
