import { type ReactNode, createContext, useContext } from 'react'
import { useGetUserById } from '../hook/users/useGetUserById'
import type { User } from '../types/user'

interface AuthState {
  user: User | null
  isLoading: boolean
}

const AuthContext = createContext<AuthState | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

const getUserId = () => localStorage.getItem('userId')

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const userId = getUserId()
  const userQuery = useGetUserById(userId)
  const { data: user, isPending } = userQuery

  const value = {
    user: user || null,
    isLoading: !!userId && isPending,
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
