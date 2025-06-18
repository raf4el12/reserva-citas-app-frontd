import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category'

type CreateCategoryDto = {
  name: string
}

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: async (newCategory: CreateCategoryDto) => {
      const data = await ApiBackend.post('/categories', newCategory)
      return data as Category
    },
  })
}