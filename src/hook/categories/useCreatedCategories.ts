import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category, CreateCategoryDto } from '../../types/category'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (newCategory: CreateCategoryDto) => {
      const data = await ApiBackend.post('/categories', newCategory)
      return data as Category
    },
    onSuccess: () => {
      // Invalidar la query de categorías para refrescar la lista
      queryClient.invalidateQueries({ queryKey: ['categories'] })
    },
  })
}
