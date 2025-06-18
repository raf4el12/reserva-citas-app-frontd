import { Box, Button, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import logo from '../../images/LOGO-SISOL.png'
// Solo importa si lo usas en esta ruta

const TurnoHome = () => {
  const navigate = useNavigate()

  const handleSacarCita = () => {
    navigate('/turno-home/sacar-cita')
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      {/* Lado izquierdo: Logo e info */}
      <Box
        sx={{
          width: { xs: '100%', md: '35%' },
          minWidth: 260,
          maxWidth: 400,
          bgcolor: '#232733',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          py: 4,
          px: 2,
          height: '100vh',
          boxSizing: 'border-box',
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            maxWidth: 220,
            width: '100%',
          }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{
              width: '500px',
              maxWidth: '120%',
              marginBottom: 16,
              display: 'block',
            }}
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ letterSpacing: 1, textAlign: 'center' }}
          >
            reservaCita
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{ mt: 1, opacity: 0.8, textAlign: 'center' }}
          >
            Simple. Sin esperas.
          </Typography>
        </Box>
      </Box>

      {/* Lado derecho: Botones */}
      <Box
        sx={{
          flex: 1,
          bgcolor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
        }}
      >
        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{
              mb: 3,
              bgcolor: '#2de6b0',
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: 22,
              borderRadius: 3,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#24cfa0' },
              py: 1.5,
            }}
            onClick={handleSacarCita}
          >
            Sacar una cita
          </Button>
          <Button
            variant="contained"
            fullWidth
            sx={{
              bgcolor: '#2de6b0',
              color: '#1976d2',
              fontWeight: 'bold',
              fontSize: 22,
              borderRadius: 3,
              boxShadow: 'none',
              '&:hover': { bgcolor: '#24cfa0' },
              py: 1.5,
            }}
          >
            Ver mis citas
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default TurnoHome