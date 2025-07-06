import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { DoctorsSpecialty } from '../../types/doctors'

export const useDoctorSpecialties = (doctorId: number) => {
  const dataQuery = useQuery({
    queryKey: ['doctorSpecialties', doctorId],
    queryFn: async () => {
      const { data } = await ApiBackend.get(`/doctors/${doctorId}/specialties`)
      return data as DoctorsSpecialty[]
    },
    enabled: !!doctorId,
  })

  return dataQuery
}
