import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

//se puede agregar un tipo de dato para el id, pero no es necesario
export const useProfilesRemove = () => {
  return useMutation({
    mutationFn: async (id: number) => {
      const data = await ApiBackend.delete(`/profiles/${id}`)
      return data
    },
  })
}
