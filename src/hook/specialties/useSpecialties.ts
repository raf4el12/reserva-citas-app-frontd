import ApiBackend from '../../shared/services/api.backend'
import type { Specialties } from '../../types/specialties/specialties'

import { useQuery } from '@tanstack/react-query'

export const useSpecialties = () => {
  const dataQuery = useQuery({
    queryKey: ['specialties'],
    queryFn: async () => {
      const data = await ApiBackend.get('/specialties')
      return data as Specialties[]
    },
  })

  return dataQuery
}
