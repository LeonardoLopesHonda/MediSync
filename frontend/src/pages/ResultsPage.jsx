import { Link, useSearchParams } from 'react-router-dom'
import { causes, pins, providers } from '../data/mockData'
import './ResultsPage.css'

function ResultsPage() {
  const [searchParams] = useSearchParams()
  const queryLabel = searchParams.get('q') || 'headache, fatigue, blurred vision'

  return (
    <div className="results-page">
      <div className="results-page__header">
        <Link to="/" className="results-page__back">
          ← New search
        </Link>
        <div className="results-page__title-row">
          <div>
            <div className="results-page__eyebrow">Symptom analysis</div>
            <h1 className="results-page__title">Results for “{queryLabel}”</h1>
          </div>
          <div className="results-page__timing">Generated in 1.8s</div>
        </div>
      </div>

      <div className="results-page__grid">
        <div className="causes-column">
          <h2 className="column-heading">Possible causes</h2>
          {causes.map((cause) => (
            <div key={cause.name} className="cause-card">
              <div className="cause-card__header">
                <h3 className="cause-card__name">{cause.name}</h3>
                <span
                  className="cause-card__tag"
                  style={{ background: cause.tagBg, color: cause.tagColor }}
                >
                  {cause.likelihood} likelihood
                </span>
              </div>
              <p className="cause-card__description">{cause.description}</p>
              <div className="cause-card__specialist">
                Recommended specialist: <span>{cause.specialist}</span>
              </div>
            </div>
          ))}

          <div className="disclaimer-box">
            This is not a diagnosis. Please consult a licensed healthcare professional for
            medical advice.
          </div>
        </div>

        <div className="care-column">
          <h2 className="column-heading">Nearby care</h2>

          <div className="map-placeholder">
            <div className="map-placeholder__label">[ map placeholder — provider locations ]</div>
            {pins.map((pin, i) => (
              <div
                key={i}
                className="map-pin"
                style={{ left: pin.left, top: pin.top }}
              />
            ))}
          </div>

          {providers.map((p) => (
            <Link key={p.id} to={`/provider/${p.id}`} className="provider-card">
              <div className="provider-card__avatar" />
              <div className="provider-card__body">
                <div className="provider-card__name">{p.name}</div>
                <div className="provider-card__specialty">{p.specialty}</div>
                <div className="provider-card__meta">
                  <span>{p.distance}</span>
                  <span>★ {p.rating}</span>
                  <span>{p.availability}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
