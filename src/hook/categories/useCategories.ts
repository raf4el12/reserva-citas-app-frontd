import ApiBackend from '../../shared/services/api.backend'
import type { Category } from '../../types/category'

import { useQuery } from '@tanstack/react-query'

export const useCategories = () => {
  const dataQuery = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const data = await ApiBackend.get('/categories')

      return data as Category[]
    },
  })

  return dataQuery
}
