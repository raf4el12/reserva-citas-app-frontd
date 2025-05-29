import {
  useQuery
} from '@tanstack/react-query'
import { Client, Response } from '../types/client';

export const useClient = () => {
  const dataQuery = useQuery({
    queryKey: ['clients'],
    queryFn: async () => {
      const response = await fetch('http://localhost:8000/api/clients');
      const data = await response.json();
      const result = data as Response<Client[]>;

      return result.data;
    }
  })

  return dataQuery
}