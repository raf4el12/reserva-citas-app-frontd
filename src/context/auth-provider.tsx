import { type ReactNode, createContext, useContext, useState } from 'react'
import { useGetUserIdContext } from '../hook/auth/useGetUserIdContext'
import { useUserById } from '../hook/users/useUserById'
import type { User } from '../types/user'

interface AuthState {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthState | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const userId = useGetUserIdContext()
  const { data: user, isPending } = useUserById(userId)

  const value = {
    user: user || null,
    isLoading: isPending,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

const useAuthContext = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuthContext
