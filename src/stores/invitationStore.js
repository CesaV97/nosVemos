import { create } from 'zustand'
import { mockInvitations } from '../data/mockInvitations'

/**
 * Zustand store para invitaciones
 *
 * Fase 2: mockInvitations en memoria
 * Fase 3: reemplazar con TanStack Query + Supabase
 *
 * El hook `useInvitation()` abstrae este store, permitiendo swaps sin cambiar componentes
 */

export const useInvitationStore = create((set, get) => ({
  // Estado
  invitations: mockInvitations, // { [id]: invitation }

  // Acciones
  getById: (id) => get().invitations[id] ?? null,

  updateInvitation: (id, fields) => set((state) => ({
    invitations: {
      ...state.invitations,
      [id]: {
        ...state.invitations[id],
        ...fields,
      },
    },
  })),

  createInvitation: (invitation) => set((state) => ({
    invitations: {
      ...state.invitations,
      [invitation.id]: invitation,
    },
  })),

  getAllPublished: () => {
    const invs = get().invitations
    return Object.values(invs).filter((inv) => inv.isPublished)
  },

  getAll: () => Object.values(get().invitations),
}))
