import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category'

export const useGetCategoryById = (categoryId: number) => {
  const query = useQuery({
    queryKey: ['category', categoryId],
    queryFn: async () => {
      if (!categoryId) return null

      const data = await ApiBackend.get(`/categories/${categoryId}`)

      return data as Category
    },
    enabled: !!categoryId,
  })

  return query
}
