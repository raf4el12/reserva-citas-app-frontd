import { useQuery } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Doctor } from '../../types/doctors'

export const useGetDoctorsById = (doctorId: number) => {
  const query = useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: async () => {
      if (!doctorId) return null

      const data = await ApiBackend.get(`/doctors/${doctorId}`)

      return data as Doctor
    },
    enabled: !!doctorId,
  })

  return query
}