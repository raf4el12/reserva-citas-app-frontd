import LockOpenIcon from '@mui/icons-material/LockOpen'
import { useState } from 'react'
import { Link } from 'react-router-dom'

import { useLoginMutation } from '../../hook/auth/useLogin'
import LayoutAuth from './LayoutAuth'

const LoginCard = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await loginMutation.mutateAsync(
      { email, password },
      {
        onSuccess: (data) => {
          const { userId } = data
          localStorage.setItem('userId', userId)

          window.location.href = '/admin'
        },
      }
    )
  }

  return (
    <LayoutAuth icon={<LockOpenIcon fontSize="inherit" />}>
      <h2 className="text-2xl font-bold text-center mb-1">
        Inicia sesión en tu cuenta
      </h2>
      <p className="text-gray-500 text-center mb-6 text-sm">
        Ingresa tu correo y contraseña para acceder
      </p>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium mb-1" htmlFor="email">
            Correo electrónico
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
            placeholder="m@ejemplo.com"
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="text-sm font-medium" htmlFor="password">
              Contraseña
            </label>
            {/* <Link to="/auth/forgot" className="text-xs text-primary hover:underline">
                ¿Olvidaste tu contraseña?
              </Link> */}
          </div>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
          />
        </div>
        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-black text-white rounded-md py-2 font-semibold mt-2 hover:bg-gray-900 transition disabled:opacity-60"
        >
          {loginMutation.isPending ? 'Ingresando...' : 'Ingresar'}
        </button>
        {loginMutation.isError && (
          <div className="bg-red-100 text-red-700 rounded px-4 py-2 mt-2 text-center text-sm">
            {loginMutation.error instanceof Error
              ? loginMutation.error.message
              : 'Error al iniciar sesión'}
          </div>
        )}
        {loginMutation.isSuccess && (
          <div className="bg-green-100 text-green-700 rounded px-4 py-2 mt-2 text-center text-sm">
            ¡Sesión iniciada correctamente!
          </div>
        )}
      </form>
      <div className="mt-6 text-center text-sm text-gray-600">
        ¿No tienes cuenta?{' '}
        <Link to="/auth/signup" className="underline hover:text-primary">
          Regístrate aquí
        </Link>
      </div>
    </LayoutAuth>
  )
}

export default LoginCard
