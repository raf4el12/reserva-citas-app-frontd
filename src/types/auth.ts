import z from 'zod'
import { Role } from './user'

export const userSignupSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.nativeEnum(Role),
})

export type SignupDto = z.infer<typeof userSignupSchema>
