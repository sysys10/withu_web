// src/store/useAuthStore.ts
import { WithuUser } from '@/types/auth.type'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  user: WithuUser | null
  isAuthenticated: boolean
  setUser: (user: WithuUser | null) => void
  logout: () => void
  checkAuthStatus: () => boolean
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,

      setUser: user =>
        set({
          user,
          isAuthenticated: !!user
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false
        }),

      checkAuthStatus: () => {
        return get().isAuthenticated
      }
    }),
    {
      name: 'withu-auth-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: state => ({
        user: state.user
          ? {
              id: state.user.id,
              name: state.user.name,
              email: state.user.email
            }
          : null,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
)
