import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category/category'
import {
  type UpdateCategoryDto,
  updateCategorySchema,
} from '../../types/category/categorySchema'

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: { id: number; data: UpdateCategoryDto }) => {
      const validation = updateCategorySchema.safeParse(data)

      if (!validation.success) {
        throw new Error(
          validation.error.errors.map((err) => err.message).join(', ')
        )
      }
      const response = await ApiBackend.put(
        `/categories/${id}`,
        validation.data
      )
      return response as Category
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría actualizada exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al actualizar la categoría'
      toast.error(`${errorMessage}`)
      console.error('Error updating category:', error)
    },
  })
}
