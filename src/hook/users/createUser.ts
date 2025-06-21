import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

type createUserDto = {
  name: string
  email: string
  password: string
  role: string
}

export const createUser = () => {
  return useMutation({
    mutationFn: async (user: createUserDto) => {
      const data = await ApiBackend.post('/users', user)
      return data
    },
  })
}
