import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import updateQueryArray from '../../shared/utils/updateQueryArray'
import type { Category, CategoryDto } from '../../types/category'

export const useEditCategory = (id: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CategoryDto) => {
      const data = await ApiBackend.put(`/categories/${id}`, input)

      return data as Category
    },
    onSuccess: (editItem) => {
      updateQueryArray<Category>(queryClient, ['categories'], {
        type: 'update',
        item: editItem,
        matchBy: 'id',
      })
    },
  })
}
