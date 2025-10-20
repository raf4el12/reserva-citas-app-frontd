import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category/category'

export const useSoftDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryId: number) => {
      await ApiBackend.delete(`/categories/${categoryId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      toast.success('Categoría eliminada exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al eliminar la categoría'
      toast.error(errorMessage)
      console.error('Error deleting category:', error)
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
      queryClient.invalidateQueries({ queryKey: ['categories'] })
      queryClient.invalidateQueries({
        queryKey: ['category', restoredCategory.id],
      })
    },
  })
}
