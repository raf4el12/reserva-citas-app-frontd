import { useQuery } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Category, CategoryFilters } from '../../types/category'

export const useCategoriesWithFilters = (filters: CategoryFilters = {}) => {
  const query = useQuery({
    queryKey: ['categories', 'filtered', filters],
    queryFn: async () => {
      const params = new URLSearchParams()
      
      if (filters.isActive !== undefined) {
        params.append('isActive', filters.isActive.toString())
      }
      if (filters.deleted !== undefined) {
        params.append('deleted', filters.deleted.toString())
      }
      if (filters.search) {
        params.append('search', filters.search)
      }
      
      const queryString = params.toString()
      const url = queryString ? `/categories?${queryString}` : '/categories'
      
      const data = await ApiBackend.get(url)
      return data as Category[]
    },
  })

  return query
}

export const useActiveCategories = () => {
  return useCategoriesWithFilters({ isActive: true, deleted: false })
}

export const useDeletedCategories = () => {
  return useCategoriesWithFilters({ deleted: true })
}
