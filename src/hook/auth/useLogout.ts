import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

async function loginUser() {
  return ApiBackend.post('/auth/logout')
}

export function removeAuthLocalStorage() {
  localStorage.removeItem('userId')
}

export function useLogoutMutation() {
  return useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      removeAuthLocalStorage()
    },
  })
}
