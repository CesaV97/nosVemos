import { useInvitationStore } from '../stores/invitationStore'

/**
 * Hook que abstrae el acceso a invitaciones
 *
 * Interfaz uniforme:
 * - Fase 2: usa Zustand store (mockData)
 * - Fase 3: reemplazar para usar TanStack Query + Supabase
 *
 * Los componentes NUNCA cambian — la API es idéntica
 */

export function useInvitation(id) {
  const getById = useInvitationStore((state) => state.getById)
  const updateInvitation = useInvitationStore((state) => state.updateInvitation)

  const invitation = getById(id)

  return {
    invitation,
    isLoading: false, // Fase 3: true durante fetch Supabase
    error: invitation ? null : 'Invitación no encontrada',
    update: (fields) => updateInvitation(id, fields),
  }
}

/**
 * Hook para obtener todas las invitaciones
 */
export function useAllInvitations() {
  const getAll = useInvitationStore((state) => state.getAll)

  return {
    invitations: getAll(),
    isLoading: false,
    error: null,
  }
}
