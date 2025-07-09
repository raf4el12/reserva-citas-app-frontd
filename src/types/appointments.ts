//import { z } from 'zod'
//
//const appointmentSchemaBase = {
//  patientId: z.number().int(),
//  scheduleId: z.number().int(),
//  reason: z.string().nullable().optional(),
//  notes: z.string().nullable().optional(),
//  status: z.string(),
//  paymentStatus: z.string(),
//  deleted: z.boolean().default(false),
//  createdAt: z.date().default(new Date()),
//  updatedAt: z.date().optional(),
//}
//
//export const appointmentCreateSchema = z.object({
//  ...appointmentSchemaBase,
//})
//
//export type AppointmentCreateDto = z.infer<typeof appointmentCreateSchema>
//
//export const appointmentSchema = z.object({
//  id: z.number().int(),
//  ...appointmentSchemaBase,
//  patient: z.object({ id: z.number().int() }).optional(),
//  schedule: z.object({ id: z.number().int() }).optional(),
//  clinicalNotes: z.array(z.object({})).optional(),
//})
//
//export type Appointment = z.infer<typeof appointmentSchema>
//
//export const appointmentUpdateSchema = z.object({
//  id: z.number().int(),
//  patientId: z.number().int().optional(),
//  scheduleId: z.number().int().optional(),
//  reason: z.string().nullable().optional(),
//  notes: z.string().nullable().optional(),
//  status: z.string().optional(),
//  paymentStatus: z.string().optional(),
//  deleted: z.boolean().default(false).optional(),
//  updatedAt: z.date().optional(),
//  patient: z.object({ id: z.number().int() }).optional(),
//  schedule: z.object({ id: z.number().int() }).optional(),
//  clinicalNotes: z.array(z.object({})).optional(),
//})
//
//export type AppointmentUpdateDto = z.infer<typeof appointmentUpdateSchema>


import { z } from 'zod';

// Esquema base para la cita
const appointmentSchemaBase = {
  patientId: z.number().int(),
  scheduleId: z.number().int(),
  reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.string(),
  paymentStatus: z.string(),
  deleted: z.boolean().default(false),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().optional(),
};

// Esquema para crear una cita
export const appointmentCreateSchema = z.object({
  ...appointmentSchemaBase,
});

export type AppointmentCreateDto = z.infer<typeof appointmentCreateSchema>;

// Esquema para la cita con relaciones detalladas
export const appointmentSchema = z.object({
  id: z.number().int(),
  ...appointmentSchemaBase,
  patient: z.object({
    id: z.number().int(),
    profile: z.object({
      name: z.string(),
      lastName: z.string(),
    }),  // Hacer obligatorio el perfil del paciente
  }),  // Relación obligatoria con paciente y su perfil
  schedule: z.object({
    id: z.number().int(),
    scheduleDate: z.date(),  // Fecha y hora de la cita
    specialty: z.object({
      id: z.number().int(),
      name: z.string(),
    }),  // Relación obligatoria con especialidad
    doctor: z.object({
      id: z.number().int(),
      profile: z.object({
        name: z.string(),
        lastName: z.string(),
      }),  // Relación obligatoria con médico y su perfil
    }),
  }),  // Relación obligatoria con el horario
  clinicalNotes: z.array(z.object({})).optional(),
});

export type Appointment = z.infer<typeof appointmentSchema>;

// Esquema para la actualización de cita
export const appointmentUpdateSchema = z.object({
  id: z.number().int(),
  patientId: z.number().int().optional(),
  scheduleId: z.number().int().optional(),
  reason: z.string().nullable().optional(),
  notes: z.string().nullable().optional(),
  status: z.string().optional(),
  paymentStatus: z.string().optional(),
  deleted: z.boolean().default(false).optional(),
  updatedAt: z.date().optional(),
  patient: z.object({
    id: z.number().int(),
  }).optional(),
  schedule: z.object({
    id: z.number().int(),
  }).optional(),
  clinicalNotes: z.array(z.object({})).optional(),
});

export type AppointmentUpdateDto = z.infer<typeof appointmentUpdateSchema>;
