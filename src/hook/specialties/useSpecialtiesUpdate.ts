import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { Specialties } from '../../types/specialties/specialties'
import {
  type UpdateSpecialtyDto,
  updateSpecialtySchema,
} from '../../types/specialties/specialtiesSchema'

export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: number; data: UpdateSpecialtyDto }) => {
      const validation = updateSpecialtySchema.safeParse(data)

      if (!validation.success) {
        throw new Error(
          validation.error.errors.map((err) => err.message).join(', ')
        )
      }
      const response = await ApiBackend.put(
        `/specialties/${id}`,
        validation.data
      )
      return response as Specialties
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
      toast.success('Especialidad actualizada exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al actualizar la especialidad'
      toast.error(`${errorMessage}`)
      console.error('Error updating specialty:', error)
    },
  })
}
