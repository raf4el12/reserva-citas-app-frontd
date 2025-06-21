import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

type CreateUserDto = {
  name: string
  email: string
  password: string
  role: string
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (user: CreateUserDto) => {
      const data = await ApiBackend.post('/users', user)
      return data
    },
  })
}
