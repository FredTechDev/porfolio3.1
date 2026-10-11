import Contact from '../sections/Contact.jsx'
import PageNav from '../components/PageNav.jsx'
import { usePageSeo } from '../components/usePageSeo.js'

export default function ContactPage() {
  usePageSeo({
    title: 'Contact — Fredrick Onyango',
    description:
      'Contact Fredrick Onyango about full-stack, backend or AI/ML engineering work — email, GitHub and LinkedIn.',
    path: '/contact',
  })

  return (
    <>
      <div className="page-head container">
        <p className="section-kicker">Contact</p>
        <h1>Let’s build something</h1>
        <p className="muted" style={{ maxWidth: 640 }}>
          Project enquiries, collaborations or questions about anything on this site — every serious
          message gets a reply.
        </p>
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
