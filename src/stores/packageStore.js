import { create } from 'zustand'
import { persist } from 'zustand/middleware'

/**
 * Store for the user's selected package on the landing page.
 * Persisted to localStorage so the selection survives refreshes.
 *
 * Default selection is 'celebracion' (the popular package).
 */
export const usePackageStore = create(
  persist(
    (set) => ({
      selectedPackageId: 'celebracion',
      setSelectedPackage: (id) => set({ selectedPackageId: id }),
    }),
    { name: 'nosvemos-package' }
  )
)
