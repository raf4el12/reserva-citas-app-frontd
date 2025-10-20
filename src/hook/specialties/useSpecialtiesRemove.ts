import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'

export const useSpecialtiesRemove = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async (id: number) => {
      await ApiBackend.delete(`/specialties/${id}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
      toast.success('Especialidad eliminada exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al eliminar la especialidad'
      toast.error(errorMessage)
      console.error('Error deleting specialty:', error)
    },
  })
}
