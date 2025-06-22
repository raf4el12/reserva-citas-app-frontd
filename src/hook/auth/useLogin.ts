import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

interface LoginDto {
  email: string
  password: string
}

async function loginUser(data: LoginDto) {
  return ApiBackend.post('/auth/login', data)
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      const { userId } = data
      localStorage.setItem('userId', userId)
    },
  })
}
