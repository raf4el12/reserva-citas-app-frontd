import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { User } from '../../types/user'

export const useUserById = (userId: number) => {
  const query = useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      if (!userId) return null

      const data = await ApiBackend.get(`/users/${userId}`)

      return data as User
    },
    enabled: !!userId,
  })

  return query
}
