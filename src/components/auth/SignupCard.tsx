import { zodResolver } from '@hookform/resolvers/zod'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import { useSignup } from '../../hook/auth/useSignup'
import { type SignupDto, userSignupSchema } from '../../types/auth'
import { Role } from '../../types/user'
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
      role: Role.USER,
    },
  })

  const onSubmit = (data: SignupDto) => {
    if (data.password !== data.confirmPassword) {
      setError('confirmPassword', { message: 'Las contraseñas no coinciden' })
      return
    }
    signupMutation.mutate(data, {
      onSuccess: () => {
        navigate('/auth/login')
      },
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
            {...register('name', { required: 'El nombre es obligatorio' })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
            placeholder="Tu nombre"
          />
          {errors.name && (
            <span className="text-xs text-red-600">{errors.name.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            {...register('email', { required: 'El correo es obligatorio' })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
            placeholder="m@ejemplo.com"
          />
          {errors.email && (
            <span className="text-xs text-red-600">{errors.email.message}</span>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="password">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'La contraseña es obligatoria',
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
            placeholder="Contraseña"
          />
          {errors.password && (
            <span className="text-xs text-red-600">
              {errors.password.message}
            </span>
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
            {...register('confirmPassword', {
              required: 'Confirma tu contraseña',
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
            placeholder="Repite tu contraseña"
          />
          {errors.confirmPassword && (
            <span className="text-xs text-red-600">
              {errors.confirmPassword.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-black text-white rounded-md py-2 font-semibold mt-2 hover:bg-gray-900 transition disabled:opacity-60"
        >
          {signupMutation.isPending ? 'Registrando...' : 'Registrarse'}
        </button>
        {errors.root && (
          <div className="bg-red-100 text-red-700 rounded px-4 py-2 mt-2 text-center text-sm break-words">
            {errors.root.message}
          </div>
        )}
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
