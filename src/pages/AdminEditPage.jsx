import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { useInvitation } from '../hooks/useInvitation'
import './AdminEditPage.css'

export default function AdminEditPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { invitation, update } = useInvitation(id)
  const [expanded, setExpanded] = useState({ identity: true })

  if (!invitation) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px' }}>
        <p>Invitación no encontrada</p>
      </div>
    )
  }

  const toggleSection = section => {
    setExpanded(prev => ({ ...prev, [section]: !prev[section] }))
  }

  const handleUpdate = (section, field, value) => {
    update({
      ...invitation,
      [section]: {
        ...invitation[section],
        [field]: value,
      },
    })
  }

  const handleSimpleUpdate = (field, value) => {
    update({
      ...invitation,
      [field]: value,
    })
  }

  return (
    <div className="admin-edit">
      <div className="admin-edit__header">
        <Link to="/admin" className="admin-edit__back">
          ← Volver
        </Link>
        <h1>Editar Invitación</h1>
        <a
          href={`/invite/${invitation.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="admin-edit__preview-link"
        >
          Ver invitación →
        </a>
      </div>

      <div className="admin-edit__notice">
        ⚠️ Los cambios se guardan automáticamente. Solo persisten en esta sesión.
      </div>

      {/* Identidad */}
      <section className="admin-edit__section">
        <button
          className="admin-edit__section-title"
          onClick={() => toggleSection('identity')}
        >
          {expanded.identity ? '▼' : '▶'} Identidad y Fecha
        </button>
        {expanded.identity && (
          <div className="admin-edit__section-content">
            <div className="admin-edit__field">
              <label>Nombres de la pareja</label>
              <input
                type="text"
                value={invitation.coupleNames || ''}
                onChange={e => handleSimpleUpdate('coupleNames', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Tagline</label>
              <input
                type="text"
                value={invitation.tagline || ''}
                onChange={e => handleSimpleUpdate('tagline', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Fecha (ISO)</label>
              <input
                type="text"
                value={invitation.eventDate || ''}
                onChange={e => handleSimpleUpdate('eventDate', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Fecha para mostrar</label>
              <input
                type="text"
                value={invitation.eventDateDisplay || ''}
                onChange={e => handleSimpleUpdate('eventDateDisplay', e.target.value)}
              />
            </div>
          </div>
        )}
      </section>

      {/* Ceremonia */}
      {invitation.eventType === 'boda' && (
        <section className="admin-edit__section">
          <button
            className="admin-edit__section-title"
            onClick={() => toggleSection('ceremony')}
          >
            {expanded.ceremony ? '▼' : '▶'} Ceremonia
          </button>
          {expanded.ceremony && invitation.ceremony && (
            <div className="admin-edit__section-content">
              <div className="admin-edit__field">
                <label>Nombre del lugar</label>
                <input
                  type="text"
                  value={invitation.ceremony.venueName || ''}
                  onChange={e => handleUpdate('ceremony', 'venueName', e.target.value)}
                />
              </div>
              <div className="admin-edit__field">
                <label>Dirección</label>
                <input
                  type="text"
                  value={invitation.ceremony.address || ''}
                  onChange={e => handleUpdate('ceremony', 'address', e.target.value)}
                />
              </div>
              <div className="admin-edit__field">
                <label>Hora</label>
                <input
                  type="text"
                  value={invitation.ceremony.time || ''}
                  onChange={e => handleUpdate('ceremony', 'time', e.target.value)}
                />
              </div>
              <div className="admin-edit__field">
                <label>URL de Google Maps</label>
                <input
                  type="text"
                  value={invitation.ceremony.mapsUrl || ''}
                  onChange={e => handleUpdate('ceremony', 'mapsUrl', e.target.value)}
                />
              </div>
            </div>
          )}
        </section>
      )}

      {/* Recepción */}
      <section className="admin-edit__section">
        <button
          className="admin-edit__section-title"
          onClick={() => toggleSection('reception')}
        >
          {expanded.reception ? '▼' : '▶'} Recepción
        </button>
        {expanded.reception && invitation.reception && (
          <div className="admin-edit__section-content">
            <div className="admin-edit__field">
              <label>Nombre del lugar</label>
              <input
                type="text"
                value={invitation.reception.venueName || ''}
                onChange={e => handleUpdate('reception', 'venueName', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Dirección</label>
              <input
                type="text"
                value={invitation.reception.address || ''}
                onChange={e => handleUpdate('reception', 'address', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Hora</label>
              <input
                type="text"
                value={invitation.reception.time || ''}
                onChange={e => handleUpdate('reception', 'time', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>URL de Google Maps</label>
              <input
                type="text"
                value={invitation.reception.mapsUrl || ''}
                onChange={e => handleUpdate('reception', 'mapsUrl', e.target.value)}
              />
            </div>
          </div>
        )}
      </section>

      {/* Código de Vestimenta */}
      <section className="admin-edit__section">
        <button
          className="admin-edit__section-title"
          onClick={() => toggleSection('dressCode')}
        >
          {expanded.dressCode ? '▼' : '▶'} Código de Vestimenta
        </button>
        {expanded.dressCode && invitation.dressCode && (
          <div className="admin-edit__section-content">
            <div className="admin-edit__field">
              <label>Etiqueta</label>
              <input
                type="text"
                value={invitation.dressCode.label || ''}
                onChange={e => handleUpdate('dressCode', 'label', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Nota</label>
              <textarea
                value={invitation.dressCode.note || ''}
                onChange={e => handleUpdate('dressCode', 'note', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Colores a evitar (separados por coma)</label>
              <input
                type="text"
                value={(invitation.dressCode.avoidColors || []).join(', ')}
                onChange={e =>
                  handleUpdate(
                    'dressCode',
                    'avoidColors',
                    e.target.value.split(',').map(c => c.trim())
                  )
                }
              />
            </div>
          </div>
        )}
      </section>

      {/* RSVP */}
      <section className="admin-edit__section">
        <button
          className="admin-edit__section-title"
          onClick={() => toggleSection('rsvp')}
        >
          {expanded.rsvp ? '▼' : '▶'} RSVP
        </button>
        {expanded.rsvp && invitation.rsvp && (
          <div className="admin-edit__section-content">
            <div className="admin-edit__field">
              <label>
                <input
                  type="checkbox"
                  checked={invitation.rsvp.enabled || false}
                  onChange={e => handleUpdate('rsvp', 'enabled', e.target.checked)}
                />
                Habilitar RSVP
              </label>
            </div>
            <div className="admin-edit__field">
              <label>Teléfono de contacto</label>
              <input
                type="text"
                value={invitation.rsvp.contactPhone || ''}
                onChange={e => handleUpdate('rsvp', 'contactPhone', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Mensaje por WhatsApp</label>
              <textarea
                value={invitation.rsvp.whatsappMessage || ''}
                onChange={e => handleUpdate('rsvp', 'whatsappMessage', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>URL del Formulario (opcional)</label>
              <input
                type="text"
                value={invitation.rsvp.formUrl || ''}
                onChange={e => handleUpdate('rsvp', 'formUrl', e.target.value)}
              />
            </div>
          </div>
        )}
      </section>

      {/* Galería */}
      <section className="admin-edit__section">
        <button
          className="admin-edit__section-title"
          onClick={() => toggleSection('gallery')}
        >
          {expanded.gallery ? '▼' : '▶'} Galería
        </button>
        {expanded.gallery && invitation.gallery && (
          <div className="admin-edit__section-content">
            <div className="admin-edit__field">
              <label>
                <input
                  type="checkbox"
                  checked={invitation.gallery.enabled || false}
                  onChange={e => handleUpdate('gallery', 'enabled', e.target.checked)}
                />
                Habilitar galería
              </label>
            </div>
            {invitation.gallery.photos && invitation.gallery.photos.length > 0 && (
              <div className="admin-edit__photos">
                {invitation.gallery.photos.map((photo, idx) => (
                  <div key={idx} className="admin-edit__photo-item">
                    <img src={photo.url} alt={photo.caption} />
                    <div>
                      <label>URL</label>
                      <input type="text" value={photo.url} disabled />
                      <label>Caption</label>
                      <input type="text" value={photo.caption || ''} disabled />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {/* Mensaje */}
      <section className="admin-edit__section">
        <button
          className="admin-edit__section-title"
          onClick={() => toggleSection('message')}
        >
          {expanded.message ? '▼' : '▶'} Mensaje Personal
        </button>
        {expanded.message && invitation.message && (
          <div className="admin-edit__section-content">
            <div className="admin-edit__field">
              <label>Mensaje</label>
              <textarea
                value={invitation.message.text || ''}
                onChange={e => handleUpdate('message', 'text', e.target.value)}
              />
            </div>
            <div className="admin-edit__field">
              <label>Despedida</label>
              <input
                type="text"
                value={invitation.message.signoff || ''}
                onChange={e => handleUpdate('message', 'signoff', e.target.value)}
              />
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
