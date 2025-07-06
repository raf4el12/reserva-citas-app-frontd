import { useMutation } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Patients, PatientscCreateDto } from '../../types/patients'

export const useCreatePatients = () => {
  return useMutation({
    mutationFn: async (newPatients: PatientscCreateDto) => {
      const data = await ApiBackend.post('/patients', newPatients)
      return data as Patients
    },
  })
}
