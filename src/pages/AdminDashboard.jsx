import { Link } from 'react-router-dom'
import { useInvitationStore } from '../stores/invitationStore'
import './AdminDashboard.css'

export default function AdminDashboard() {
  const invitations = useInvitationStore(state => state.getAll())

  return (
    <div className="admin-dashboard">
      <div className="admin-dashboard__header">
        <h1>Panel de Administración</h1>
        <p className="admin-dashboard__subtitle">Gestiona tus invitaciones digitales</p>
      </div>

      <div className="admin-dashboard__warning">
        ⚠️ Los cambios se guardan solo en esta sesión. Supabase se integrará en la Fase 3.
      </div>

      <button className="admin-dashboard__new-btn">
        + Nueva Invitación
      </button>

      {invitations.length === 0 ? (
        <p className="admin-dashboard__empty">No hay invitaciones aún.</p>
      ) : (
        <div className="admin-dashboard__list">
          {invitations.map(inv => (
            <div key={inv.id} className="admin-dashboard__card">
              <div className="admin-dashboard__card-info">
                <h3 className="admin-dashboard__card-title">{inv.coupleNames}</h3>
                <p className="admin-dashboard__card-meta">
                  {inv.eventType.toUpperCase()} • {inv.eventDateDisplay}
                </p>
                <p className="admin-dashboard__card-template">Template: {inv.templateId}</p>
              </div>

              <div className="admin-dashboard__card-actions">
                <Link
                  to={`/invite/${inv.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="admin-dashboard__btn admin-dashboard__btn--preview"
                >
                  👁️ Ver invitación
                </Link>
                <Link
                  to={`/admin/invite/${inv.id}/edit`}
                  className="admin-dashboard__btn admin-dashboard__btn--edit"
                >
                  ✏️ Editar
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
