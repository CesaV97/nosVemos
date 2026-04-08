import './CeremonyInfo.css'

export default function CeremonyInfo({ ceremony }) {
  if (!ceremony) return null

  return (
    <section className="inv-info inv-ceremony">
      <div className="inv-info__ornament">⛪</div>
      <h2 className="inv-info__title">Ceremonia</h2>

      <div className="inv-info__content">
        <div className="inv-info__block">
          <p className="inv-info__label">Lugar</p>
          <p className="inv-info__text">{ceremony.venueName}</p>
        </div>

        <div className="inv-info__block">
          <p className="inv-info__label">Dirección</p>
          <p className="inv-info__text">{ceremony.address}</p>
        </div>

        <div className="inv-info__block">
          <p className="inv-info__label">Hora</p>
          <p className="inv-info__text">{ceremony.time}</p>
        </div>

        {ceremony.mapsUrl && (
          <a href={ceremony.mapsUrl} target="_blank" rel="noreferrer" className="inv-info__map-link">
            Ver en Google Maps →
          </a>
        )}
      </div>
    </section>
  )
}
