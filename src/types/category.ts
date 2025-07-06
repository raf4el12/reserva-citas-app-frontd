import { z } from 'zod'

const categorySchemaBase = {
  name: z.string().min(1),
}

export const categorySchema = z.object({
  ...categorySchemaBase,
  id: z.number().int(),
  deleted: z.boolean().nullable().optional(),
  createdAt: z.string().nullable().optional(),
})

export type Category = z.infer<typeof categorySchema>

export const categoryDtoSchema = z.object({
  ...categorySchemaBase,
})

export type CategoryDto = z.infer<typeof categoryDtoSchema>
