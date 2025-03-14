import { WithuUser } from '@/types/auth.type'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

interface AuthStore {
  user: WithuUser | null
  setUser: (user: WithuUser) => void
}

export const useAuthStore = create<AuthStore>()(
  persist(
    set => ({
      user: null,
      setUser: (user: WithuUser) => set({ user })
    }),
    { name: 'auth', storage: createJSONStorage(() => localStorage) }
  )
)
