import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Profile } from '../../types/profile'

export const useProfileById = (profileId: number) => {
  const query = useQuery({
    queryKey: ['profile', profileId],
    queryFn: async () => {
      if (!profileId) return null

      const data = await ApiBackend.get(`/profiles/${profileId}`)
      return data as Profile
    },
    enabled: !!profileId,
  })

  return query
}