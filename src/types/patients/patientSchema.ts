import { z } from 'zod'

export const patientCreateSchema = z
  .object({
    userId: z.number().int().optional(),
    name: z.string().min(1, { message: 'requerido' }),
    lastName: z.string().min(1, { message: 'requerido' }),
    email: z.string().email(),
    phone: z.string().optional(),
    birthDate: z.string().optional(),
    birthday: z.string().optional(),
    gender: z.string().optional(),
    address: z.string().optional(),
    photo: z
      .union([z.string(), z.instanceof(File), z.instanceof(Blob)])
      .optional(),
    emergencyContact: z.string().min(1, { message: 'requerido' }),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Tipo de sangre inválido' }),
    }),
    allergies: z.string().nullable().optional(),
    chronic_conditions: z.string().nullable().optional(),
  })
  .transform((data) => {
    const { birthDate, photo, ...rest } = data
    return {
      ...rest,
      birthday: data.birthday || birthDate,
      photo: photo as any,
    }
  })

export type PatientCreate = z.infer<typeof patientCreateSchema>

export const patientUpdateSchema = z.object({
  emergencyContact: z.string().min(1, { message: 'requerido' }).optional(),
  bloodType: z
    .enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Tipo de sangre inválido' }),
    })
    .optional(),
  allergies: z.string().nullable().optional(),
  chronic_conditions: z.string().nullable().optional(),

  name: z.string().min(1, { message: 'requerido' }).optional(),
  lastName: z.string().min(1, { message: 'requerido' }).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  birthday: z.string().optional(),
  gender: z.string().optional(),
  address: z.string().optional(),
  photo: z
    .union([z.string(), z.instanceof(File), z.instanceof(Blob)])
    .optional(),
})

export type PatientUpdateDto = z.infer<typeof patientUpdateSchema>

export const patientSchema = z.object({
  id: z.number().int(),
  profileId: z.number().int(),
  emergencyContact: z.string().min(1, { message: 'requerido' }),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Tipo de sangre inválido' }),
  }),
  allergies: z.string().nullable().optional(),
  chronic_conditions: z.string().nullable().optional(),
  deleted: z.boolean().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  profile: z.object({
    id: z.number().int(),
    name: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    phone: z.string().nullable().optional(),
    photo: z.string().nullable().optional(),
    birthday: z.string().nullable().optional(),
    address: z.string().nullable().optional(),
  }),
})

export type Patient = z.infer<typeof patientSchema>

export const patientsSchema = patientSchema
export type Patients = Patient

export const patientsCreateSchema = z.object({
  profileId: z.number().int().positive({ message: 'ID de perfil inválido' }),
  emergencyContact: z.string().min(1, { message: 'requerido' }).trim(),
  bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
    errorMap: () => ({ message: 'Tipo de sangre inválido' }),
  }),
  allergies: z.string().trim().nullable().optional(),
  chronic_conditions: z.string().trim().nullable().optional(),
})

export type PatientsCreateDto = z.infer<typeof patientsCreateSchema>

export const patientsUpdateSchema = z
  .object({
    id: z.number().int().positive(),
    profileId: z.number().int().positive({ message: 'ID de perfil inválido' }),
    emergencyContact: z.string().min(1, { message: 'requerido' }).trim(),
    bloodType: z.enum(['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'], {
      errorMap: () => ({ message: 'Tipo de sangre inválido' }),
    }),
    allergies: z.string().trim().nullable().optional(),
    chronic_conditions: z.string().trim().nullable().optional(),
  })
  .partial()
  .required({ id: true })

export type PatientsUpdateDto = z.infer<typeof patientsUpdateSchema>
