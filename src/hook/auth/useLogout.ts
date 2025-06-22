import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

async function loginUser() {
  return ApiBackend.post('/auth/logout')
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      localStorage.removeItem('userId')
    },
  })
}
