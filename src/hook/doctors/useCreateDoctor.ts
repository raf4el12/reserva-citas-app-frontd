import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import Envs from '../../shared/envs'
import ApiBackend from '../../shared/services/api.backend'
import type { Doctor, DoctorCreate } from '../../types/doctors/doctorSchema'

const API_URL = `${Envs.VITE_API_BACKEND_URL}/api`

export const useCreateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newDoctor: DoctorCreate) => {
      const hasFile = newDoctor.photo instanceof File

      if (hasFile) {
        const formData = new FormData()
        for (const [key, value] of Object.entries(newDoctor)) {
          if (value && key !== 'photo') {
            if (key === 'specialtyIds' && Array.isArray(value)) {
              formData.append(key, JSON.stringify(value))
            } else if (key === 'userId') {
              formData.append(key, value.toString())
            } else {
              formData.append(key, value as string)
            }
          }
        }
        formData.append('photo', newDoctor.photo as File)
        const response = await fetch(`${API_URL}/doctors`, {
          method: 'POST',
          body: formData,
          credentials: 'include',
        })
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}))
          throw new Error(errorData.message || 'Error al crear el doctor')
        }

        const result = await response.json()
        return result.data || result
      }
      return (await ApiBackend.post('/doctors', newDoctor)) as Doctor
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      toast.success('Doctor creado exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear el doctor'
      toast.error(errorMessage)
    },
  })
}
