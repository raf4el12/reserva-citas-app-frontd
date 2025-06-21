import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Container,
  MenuItem,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

const initialForm = {
  patientId: '',
  scheduleId: '',
  reason: '',
  status: 'PENDIENTE',
  paymentStatus: 'PENDIENTE',
}

const statusOptions = [
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'CONFIRMADO', label: 'Confirmado' },
  { value: 'CANCELADO', label: 'Cancelado' },
]

const paymentStatusOptions = [
  { value: 'PENDIENTE', label: 'Pendiente' },
  { value: 'PAGADO', label: 'Pagado' },
]

const AppointmentForm = () => {
  const [form, setForm] = useState(initialForm)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      // Aquí irá tu hook de post para crear la cita
      // Por ahora solo simula éxito:
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setSuccess(true)
      setForm(initialForm)
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Error desconocido')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={8}
        sx={{
          p: 4,
          mt: 8,
          borderRadius: 4,
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        <Typography
          variant="h5"
          mb={2}
          align="center"
          fontWeight="bold"
          color="#1976d2"
        >
          Sacar una cita
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={2}
        >
          <TextField
            label="ID del paciente"
            name="patientId"
            value={form.patientId}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="ID del horario"
            name="scheduleId"
            value={form.scheduleId}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Motivo"
            name="reason"
            value={form.reason}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            select
            label="Estado"
            name="status"
            value={form.status}
            onChange={handleChange}
            required
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="Estado de pago"
            name="paymentStatus"
            value={form.paymentStatus}
            onChange={handleChange}
            required
            fullWidth
          >
            {paymentStatusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            sx={{
              mt: 2,
              fontWeight: 'bold',
              letterSpacing: 1,
              py: 1.5,
              fontSize: '1rem',
            }}
          >
            {loading ? <CircularProgress size={24} /> : 'Crear cita'}
          </Button>
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              ¡Cita creada correctamente!
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  )
}

export default AppointmentForm
