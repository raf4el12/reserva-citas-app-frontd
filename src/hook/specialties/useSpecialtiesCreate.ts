import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import {
  type CreateSpecialtyDto,
  createSpecialtySchema,
} from '../../types/specialties/specialtiesSchema'

export const useSpecialtiesCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSpecialtyDto) => {
      const validation = createSpecialtySchema.safeParse(data)
      if (!validation.success) {
        throw new Error(
          validation.error.errors.map((err) => err.message).join(', ')
        )
      }
      const response = await ApiBackend.post('/specialties', validation.data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
      toast.success('Especialidad creada exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear la especialidad'
      toast.error(errorMessage)
      console.error('Error creating specialty:', error)
    },
  })
}
