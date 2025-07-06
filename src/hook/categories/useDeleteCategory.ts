import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import updateQueryArray from '../../shared/utils/updateQueryArray'
import type { Category } from '../../types/category'

export const useDeleteCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const data = await ApiBackend.delete(`/categories/${id}`)

      return data
    },
    onSuccess: (id) => {
      updateQueryArray<Category>(queryClient, ['categories'], {
        type: 'delete',
        id,
        matchBy: 'id',
      })
    },
  })
}
