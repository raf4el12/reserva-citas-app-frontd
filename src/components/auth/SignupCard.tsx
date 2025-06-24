import { zodResolver } from '@hookform/resolvers/zod'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { useSignup } from '../../hook/auth/useSignup'
import { userSignupSchema } from '../../types/auth'
import type { SignupDto } from '../../types/auth'
import { Role } from '../../types/user'
import FormFieldError from '../commons/FormFieldError'
import LayoutAuth from './LayoutAuth'

const SignupCard = () => {
  const navigate = useNavigate()
  const signupMutation = useSignup()
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignupDto>({
    resolver: zodResolver(userSignupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: Role.USER,
    },
  })

  const onSubmit = (data: SignupDto) => {
    signupMutation.mutate(data, {
      onSuccess: () => navigate('/auth/login'),
      onError: (err: any) => {
        setError('root', {
          message: err?.message || 'Error al registrar la cuenta',
        })
      },
    })
  }

  return (
    <LayoutAuth icon={<AccountCircleIcon fontSize="inherit" />}>
      <h2 className="text-2xl font-bold text-center mb-1 text-primary">
        Crear cuenta
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Completa el formulario para registrarte
      </p>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="name">
            Nombre
          </label>
          <input
            id="name"
            {...register('name')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.name ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Nombre"
          />
          {errors.name && (
            <FormFieldError>{errors.name.message}</FormFieldError>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            {...register('email')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.email ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="r@ejemplo.com"
          />
          {errors.email && (
            <FormFieldError>{errors.email.message}</FormFieldError>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.password ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Contraseña"
          />
          {errors.password && (
            <FormFieldError>{errors.password.message}</FormFieldError>
          )}
        </div>
        <div>
          <label
            className="block text-sm font-medium mb-1"
            htmlFor="confirmPassword"
          >
            Confirmar contraseña
          </label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
            className={`w-full rounded-md border px-3 py-2 bg-gray-50 ${
              errors.confirmPassword ? 'border-red-400' : 'border-gray-300'
            }`}
            placeholder="Confirmar tu contraseña"
          />
          {errors.confirmPassword && (
            <FormFieldError>{errors.confirmPassword.message}</FormFieldError>
          )}
        </div>
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-black text-white rounded-md py-2 font-semibold mt-2 hover:bg-gray-900 transition disabled:opacity-60"
        >
          {signupMutation.isPending ? 'Registrando...' : 'Registrarse'}
        </button>
        {errors.root && <FormFieldError>{errors.root.message}</FormFieldError>}
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        ¿Ya tienes cuenta?{' '}
        <a href="/auth/login" className="underline hover:text-primary">
          Inicia sesión aquí
        </a>
      </div>
    </LayoutAuth>
  )
}

export default SignupCard
