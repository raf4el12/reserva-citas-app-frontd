import type { Category } from '../../types/category';
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useQuery
} from '@tanstack/react-query'

export const useCategories = () => {
  const dataQuery = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await fetch('http://localhost:3000/api/categories');
      const data = await response.json();

      console.log('result.data', data)

      return data as Category[];
    }
  })

  return dataQuery
}