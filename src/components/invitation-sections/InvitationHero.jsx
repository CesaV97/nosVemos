import './InvitationHero.css'

/**
 * Sección hero de la invitación
 * Pantalla completa con nombres, tagline, fecha
 */

export default function InvitationHero({ coupleNames, tagline, eventDateDisplay }) {
  return (
    <section className="inv-hero">
      <div className="inv-hero__ornament-top">◆</div>

      <h1 className="inv-hero__names">{coupleNames}</h1>

      {tagline && <p className="inv-hero__tagline">{tagline}</p>}

      <div className="inv-hero__date">{eventDateDisplay}</div>

      <div className="inv-hero__ornament-bottom">◆</div>
    </section>
  )
}
