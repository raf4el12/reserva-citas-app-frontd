import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useSignup } from '../../hook/auth/useSignup'
import { Role } from '../../types/user'

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
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(4px)',
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          sx={{
            fontWeight: 'bold',
            color: '#1976d2',
            letterSpacing: 1,
            textShadow: '0 2px 8px rgba(25, 118, 210, 0.08)',
          }}
        >
          Crear cuenta
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            sx={{
              background: '#f5faff',
              borderRadius: 2,
            }}
          />
          <TextField
            label="Correo electrónico"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            fullWidth
            sx={{
              background: '#f5faff',
              borderRadius: 2,
            }}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            fullWidth
            sx={{
              background: '#f5faff',
              borderRadius: 2,
            }}
          />
          <TextField
            label="Confirmar contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            fullWidth
            sx={{
              background: '#f5faff',
              borderRadius: 2,
            }}
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={signupMutation.isPending}
            sx={{
              mt: 2,
              fontWeight: 'bold',
              letterSpacing: 1,
              py: 1.5,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
            }}
          >
            {signupMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              'Registrarse'
            )}
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Cuenta creada correctamente! Redirigiendo...
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default SignupCard
