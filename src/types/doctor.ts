import { z } from 'zod'

const doctorSchemaBase = {
  profileId: z.number().int(),
  licenseNumber: z.string().min(1, { message: 'requerido' }),
  resume: z.string().nullable().optional(),
}

export const doctorSchema = z.object({
  ...doctorSchemaBase,
  id: z.number().int(),
  profile: z.object({
    id: z.number().int(),
    lastName: z.string(),
    name: z.string(),
  }),
})

export type Doctor = z.infer<typeof doctorSchema>

export const doctorCreateSchema = z.object({
  ...doctorSchemaBase,
})

export type DoctorCreateDto = z.infer<typeof doctorCreateSchema>
