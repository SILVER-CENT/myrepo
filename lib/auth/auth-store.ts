"use client"

import { create } from 'zustand'
import { AuthState, UserRole } from '@/lib/routing/types'

interface AuthStore extends AuthState {
  login: (userId: string, roles: UserRole[]) => void
  logout: () => void
}

export const useAuthStore = create<AuthStore>((set) => ({
  isAuthenticated: false,
  roles: [],
  userId: null,
  login: (userId: string, roles: UserRole[]) => 
    set({ isAuthenticated: true, userId, roles }),
  logout: () => 
    set({ isAuthenticated: false, userId: null, roles: [] })
}))