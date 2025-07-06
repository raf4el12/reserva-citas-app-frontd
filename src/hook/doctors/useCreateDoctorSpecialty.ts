import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type {
  DoctorsSpecialty,
  DoctorsSpecialtyCreateDto,
} from '../../types/doctors'

export const useCreateDoctorSpecialty = () => {
  return useMutation({
    mutationFn: async (newDoctorSpecialty: DoctorsSpecialtyCreateDto) => {
      const data = await ApiBackend.post(
        '/doctors-specialties',
        newDoctorSpecialty
      )
      return data as DoctorsSpecialty
    },
  })
}
