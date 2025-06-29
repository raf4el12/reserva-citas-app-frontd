import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

export const useUpdateSpecialty = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ id, name }: { id: number; name: string }) => {
      await ApiBackend.put(`/specialties/${id}`, { name })
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
    },
  })
}
