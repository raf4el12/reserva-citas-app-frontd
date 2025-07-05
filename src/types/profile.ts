import { z } from 'zod'

const profileSchemaBase = {
  name: z.string().min(1, { message: 'requerido' }),
  lastName: z.string().min(1, { message: 'requerido' }),
  email: z.string().email(),
  birthday: z.string().nullable().optional(),
  gender: z.string().nullable().optional(),
  national: z.string().nullable().optional(),
  photo: z.string().nullable().optional(),
  phone: z.string().nullable().optional(),
  address: z.string().nullable().optional(),
  typeProfileId: z.number().int().nullable().optional(),
  typeDocument: z.string().nullable().optional(),
  numberDocument: z.string().nullable().optional(),
}

export const profileSchema = z.object({
  ...profileSchemaBase,
  id: z.number().int(),
  userId: z.number().int().optional(),
})

export type Profile = z.infer<typeof profileSchema>

export const profileCreateSchema = z.object({
  ...profileSchemaBase,
})

export type ProfileCreateDto = z.infer<typeof profileCreateSchema>