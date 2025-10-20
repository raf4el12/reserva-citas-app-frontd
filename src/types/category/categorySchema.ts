import { z } from 'zod'

export const createCategorySchema = z.object({
  name: z
    .string()
    .min(1, 'El nombre es obligatorio')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional()
    .nullable(),
  isActive: z.boolean().default(true),
})

export const updateCategorySchema = z.object({
  name: z
    .string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .optional(),
  description: z
    .string()
    .max(500, 'La descripción no puede exceder 500 caracteres')
    .optional()
    .nullable(),
  isActive: z.boolean().optional(),
})

export const categoryFiltersSchema = z.object({
  isActive: z.boolean().optional(),
  deleted: z.boolean().optional(),
  search: z.string().optional(),
})

export type CreateCategoryDto = z.infer<typeof createCategorySchema>
export type UpdateCategoryDto = z.infer<typeof updateCategorySchema>
export type CategoryFilters = z.infer<typeof categoryFiltersSchema>
