import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'react-hot-toast'
import ApiBackend from '../../shared/services/api.backend'

export const useDeletePatients = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (id: number) => {
      const data = await ApiBackend.delete(`/patients/${id}`)
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
      toast.success('Paciente eliminado exitosamente')
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Error al eliminar el paciente'
      toast.error(errorMessage)
      console.error('Error deleting patient:', error)
    },
  })
}
