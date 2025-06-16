import Layout from "../components/Layout"
import { Box, Button, Container, Typography, Grid, Paper } from '@mui/material';

const features = [
  {
    title: 'Reserva Fácil',
    description: 'Agenda tus citas en segundos desde cualquier dispositivo.',
  },
  {
    title: 'Recordatorios Automáticos',
    description: 'Recibe notificaciones para que nunca olvides una cita importante.',
  },
  {
    title: 'Gestión de Clientes',
    description: 'Administra tus clientes y su historial de reservas de manera sencilla.',
  },
];

const Main = () => {
  return (
    <Layout>
      <Container maxWidth="md" sx={{ mt: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography variant="h2" fontWeight="bold" gutterBottom>
            Reserva tu cita en segundos
          </Typography>
          <Typography variant="h5" color="text.secondary" mb={4}>
            La forma más rápida y sencilla de gestionar tus reservas y clientes.
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            href="/auth/login"
          >
            Comenzar ahora
          </Button>
        </Box>
        <Grid container spacing={4}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Paper elevation={3} sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Box mt={8} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            &copy; {new Date().getFullYear()} ReservaCitasApp. Todos los derechos reservados.
          </Typography>
        </Box>
      </Container>
    </Layout>
  )
}

export default Main