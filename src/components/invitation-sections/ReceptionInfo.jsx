import './ReceptionInfo.css'

export default function ReceptionInfo({ reception }) {
  if (!reception) return null

  return (
    <section className="inv-info inv-reception">
      <div className="inv-info__ornament">🍽️</div>
      <h2 className="inv-info__title">Recepción</h2>

      <div className="inv-info__content">
        <div className="inv-info__block">
          <p className="inv-info__label">Lugar</p>
          <p className="inv-info__text">{reception.venueName}</p>
        </div>

        <div className="inv-info__block">
          <p className="inv-info__label">Dirección</p>
          <p className="inv-info__text">{reception.address}</p>
        </div>

        <div className="inv-info__block">
          <p className="inv-info__label">Hora</p>
          <p className="inv-info__text">{reception.time}</p>
        </div>

        {reception.mapsUrl && (
          <a href={reception.mapsUrl} target="_blank" rel="noreferrer" className="inv-info__map-link">
            Ver en Google Maps →
          </a>
        )}
      </div>
    </section>
  )
}
