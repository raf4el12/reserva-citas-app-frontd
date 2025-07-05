import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import {
  type CreateSpecialtyDto,
  createSpecialtySchema,
} from '../../types/specialtiesSchema' // Importación correcta

export const useSpecialtiesCreate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: CreateSpecialtyDto) => {
      // Validación usando Zod
      const validation = createSpecialtySchema.safeParse(data)

      if (!validation.success) {
        // Si la validación falla, lanzamos un error
        throw new Error(
          validation.error.errors.map((err) => err.message).join(', ')
        )
      }

      // Si la validación es exitosa, se realiza la solicitud al backend
      await ApiBackend.post('/specialties', data)
    },
    onSuccess: () => {
      // Invalidar la consulta de especialidades después de la mutación exitosa
      queryClient.invalidateQueries({ queryKey: ['specialties'] })
    },
  })
}
