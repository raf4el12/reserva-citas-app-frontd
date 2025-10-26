import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'

import ApiBackend from '../../shared/services/api.backend'
import type {
  Patients,
  PatientsCreateDto,
} from '../../types/patients/patientSchema'

export const useCreatePatients = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newPatients: PatientsCreateDto) => {
      const data = await ApiBackend.post('/patients', newPatients)
      return data as Patients
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      toast.success('Paciente creado exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear el paciente'
      toast.error(errorMessage)
    },
  })
}
