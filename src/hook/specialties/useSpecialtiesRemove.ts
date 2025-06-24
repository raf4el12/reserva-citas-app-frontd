import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

export const useSpecialtiesRemove = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await ApiBackend.delete(`/specialties/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
    },
  })
}
