import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Specialties } from '../../types/specialties'

export const useGetSpecialtyById = (specialtyId: number) => {
  const query = useQuery({
    queryKey: ['specialty', specialtyId],
    queryFn: async () => {
      if (!specialtyId) return null

      const data = await ApiBackend.get(`/specialties/${specialtyId}`)

      return data as Specialties
    },
    enabled: !!specialtyId,
  })

  return query
}
