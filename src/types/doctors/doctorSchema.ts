import { z } from 'zod'

export const doctorCreateSchema = z
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
    licenseNumber: z.string().min(1, { message: 'requerido' }),
    resume: z.string().nullable().optional(),
    specialtyIds: z.array(z.union([z.number(), z.string()])).optional(),
  })
  .transform((data) => {
    const { birthDate, photo, ...rest } = data
    return {
      ...rest,
      birthday: data.birthday || birthDate,
      photo: photo as any,
    }
  })

export type DoctorCreate = z.infer<typeof doctorCreateSchema>

export const doctorUpdateSchema = z.object({
  licenseNumber: z.string().min(1, { message: 'requerido' }).optional(),
  resume: z.string().nullable().optional(),
  specialtyIds: z.array(z.number().int()).optional(),

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

export type DoctorUpdateDto = z.infer<typeof doctorUpdateSchema>

const specialtyInDoctor = z.object({
  id: z.number().int(),
  specialty: z.object({
    id: z.number().int(),
    name: z.string(),
    description: z.string().nullable().optional(),
    icon: z.string().nullable().optional(),
    duration: z.number().nullable().optional(),
    price: z.number().nullable().optional(),
  }),
})

export const doctorSchema = z.object({
  id: z.number().int(),
  profileId: z.number().int(),
  licenseNumber: z.string().min(1, { message: 'requerido' }),
  resume: z.string().nullable().optional(),
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
  specialties: z.array(specialtyInDoctor).optional(),
})

export type Doctor = z.infer<typeof doctorSchema>

export const doctorsSpecialtyCreateSchema = z.object({
  doctorId: z.number().int(),
  specialtyId: z.number().int(),
})

export type DoctorsSpecialtyCreateDto = z.infer<
  typeof doctorsSpecialtyCreateSchema
>

export const doctorsSpecialtySchema = z.object({
  id: z.number().int(),
  doctorId: z.number().int(),
  specialtyId: z.number().int(),
  deleted: z.boolean().default(false),
  createdAt: z.string().datetime(),
  specialty: z
    .object({
      id: z.number().int(),
      name: z.string(),
      description: z.string().nullable().optional(),
    })
    .optional(),
})

export type DoctorsSpecialty = z.infer<typeof doctorsSpecialtySchema>
