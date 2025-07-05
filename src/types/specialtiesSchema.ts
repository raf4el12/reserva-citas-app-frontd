import { z } from 'zod'

// Esquema para validar la creación de una especialidad
export const createSpecialtySchema = z.object({
  name: z.string().min(1, 'El nombre de la especialidad es obligatorio'), // Validación de nombre
  categoryId: z.number().min(1, 'El ID de la categoría es obligatorio'), // Validación del ID de categoría
})

// Inferir el tipo del DTO basado en el esquema Zod
export type CreateSpecialtyDto = z.infer<typeof createSpecialtySchema>
