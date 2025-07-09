import { z } from 'zod'

const scheduleSchemaBase = {
  doctorId: z.number().int(),
  specialtyId: z.number().int(),
  scheduleDate: z.string().datetime(),
  timeFrom: z.string().datetime(),
  timeTo: z.string().datetime(),
  createdAt: z.date().default(new Date()),
  updatedAt: z.date().optional(),
}

export const scheduleCreateSchema = z.object({
  ...scheduleSchemaBase,
})

export type ScheduleCreateDto = z.infer<typeof scheduleCreateSchema>

export const scheduleSchema = z.object({
  id: z.number().int(),
  ...scheduleSchemaBase,
  doctor: z.object({ id: z.number().int() }).optional(),
  specialty: z.object({ id: z.number().int() }).optional(),
  appointments: z.array(z.object({})).optional(),
})

export const scheduleWithDates = scheduleSchema.transform((data) => ({
  ...data,
  scheduleDate: new Date(data.scheduleDate),
  timeFrom: new Date(data.timeFrom),
  timeTo: new Date(data.timeTo),
}))

export type Schedule = z.infer<typeof scheduleWithDates>

export const scheduleUpdateSchema = z.object({
  id: z.number().int(),
  doctorId: z.number().int().optional(),
  specialtyId: z.number().int().optional(),
  scheduleDate: z.string().datetime().optional(),
  timeFrom: z.string().datetime().optional(),
  timeTo: z.string().datetime().optional(),
  updatedAt: z.date().optional(),
  doctor: z.object({ id: z.number().int() }).optional(),
  specialty: z.object({ id: z.number().int() }).optional(),
  appointments: z.array(z.object({})).optional(),
})

export const scheduleUpdateWithDates = scheduleUpdateSchema.transform(
  (data) => ({
    ...data,
    scheduleDate: data.scheduleDate ? new Date(data.scheduleDate) : undefined,
    timeFrom: data.timeFrom ? new Date(data.timeFrom) : undefined,
    timeTo: data.timeTo ? new Date(data.timeTo) : undefined,
  })
)

export type ScheduleUpdateDto = z.infer<typeof scheduleUpdateWithDates>
