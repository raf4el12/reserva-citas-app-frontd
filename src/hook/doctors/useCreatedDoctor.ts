import { useMutation } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Doctor, DoctorCreateDto } from '../../types/doctors'

export const useCreateDoctor = () => {
  return useMutation({
    mutationFn: async (newCategory: DoctorCreateDto) => {
      const data = await ApiBackend.post('/doctors', newCategory)
      return data as Doctor
    },
  })
}