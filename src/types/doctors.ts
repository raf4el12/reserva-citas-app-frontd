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


export const doctorUpdateSchema = z.object({
  id: z.number().int(),  
  ...doctorSchemaBase,
})

export type DoctorUpdateDto = z.infer<typeof doctorUpdateSchema>