import './RSVPSection.css'

export default function RSVPSection({ rsvp }) {
  if (!rsvp || !rsvp.enabled) return null

  const whatsappLink = rsvp.contactPhone
    ? `https://wa.me/${rsvp.contactPhone.replace(/\D/g, '')}?text=${encodeURIComponent(rsvp.whatsappMessage)}`
    : '#'

  return (
    <section className="inv-rsvp">
      <h2 className="inv-rsvp__title">Confirma tu Asistencia</h2>
      <p className="inv-rsvp__note">Antes del {rsvp.deadline || 'próximo mes'}</p>

      <div className="inv-rsvp__actions">
        <a href={whatsappLink} target="_blank" rel="noreferrer" className="inv-rsvp__btn inv-rsvp__btn--whatsapp">
          📱 Confirmar por WhatsApp
        </a>

        {rsvp.formUrl && (
          <a href={rsvp.formUrl} target="_blank" rel="noreferrer" className="inv-rsvp__btn inv-rsvp__btn--form">
            Formulario RSVP
          </a>
        )}
      </div>

      {rsvp.contactPhone && (
        <p className="inv-rsvp__phone">O llama al {rsvp.contactPhone}</p>
      )}
    </section>
  )
}
