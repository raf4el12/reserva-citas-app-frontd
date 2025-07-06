import { z } from 'zod'

const patientsSchemaBase = {
  profileId: z.number().int(),
  emergencyContact: z.string().min(1, { message: 'requerido' }),
  bloodType: z.string().min(1, { message: 'requerido' }),
  allergies: z.string().nullable().optional(),
  chronic_conditions: z.string().nullable().optional(),
}

export const patientsSchema = z.object({
  ...patientsSchemaBase,
  id: z.number().int(),
  profile: z.object({
    id: z.number().int(),
    lastName: z.string(),
    name: z.string(),
  }),
})

export type Patients = z.infer<typeof patientsSchema>

export const patientsCreateSchema = z.object({
  ...patientsSchemaBase,
})

export type PatientscCreateDto = z.infer<typeof patientsCreateSchema>

export const patientsUpdateSchema = z.object({
  id: z.number().int(),
  ...patientsSchemaBase,
})

export type PatientsUpdateDto = z.infer<typeof patientsUpdateSchema>
