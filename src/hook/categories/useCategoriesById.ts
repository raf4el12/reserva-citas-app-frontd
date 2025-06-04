import type { Category } from '../../types/category';
import { useQuery } from '@tanstack/react-query';

export const useGetCategoryById = (categoryId:number) => {
  const query = useQuery({
    queryKey: ['category', categoryId], 
    queryFn: async () => {
      if (!categoryId) return null; 
      const response = await fetch(`http://localhost:3000/api/categories/${categoryId}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch category with id ${categoryId}`);
      }
      const data = await response.json();
      console.log('result.data by ID', data);
      return data as Category;
    },
    enabled: !!categoryId, 
  });

  return query;
};