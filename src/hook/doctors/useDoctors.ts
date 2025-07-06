import { useQuery } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Doctor } from '../../types/doctors'

export const useDoctors = () => {
  const dataQuery = useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const data = await ApiBackend.get('/doctors')

      return data as Doctor[]
    },
  })

  return dataQuery
}
