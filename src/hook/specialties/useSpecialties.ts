import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

export const useSpecialties = () => {
  return useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const { data } = await ApiBackend.get('/specialties')
      return data
    },
  })
}