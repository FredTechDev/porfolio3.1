import { Link } from 'react-router-dom'

export default function BuildingProducts() {
  return (
    <section className="section" aria-labelledby="products-title">
      <div className="container">
        <div className="card" style={{ padding: 'clamp(1.75rem, 5vw, 3rem)' }}>
          <p className="section-kicker">Building Products</p>
          <h2 id="products-title">
            I don't only build assignments. I build products.
          </h2>
          <p className="muted" style={{ maxWidth: 680 }}>
            Two of my projects started as conversations about problems people actually
            have — education support in Kenya, and the daily chaos of rental property
            management — and became products designed around real users.
          </p>

          <div className="grid grid--2" style={{ marginTop: '1.75rem' }}>
            <div>
              <h3>
                <Link to="/projects/kilele-archade">Kilele Archade</Link>
              </h3>
              <p className="muted" style={{ fontSize: '0.92rem' }}>
                AI-powered CBC learning platform — from curriculum-aware tutoring to
                teacher, student and parent workflows. Live at kilelearchade.co.ke.
              </p>
            </div>
            <div>
              <h3>
                <Link to="/projects/apex">Apex</Link>
              </h3>
              <p className="muted" style={{ fontSize: '0.92rem' }}>
                Rental management and property automation — tenants, rent ledgers,
                vacancies, repairs and reports in one system.
              </p>
            </div>
          </div>

          <div className="btn-row" style={{ marginTop: '1.25rem' }}>
            <Link className="btn btn--ghost btn--sm" to="/projects/kilele-archade">
              Kilele Archade case study
            </Link>
            <Link className="btn btn--ghost btn--sm" to="/projects/apex">
              Apex case study
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
