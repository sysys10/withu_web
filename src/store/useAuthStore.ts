// src/store/useAuthStore.ts
import { WithuUser } from '@/types/auth.type'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthState {
  user: WithuUser | null
  accessToken: string | null
  isAuthenticated: boolean
  setUser: (user: WithuUser | null) => void
  setAccessToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      setUser: user =>
        set({
          user,
          isAuthenticated: !!user
        }),
      setAccessToken: accessToken => set({ accessToken }),
      logout: () =>
        set({
          user: null,
          accessToken: null,
          isAuthenticated: false
        })
    }),
    {
      name: 'withU-auth-storage',
      storage: createJSONStorage(() => localStorage)
    }
  )
)
