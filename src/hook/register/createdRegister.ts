import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

type RegisterDto = {
  name: string
  email: string
  password: string
  role: string
}

export const useRegister = () => {
  return useMutation({
    mutationFn: async (user: RegisterDto) => {
      const data = await ApiBackend.post('/users', user)
      return data
    },
  })
}