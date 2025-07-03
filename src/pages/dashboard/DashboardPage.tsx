import { Box, Paper, Typography } from '@mui/material'

const DashboardPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          width: '100%',
          maxWidth: 420,
        }}
      >
        <svg
          width="120"
          height="120"
          viewBox="0 0 120 120"
          fill="none"
          role="img"
          aria-label="Ilustración de dashboard"
        >
          <title>Ilustración de dashboard</title>
          <rect x="10" y="30" width="100" height="60" rx="12" fill="#E0E7FF" />
          <rect x="25" y="45" width="70" height="30" rx="6" fill="#6366F1" />
          <circle cx="60" cy="60" r="8" fill="#fff" />
          <rect x="40" y="80" width="40" height="8" rx="4" fill="#A5B4FC" />
        </svg>
        <Typography variant="h5" fontWeight={700} align="center">
          ¡Bienvenido al Panel de Administración!
        </Typography>
        <Typography variant="body1" color="text.secondary" align="center">
          Aquí podrás visualizar estadísticas, gestionar citas médicas y
          administrar la información de tu clínica.
        </Typography>
      </Paper>
    </Box>
  )
}

export default DashboardPage
