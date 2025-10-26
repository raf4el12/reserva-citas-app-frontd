import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'

export const useDeleteDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (doctorId: number) => {
      await ApiBackend.delete(`/doctors/${doctorId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })
      toast.success('Doctor eliminado exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al eliminar el doctor'
      toast.error(errorMessage)
    },
  })
}
