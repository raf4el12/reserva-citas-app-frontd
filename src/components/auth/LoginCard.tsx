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
import type React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useLoginMutation } from '../../hook/auth/useLogin'
import logo from '../../images/LOGO-SISOL.png' // Ajusta la ruta según tu estructura
import { Link as RouterLink } from 'react-router-dom'
import Link from '@mui/material/Link'

const LoginCard = () => {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const loginMutation = useLoginMutation()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await loginMutation.mutateAsync({ email, password })

    navigate('/turno-home')
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
        <Box display="flex" justifyContent="center" mb={2}>
          <img
            src={logo}
            alt="Logo"
            style={{
              maxWidth: 120,
              borderRadius: '50%',
              boxShadow: '0 4px 16px rgba(25, 118, 210, 0.15)',
              border: '3px solid #1976d2',
              background: '#fff',
              padding: 8,
            }}
          />
        </Box>
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
          Iniciar sesión
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
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
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={loginMutation.isPending}
            fullWidth
            sx={{
              mt: 2,
              fontWeight: 'bold',
              letterSpacing: 1,
              py: 1.5,
              fontSize: '1rem',
              boxShadow: '0 2px 8px rgba(25, 118, 210, 0.15)',
            }}
          >
            {loginMutation.isPending ? (
              <CircularProgress size={24} />
            ) : (
              'Entrar'
            )}
          </Button>
          {loginMutation.isError && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {loginMutation.error instanceof Error
                ? loginMutation.error.message
                : 'Error al iniciar sesión'}
            </Alert>
          )}
          {loginMutation.isSuccess && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Sesión iniciada correctamente!
            </Alert>
          )}
        </Box>
        <Box mt={3} textAlign="center">
          <Typography variant="body2">
            ¿No tienes cuenta?{' '}
            <Link component={RouterLink} to="/auth/register" underline="hover">
              Regístrate aquí
            </Link>
          </Typography>
        </Box>
      </Paper>
    </Container>
  )
}

export default LoginCard