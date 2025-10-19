import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category'

export const useSoftDeleteCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (categoryId: number) => {
      const response = await ApiBackend.put(`/categories/${categoryId}/soft-delete`)
      return response as Category
    },
    onSuccess: (deletedCategory) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', deletedCategory.id] })
    },
  })
}

export const useRestoreCategory = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: async (categoryId: number) => {
      const response = await ApiBackend.put(`/categories/${categoryId}/restore`)
      return response as Category
    },
    onSuccess: (restoredCategory) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({ queryKey: ['category', restoredCategory.id] })
    },
  })
}
