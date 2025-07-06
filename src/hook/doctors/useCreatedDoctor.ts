import { useMutation } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Doctor, DoctorCreateDto } from '../../types/doctors'

export const useCreateDoctor = () => {
  return useMutation({
    mutationFn: async (newDoctor: DoctorCreateDto) => {
      const data = await ApiBackend.post('/doctors', newDoctor)
      return data as Doctor
    },
  })
}
