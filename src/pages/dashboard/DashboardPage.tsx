import {
  AccessTime,
  CalendarToday,
  Cancel,
  CheckCircle,
  LocalHospital,
  People,
  Schedule,
  TrendingUp,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@mui/material'
import React from 'react'

interface StatCardProps {
  title: string
  value: string | number
  icon: React.ReactNode
  color: string
  subtitle?: string
}

interface Appointment {
  id: number
  patient: string
  doctor: string
  time: string
  status: 'confirmed' | 'pending' | 'cancelled'
  specialty: string
}

interface AppointmentStats {
  confirmed: number
  pending: number
  cancelled: number
}

const DashboardPage: React.FC = () => {
  const stats = {
    totalPatients: 1247,
    totalDoctors: 23,
    todayAppointments: 47,
    weeklyGrowth: 12.5,
  }

  const appointmentStats: AppointmentStats = {
    confirmed: 35,
    pending: 8,
    cancelled: 4,
  }

  const recentAppointments: Appointment[] = [
    {
      id: 1,
      patient: 'María González',
      doctor: 'Dr. Carlos Ruiz',
      time: '09:00',
      status: 'confirmed',
      specialty: 'Cardiología',
    },
    {
      id: 2,
      patient: 'Juan Pérez',
      doctor: 'Dra. Ana López',
      time: '10:30',
      status: 'pending',
      specialty: 'Pediatría',
    },
    {
      id: 3,
      patient: 'Carmen Silva',
      doctor: 'Dr. Luis Torres',
      time: '11:15',
      status: 'confirmed',
      specialty: 'Dermatología',
    },
  ]

  const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    color,
    subtitle,
  }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
          }}
        >
          <Box>
            <Typography color="textSecondary" gutterBottom variant="h6">
              {title}
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontWeight: 'bold', color: color }}
            >
              {value}
            </Typography>
            {subtitle && (
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Box>
          <Avatar sx={{ bgcolor: color, width: 56, height: 56 }}>{icon}</Avatar>
        </Box>
      </CardContent>
    </Card>
  )

  const getStatusColor = (status: string): 'success' | 'warning' | 'error' => {
    switch (status) {
      case 'confirmed':
        return 'success'
      case 'pending':
        return 'warning'
      case 'cancelled':
        return 'error'
      default:
        return 'success'
    }
  }

  const getStatusText = (status: string): string => {
    switch (status) {
      case 'confirmed':
        return 'Confirmada'
      case 'pending':
        return 'Pendiente'
      case 'cancelled':
        return 'Cancelada'
      default:
        return status
    }
  }

  const getStatusIcon = (status: string): React.ReactNode => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle fontSize="small" />
      case 'pending':
        return <Schedule fontSize="small" />
      case 'cancelled':
        return <Cancel fontSize="small" />
      default:
        return null
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ fontWeight: 'bold' }}
        >
          Dashboard SISOL
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          Sistema de gestión de citas médicas
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Pacientes Totales"
            value={stats.totalPatients.toLocaleString()}
            icon={<People />}
            color="#2196f3"
            subtitle="Registrados"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Médicos Activos"
            value={stats.totalDoctors}
            icon={<LocalHospital />}
            color="#4caf50"
            subtitle="Disponibles"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Citas Hoy"
            value={stats.todayAppointments}
            icon={<CalendarToday />}
            color="#ff9800"
            subtitle="Programadas"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Crecimiento"
            value={`+${stats.weeklyGrowth}%`}
            icon={<TrendingUp />}
            color="#9c27b0"
            subtitle="Esta semana"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Appointment Statistics */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Schedule color="primary" />
                Estado de Citas
              </Typography>
              <Box sx={{ mt: 3 }}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Confirmadas</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="success.main"
                  >
                    {appointmentStats.confirmed}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={
                    (appointmentStats.confirmed /
                      (appointmentStats.confirmed +
                        appointmentStats.pending +
                        appointmentStats.cancelled)) *
                    100
                  }
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                  color="success"
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Pendientes</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="warning.main"
                  >
                    {appointmentStats.pending}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={
                    (appointmentStats.pending /
                      (appointmentStats.confirmed +
                        appointmentStats.pending +
                        appointmentStats.cancelled)) *
                    100
                  }
                  sx={{ mb: 2, height: 8, borderRadius: 4 }}
                  color="warning"
                />

                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    mb: 1,
                  }}
                >
                  <Typography variant="body2">Canceladas</Typography>
                  <Typography
                    variant="body2"
                    fontWeight="bold"
                    color="error.main"
                  >
                    {appointmentStats.cancelled}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={
                    (appointmentStats.cancelled /
                      (appointmentStats.confirmed +
                        appointmentStats.pending +
                        appointmentStats.cancelled)) *
                    100
                  }
                  sx={{ height: 8, borderRadius: 4 }}
                  color="error"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Appointments */}
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <CalendarToday color="primary" />
                Citas de Hoy
              </Typography>
              <List dense>
                {recentAppointments.map((appointment, index) => (
                  <React.Fragment key={appointment.id}>
                    <ListItem sx={{ px: 0, py: 1 }}>
                      <ListItemAvatar>
                        <Avatar
                          sx={{ width: 32, height: 32, fontSize: '0.875rem' }}
                        >
                          {appointment.patient
                            .split(' ')
                            .map((n) => n[0])
                            .join('')
                            .toUpperCase()}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Box
                            sx={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              alignItems: 'center',
                            }}
                          >
                            <Typography variant="body2" fontWeight="medium">
                              {appointment.patient}
                            </Typography>
                            <Chip
                              label={getStatusText(appointment.status)}
                              color={getStatusColor(appointment.status)}
                              size="small"
                              sx={{ ml: 1 }}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              {appointment.doctor} • {appointment.specialty}
                            </Typography>
                            <Typography
                              variant="caption"
                              color="primary"
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                              }}
                            >
                              <AccessTime fontSize="inherit" />
                              {appointment.time}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < recentAppointments.length - 1 && (
                      <Divider component="li" />
                    )}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DashboardPage
