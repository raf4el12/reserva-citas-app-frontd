import { Box, Typography } from '@mui/material'

const CommonPage = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        gap: 2,
      }}
    >
      <svg
        width="100"
        height="100"
        viewBox="0 0 100 100"
        fill="none"
        role="img"
        aria-label="Ilustración de construcción"
      >
        <rect x="15" y="60" width="70" height="20" rx="5" fill="#FBBF24" />
        <rect x="30" y="40" width="40" height="20" rx="4" fill="#FDE68A" />
        <rect x="45" y="25" width="10" height="15" rx="2" fill="#F59E42" />
        <circle cx="30" cy="85" r="5" fill="#F59E42" />
        <circle cx="70" cy="85" r="5" fill="#F59E42" />
      </svg>
      <Typography variant="h6" fontWeight={700} align="center">
        Página en construcción
      </Typography>
      <Typography variant="body2" color="text.secondary" align="center">
        Estamos trabajando para traerte esta sección pronto.
      </Typography>
    </Box>
  )
}

export default CommonPage