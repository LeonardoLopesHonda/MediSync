import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { chips, stats } from '../data/mockData'
import './HomePage.css'

function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const goToResults = (value) => {
    const q = encodeURIComponent(value || 'general symptoms')
    navigate(`/results?q=${q}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    goToResults(query)
  }

  return (
    <>
      <section className="hero">
        <div className="hero__eyebrow">AI-Powered Medical Insight</div>
        <h1 className="hero__title">Understand your symptoms. Find the right care.</h1>
        <p className="hero__subtitle">
          MediSync analyzes your symptoms in real time, surfaces likely causes, and connects you
          with nearby specialists and hospitals — all in one place.
        </p>

        <form className="symptom-form" onSubmit={handleSubmit}>
          <div className="symptom-form__bar">
            <input
              type="text"
              placeholder="Describe your symptoms… e.g. “headache, fatigue, blurred vision”"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="symptom-form__input"
            />
            <button type="submit" className="symptom-form__submit">
              Check symptoms
            </button>
          </div>
        </form>

        <div className="chip-row">
          {chips.map((chip) => (
            <button key={chip.label} className="chip" onClick={() => goToResults(chip.label)}>
              {chip.label}
            </button>
          ))}
        </div>

        <div className="hero__disclaimer">
          Not a substitute for professional medical advice. In an emergency, call your local
          emergency number.
        </div>
      </section>

      <section className="features">
        <div className="features__header">
          <h2 className="features__title">How MediSync works</h2>
          <p className="features__subtitle">Three steps from symptom to care.</p>
        </div>
        <div className="features__grid">
          <div className="feature-card">
            <div className="feature-card__icon feature-card__icon--blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
            </div>
            <h3 className="feature-card__title">Describe symptoms</h3>
            <p className="feature-card__text">
              Tell MediSync what you're feeling in plain language — no medical jargon required.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon feature-card__icon--teal">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0d9488" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18h6" />
                <path d="M10 21h4" />
                <path d="M12 3a6 6 0 0 0-4 10.5c.5.5.9 1.2 1 2.5h6c.1-1.3.5-2 1-2.5A6 6 0 0 0 12 3z" />
              </svg>
            </div>
            <h3 className="feature-card__title">Get likely causes</h3>
            <p className="feature-card__text">
              Our AI surfaces possible causes ranked by likelihood, with clear next steps.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-card__icon feature-card__icon--blue">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1d4ed8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 21s-7-6.1-7-11.5A7 7 0 0 1 12 2.5a7 7 0 0 1 7 7C19 14.9 12 21 12 21z" />
                <circle cx="12" cy="9.5" r="2.4" />
              </svg>
            </div>
            <h3 className="feature-card__title">Find nearby care</h3>
            <p className="feature-card__text">
              See specialists and hospitals near you, matched to your specific concern.
            </p>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-strip__inner">
          <div className="trust-strip__note">
            MediSync provides informational insight only and does not replace diagnosis or
            treatment by a licensed clinician.
          </div>
          <div className="trust-strip__stats">
            {stats.map((s) => (
              <div key={s.label}>
                <div className="trust-strip__value">{s.value}</div>
                <div className="trust-strip__label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default HomePage
