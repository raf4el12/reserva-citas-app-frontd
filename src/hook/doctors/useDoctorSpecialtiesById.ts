import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { DoctorsSpecialty } from '../../types/doctors'

export const useGetDoctorSpecialtiesById = (doctorId: number) => {
  const query = useQuery({
    queryKey: ['doctorSpecialties', doctorId],
    queryFn: async () => {
      if (!doctorId) return null

      const data = await ApiBackend.get(
        `/doctors-specialties?doctorId=${doctorId}`
      )

      return data as DoctorsSpecialty[]
    },
    enabled: !!doctorId,
  })

  return query
}
