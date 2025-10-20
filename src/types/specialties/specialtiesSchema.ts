import { z } from 'zod'

export const createSpecialtySchema = z.object({
  name: z.string().min(1, 'El nombre de la especialidad es obligatorio'),
  categoryId: z.number().min(1, 'El ID de la categoría es obligatorio'),
  description: z.string().optional().nullable(),
  duration: z
    .number()
    .min(1, 'La duración debe ser mayor a 0')
    .optional()
    .nullable(),
  price: z
    .number()
    .min(0, 'El precio no puede ser negativo')
    .optional()
    .nullable(),
  requirements: z.string().optional().nullable(),
  isActive: z.boolean().default(true),
})

export const updateSpecialtySchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre de la especialidad es obligatorio')
    .optional(),
  categoryId: z
    .number()
    .min(1, 'El ID de la categoría es obligatorio')
    .optional(),
  description: z.string().optional().nullable(),
  duration: z
    .number()
    .min(1, 'La duración debe ser mayor a 0')
    .optional()
    .nullable(),
  price: z
    .number()
    .min(0, 'El precio no puede ser negativo')
    .optional()
    .nullable(),
  requirements: z.string().optional().nullable(),
  icon: z.string().optional().nullable(),
  isActive: z.boolean().optional(),
})

export type CreateSpecialtyDto = z.infer<typeof createSpecialtySchema>
export type UpdateSpecialtyDto = z.infer<typeof updateSpecialtySchema>
