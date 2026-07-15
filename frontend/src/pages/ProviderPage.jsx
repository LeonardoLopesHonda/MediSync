import { Link, useParams } from 'react-router-dom'
import { providersById, reviews } from '../data/mockData'
import './ProviderPage.css'

function ProviderPage() {
  const { id } = useParams()
  const provider = providersById[id] || providersById['1']

  return (
    <div className="provider-page">
      <div className="provider-page__crumb">
        <Link to="/results" className="provider-page__back">
          ← Back to results
        </Link>
      </div>

      <div className="provider-header">
        <div className="provider-header__avatar" />
        <div className="provider-header__info">
          <div className="provider-header__name-row">
            <h1 className="provider-header__name">{provider.name}</h1>
            <span className="provider-header__badge">Verified</span>
          </div>
          <div className="provider-header__specialty">{provider.specialty}</div>
          <div className="provider-header__meta">
            <span>
              ★ {provider.rating} ({provider.reviews} reviews)
            </span>
            <span>{provider.distance} away</span>
            <span>{provider.address}</span>
          </div>
        </div>
        <button type="button" className="provider-header__book">
          Book appointment
        </button>
      </div>

      <div className="provider-grid">
        <div className="provider-main">
          <div>
            <h2 className="provider-section-title">About</h2>
            <p className="provider-about">{provider.about}</p>
          </div>

          <div>
            <h2 className="provider-section-title">Available times</h2>
            <div className="slots-grid">
              {provider.slots.map((slot, i) => (
                <button key={`${slot}-${i}`} type="button" className="slot-button">
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h2 className="provider-section-title">Patient reviews</h2>
            <div className="reviews-list">
              {reviews.map((rev) => (
                <div key={rev.name} className="review-card">
                  <div className="review-card__header">
                    <span className="review-card__name">{rev.name}</span>
                    <span className="review-card__rating">★ {rev.rating}</span>
                  </div>
                  <p className="review-card__text">{rev.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="provider-side">
          <div className="map-placeholder map-placeholder--small">
            <div className="map-placeholder__label">[ map placeholder — clinic location ]</div>
            <div className="map-pin map-pin--center" />
          </div>

          <div className="info-card">
            <div className="info-card__item">
              <div className="info-card__label">Address</div>
              <div className="info-card__value">{provider.address}</div>
            </div>
            <div className="info-card__item">
              <div className="info-card__label">Phone</div>
              <div className="info-card__value">{provider.phone}</div>
            </div>
            <div className="info-card__item">
              <div className="info-card__label">Insurance accepted</div>
              <div className="info-card__value">{provider.insurance}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProviderPage
