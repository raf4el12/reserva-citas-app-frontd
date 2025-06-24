import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

export const useSpecialtiesById = (id: string) => {
  return useQuery({
    queryKey: ['specialties', id],
    queryFn: async () => {
      const { data } = await ApiBackend.get(`/specialties/${id}`)
      return data
    },
    enabled: !!id,
  })
}