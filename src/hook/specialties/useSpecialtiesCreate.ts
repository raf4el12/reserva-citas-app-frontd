import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

interface CreateSpecialtyDto {
  name: string
  categoryId: number
}

export const useSpecialtiesCreate = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (data: CreateSpecialtyDto) => {
      await ApiBackend.post('/specialties', data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
    },
  })
}
