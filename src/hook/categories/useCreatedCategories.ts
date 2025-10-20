import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category/category'
import {
  type CreateCategoryDto,
  createCategorySchema,
} from '../../types/category/categorySchema'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (newCategory: CreateCategoryDto) => {
      // Validación con Zod
      const validation = createCategorySchema.safeParse(newCategory)

      if (!validation.success) {
        throw new Error(
          validation.error.errors.map((err) => err.message).join(', ')
        )
      }
      const response = await ApiBackend.post('/categories', validation.data)
      return response.data as Category
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría creada exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al crear la categoría'
      toast.error(`${errorMessage}`)
      console.error('Error creating category:', error)
    },
  })
}
