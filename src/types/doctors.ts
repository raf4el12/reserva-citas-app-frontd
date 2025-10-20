//import { z } from 'zod'
//
//
//export const doctorSchemaBase = {
//  licenseNumber: z.string().min(1, 'El número de licencia es obligatorio'),
//  resume: z.string().optional().nullable(),
//  profileId: z.number().positive().int(),
//  specialties: z.array(z.object({
//    id: z.number().positive(),
//    name: z.string(),
//  })).optional(),
//}
//
//
//export const doctorSchema = z.object({
//  id: z.number().positive(),
//  deleted: z.boolean(),
//  ...doctorSchemaBase,
//  profile: z.object({
//    id: z.number().positive(),
//    name: z.string(),
//    lastName: z.string(),
//    email: z.string().email('Email inválido'),
//  }),
//})
//
//
//export const DoctorSchemaDto = z.object({
//  ...doctorSchemaBase,
//  specialties: z.array(z.number()).optional(),
//});
//
//export type Doctor = z.infer<typeof doctorSchema>
//export type CreateDoctorDto = z.infer<typeof DoctorSchemaDto>
//
//
//export type UpdateDoctorDto = CreateDoctorDto

//import { z } from 'zod'
//
//const doctorSchemaBase = {
//  profileId: z.number().int(),
//  licenseNumber: z.string().min(1, { message: 'requerido' }),
//  resume: z.string().nullable().optional(),
//  specialtyIds: z
//    .array(z.number().int())
//    .min(1, { message: 'Debe seleccionar al menos una especialidad' }),
//}
//
//export const doctorSchema = z.object({
//  ...doctorSchemaBase,
//  id: z.number().int(),
//  profile: z.object({
//    id: z.number().int(),
//    lastName: z.string(),
//    name: z.string(),
//  }),
//})
//
//export type Doctor = z.infer<typeof doctorSchema>
//
//export const doctorCreateSchema = z.object({
//  ...doctorSchemaBase,
//})
//
//export type DoctorCreateDto = z.infer<typeof doctorCreateSchema>
//
//export const doctorUpdateSchema = z.object({
//  id: z.number().int(),
//  ...doctorSchemaBase,
//})
//
//export type DoctorUpdateDto = z.infer<typeof doctorUpdateSchema>

import { z } from 'zod'

// Base schema for doctor properties (excluding ID and relations for now)
const doctorSchemaBase = {
  profileId: z.number().int(),
  licenseNumber: z.string().min(1, { message: 'requerido' }),
  resume: z.string().nullable().optional(),
  // specialtyIds is part of the input DTO, not necessarily part of the fetched Doctor object
  // if you explicitly fetch relations via include: { specialties: { include: { specialty: true } } }
  // We keep it here because it's part of your DoctorCreateDto schema
}

// --- New Zod Schemas for DoctorsSpecialties (the join table) ---

// Schema for creating a DoctorsSpecialty entry
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
  createdAt: z.string().datetime(), // Assuming datetime string format
  // Optional: If you include related doctor/specialty objects in the DoctorsSpecialty response
  doctor: z.object({ id: z.number().int() }).optional(), // Only id if you just connect
  specialty: z.object({ id: z.number().int(), name: z.string() }).optional(), // Basic specialty info
})

export type DoctorsSpecialty = z.infer<typeof doctorsSpecialtySchema>

export const doctorSchema = z.object({
  ...doctorSchemaBase,
  id: z.number().int(),
  profile: z.object({
    id: z.number().int(),
    lastName: z.string(),
    name: z.string(),
  }),

  specialties: z.array(doctorsSpecialtySchema).optional(),
})

export type Doctor = z.infer<typeof doctorSchema>

export const doctorCreateSchema = z.object({
  ...doctorSchemaBase,
})

export type DoctorCreateDto = z.infer<typeof doctorCreateSchema>

export const doctorUpdateSchema = z.object({
  id: z.number().int(),
  profileId: z.number().int().optional(),
  licenseNumber: z.string().min(1, { message: 'requerido' }).optional(),
  resume: z.string().nullable().optional(),

  specialtyIds: z
    .array(z.number().int())
    .min(1, { message: 'Debe seleccionar al menos una especialidad' })
    .optional(),
})

export type DoctorUpdateDto = z.infer<typeof doctorUpdateSchema>
