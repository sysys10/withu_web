import { create } from 'zustand'

interface ErrorStore {
  error: string | null
  setError: (error: string) => void
}

export const useErrorStore = create<ErrorStore>(set => ({
  error: null,
  setError: error => set({ error })
}))
