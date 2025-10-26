import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Doctor } from '../../types/doctors/doctorSchema'

export const useDoctors = () => {
  return useQuery({
    queryKey: ['doctors'],
    queryFn: async () => {
      const data = await ApiBackend.get('/doctors')
      return data as Doctor[]
    },
  })
}
