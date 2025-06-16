import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

interface LoginData {
  email: string
  password: string
}

async function loginUser(data: LoginData) {
  return ApiBackend.post('/auth/login', data)
}

export function useLoginMutation() {
  return useMutation({
    mutationFn: loginUser,
  })
}
