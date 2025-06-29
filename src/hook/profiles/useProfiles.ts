import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Profile } from '../../types/profile'

export const useProfiles = () => {
  const dataQuery = useQuery({
    queryKey: ['profiles'],
    queryFn: async () => {
      const data = await ApiBackend.get('/profiles')
      return data as Profile[]
    },
  })

  return dataQuery
}
