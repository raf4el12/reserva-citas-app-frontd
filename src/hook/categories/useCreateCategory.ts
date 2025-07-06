import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import updateQueryArray from '../../shared/utils/updateQueryArray'
import type { Category, CategoryDto } from '../../types/category'

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (input: CategoryDto) => {
      const data = await ApiBackend.post('/categories', input)
      return data as Category
    },
    onSuccess: (newItem) => {
      updateQueryArray<Category>(queryClient, ['categories'], {
        type: 'add',
        item: newItem,
      })
    },
  })
}
