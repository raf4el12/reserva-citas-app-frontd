import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import Envs from '../../shared/envs'
import ApiBackend from '../../shared/services/api.backend'
import type {
  Patient,
  PatientUpdateDto,
} from '../../types/patients/patientSchema'

const API_URL = `${Envs.VITE_API_BACKEND_URL}/api`

export const useUpdatePatient = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      ...updateData
    }: PatientUpdateDto & { id: number }) => {
      const hasFile = updateData.photo instanceof File

      if (hasFile) {
        const formData = new FormData()
        for (const [key, value] of Object.entries(updateData)) {
          if (value && key !== 'photo') {
            formData.append(key, value as string)
          }
        }
        formData.append('photo', updateData.photo as File)
        const response = await fetch(`${API_URL}/patients/${id}`, {
          method: 'PUT',
          body: formData,
          credentials: 'include',
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(
            errorData.message || 'Error al actualizar el paciente'
          )
        }
        const result = await response.json()
        return result.data || result
      }
      return (await ApiBackend.put(`/patients/${id}`, updateData)) as Patient
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      queryClient.invalidateQueries({ queryKey: ['patient', data.id] })
      toast.success('Paciente actualizado exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al actualizar el paciente'
      toast.error(errorMessage)
    },
  })
}
