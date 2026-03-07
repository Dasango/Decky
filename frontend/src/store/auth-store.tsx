import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null;
  user: string | null;
  setToken: (token: string, username?: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      user: null,
      setToken: (newToken: string, username?: string) => set({ token: newToken, user: username || 'User' }),
      logout: () => set({ token: null, user: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)