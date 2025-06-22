import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSignup } from '../../hook/auth/useSignup'
import { Role } from '../../types/user'
import LayoutAuth from './LayoutAuth'

const SignupCard = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const signupMutation = useSignup()

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.endsWith('.com')
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!name || !email || !password) {
      setError('Todos los campos son obligatorios')
      return
    }
    if (!isValidEmail(email)) {
      setError('Ingresa un correo electrónico válido que termine en .com')
      return
    }
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }

    signupMutation.mutate(
      { name, email, password, role: Role.USER },
      {
        onSuccess: () => {
          setSuccess(true)
          setTimeout(() => navigate('/auth/login'), 1500)
        },
        onError: (err: any) => {
          setError(err?.message || 'Error al registrar la cuenta')
        },
      }
    )
  }

  return (
    <LayoutAuth>
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-1 text-primary">
          Crear cuenta
        </h2>
        <p className="text-gray-500 text-center mb-6 text-sm">
          Completa el formulario para registrarte
        </p>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="name">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
              placeholder="Tu nombre"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
              placeholder="m@ejemplo.com"
            />
          </div>
          <div>
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
              placeholder="Contraseña"
            />
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
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-gray-50"
              placeholder="Repite tu contraseña"
            />
          </div>
          <button
            type="submit"
            disabled={signupMutation.isPending}
            className="w-full bg-black text-white rounded-md py-2 font-semibold mt-2 hover:bg-gray-900 transition disabled:opacity-60"
          >
            {signupMutation.isPending ? 'Registrando...' : 'Registrarse'}
          </button>
          {error && (
            <div className="bg-red-100 text-red-700 rounded px-4 py-2 mt-2 text-center text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-100 text-green-700 rounded px-4 py-2 mt-2 text-center text-sm">
              ¡Cuenta creada correctamente! Redirigiendo...
            </div>
          )}
        </form>
        <div className="mt-6 text-center text-sm text-gray-600">
          ¿Ya tienes cuenta?{' '}
          <a href="/auth/login" className="underline hover:text-primary">
            Inicia sesión aquí
          </a>
        </div>
      </div>
    </LayoutAuth>
  )
}

export default SignupCard
