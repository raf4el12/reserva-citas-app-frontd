import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category/category'

export const useToggleCategoryStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, isActive }: { id: number; isActive: boolean }) => {
      const response = await ApiBackend.put(`/categories/${id}/toggle-status`, {
        isActive,
      })
      return response as Category
    },
    onSuccess: (updatedCategory) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({
        queryKey: ['category', updatedCategory.id],
      })
    },
  })
}
