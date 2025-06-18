import { z } from 'zod'

const envSchema = z.object({
  VITE_PORT: z.coerce.number().default(3000),
  VITE_API_BACKEND_URL: z.string().url(),
})

const envs = envSchema.safeParse(import.meta.env)

if (!envs.success) {
  console.error(' Invalid environment variables:', envs.error.format())
  throw new Error('Invalid environment variables')
}

const Envs = envs.data

export default Envs
