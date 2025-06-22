import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Role } from '../../types/user'

type SignupDto = {
  name: string
  email: string
  password: string
  role: Role
}

export const useSignup = () => {
  return useMutation({
    mutationFn: async (user: SignupDto) => {
      const data = await ApiBackend.post('/auth/signup', user)
      return data
    },
  })
}
