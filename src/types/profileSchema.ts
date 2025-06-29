import { z } from 'zod'

export const profileSchema = z.object({
  name: z.string().min(1, 'El nombre es obligatorio'),
  lastName: z.string().min(1, 'El apellido es obligatorio'),
  email: z.string().email('Email inválido'),
  birthday: z
    .string()
    .optional()
    .refine((val) => !val || !Number.isNaN(Date.parse(val)), {
      message:
        'La fecha de nacimiento debe ser una fecha válida en formato YYYY-MM-DD',
    }),
  gender: z.string().optional(),
  national: z.string().optional(),
  photo: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  typeProfileId: z.string().optional(),
  typeDocument: z.string().optional(),
  numberDocument: z.string().optional(),
})

export type ProfileForm = z.infer<typeof profileSchema>
