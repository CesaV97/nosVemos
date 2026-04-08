import { useParams, useSearchParams } from 'react-router-dom'
import { useInvitation } from '../hooks/useInvitation'
import { getTemplate } from '../templates'
import { packages } from '../data/mockData'

export default function InvitePage() {
  const { id } = useParams()
  const [searchParams] = useSearchParams()
  const { invitation, isLoading, error } = useInvitation(id)

  // Read ?pkg= query param and resolve to includedComponents
  const pkgId = searchParams.get('pkg')
  const pkgObj = pkgId ? packages.find(p => p.id === pkgId) : null
  const includedComponents = pkgObj?.includedComponents

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'system-ui' }}>
        <p>Cargando invitación...</p>
      </div>
    )
  }

  if (error || !invitation) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'system-ui' }}>
        <h1>Invitación no encontrada</h1>
        <p>La invitación con ID "{id}" no existe.</p>
        <a href="/" style={{ color: '#097C87', textDecoration: 'none' }}>
          Volver al inicio
        </a>
      </div>
    )
  }

  const TemplateComponent = getTemplate(invitation.templateId)

  if (!TemplateComponent) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 20px', fontFamily: 'system-ui' }}>
        <h1>Template no disponible</h1>
        <p>El template "{invitation.templateId}" no está implementado aún.</p>
        <a href="/" style={{ color: '#097C87', textDecoration: 'none' }}>
          Volver al inicio
        </a>
      </div>
    )
  }

  return (
    <TemplateComponent
      invitation={invitation}
      includedComponents={includedComponents}
    />
  )
}
