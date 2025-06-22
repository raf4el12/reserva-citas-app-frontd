import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { SignupDto } from '../../types/auth'

export const useSignup = () => {
  return useMutation({
    mutationFn: async (user: SignupDto) => {
      const data = await ApiBackend.post('/auth/signup', user)
      return data
    },
  })
}
