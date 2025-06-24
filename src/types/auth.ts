import z from 'zod'
import { Role } from './user'

export const userSignupSchema = z
  .object({
    name: z.string().min(1, 'El nombre es obligatorio'),
    email: z
      .string()
      .email('El email debe ser válido')
      .min(1, 'El email es obligatorio'),
    password: z
      .string()
      .min(6, 'La contraseña debe tener al menos 6 caracteres')
      .regex(/[a-z]/, 'La contraseña debe tener al menos una letra minúscula')
      .regex(/[A-Z]/, 'La contraseña debe tener al menos una letra mayúscula')
      .regex(/[0-9]/, 'La contraseña debe tener al menos un número'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña'),
    role: z.nativeEnum(Role),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden',
    path: ['confirmPassword'],
  })
export type SignupDto = z.infer<typeof userSignupSchema>
