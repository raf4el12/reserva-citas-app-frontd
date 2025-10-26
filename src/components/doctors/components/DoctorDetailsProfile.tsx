'use client'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import EditIcon from '@mui/icons-material/Edit'
import {
  Avatar,
  Box,
  Button,
  Card,
  Chip,
  Grid,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { Doctor } from '../../../types/doctors/doctorSchema'

interface DoctorDetailsProfileProps {
  doctor: Doctor | null
  onBack: () => void
  onEdit?: (doctor: Doctor) => void
}

const DoctorDetailsProfile = ({
  doctor,
  onBack,
  onEdit,
}: DoctorDetailsProfileProps) => {
  if (!doctor) return null

  const handleEdit = () => {
    onEdit?.(doctor)
  }

  return (
    <Box>
      {/* Header Section */}
      <Box sx={{ mb: 4 }}>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} sx={{ mb: 3 }}>
          Volver a la lista
        </Button>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 3,
            flexWrap: 'wrap',
          }}
        >
          <Box sx={{ flex: 1, minWidth: 300 }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 600, mb: 1 }}
              gutterBottom
            >
              Dr. {doctor.profile?.name} {doctor.profile?.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Licencia Médica: {doctor.licenseNumber}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              {doctor.specialties && doctor.specialties.length > 0 && (
                <Chip
                  label={
                    doctor.specialties
                      .map((s) => s.specialty?.name)
                      .join(', ') || 'Sin especialidades'
                  }
                  size="small"
                  color="primary"
                />
              )}
              <Chip
                label={doctor.deleted ? 'Eliminado' : 'Activo'}
                size="small"
                color={doctor.deleted ? 'error' : 'success'}
              />
            </Box>
          </Box>

          <IconButton
            color="primary"
            onClick={handleEdit}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <EditIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Main Content */}
      <Grid container spacing={3}>
        {/* Left Column - Main Info */}
        <Grid item xs={12} md={8}>
          {/* Profile Image / Avatar Section */}
          <Card sx={{ mb: 3, overflow: 'hidden' }}>
            <Box
              sx={{
                height: 300,
                backgroundColor: 'primary.main',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Avatar
                sx={{
                  width: 200,
                  height: 200,
                  bgcolor: 'white',
                  color: 'primary.main',
                  fontSize: '4rem',
                  fontWeight: 'bold',
                }}
                src={doctor.profile?.photo || undefined}
              >
                {doctor.profile?.name?.[0]}
                {doctor.profile?.lastName?.[0]}
              </Avatar>
            </Box>
          </Card>

          {/* About This Doctor */}
          {doctor.resume && (
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Resumen Profesional
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {doctor.resume}
              </Typography>
            </Card>
          )}

          {/* By the Numbers */}
          <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
              Información Profesional
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Nivel Profesional
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      Licenciado
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Estado de Licencia
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {doctor.deleted ? 'Inactiva' : 'Activa'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Número de Licencia
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {doctor.licenseNumber}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Especialidades
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {doctor.specialties?.length || 0}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>

          {/* Description */}
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información Personal
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Detalles de contacto y datos personales del doctor.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {doctor.profile?.email || 'No disponible'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {doctor.profile?.phone || 'No disponible'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                {doctor.profile?.birthday && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Fecha de Nacimiento
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {new Date(doctor.profile.birthday).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
                {doctor.profile?.address && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Dirección
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {doctor.profile.address}
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Card>
        </Grid>

        {/* Right Column - Sidebar */}
        <Grid item xs={12} md={4}>
          <Stack spacing={3}>
            {/* Quick Info Card */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Información Rápida
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Nombre Completo
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {doctor.profile?.name} {doctor.profile?.lastName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Licencia Médica
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {doctor.licenseNumber}
                  </Typography>
                </Box>
                <Box>
                  {/* <Typography variant="caption" color="text.secondary">
                    Estado
                  </Typography> */}
                  <Chip
                    label={doctor.deleted ? 'Eliminado' : 'Activo'}
                    size="small"
                    color={doctor.deleted ? 'error' : 'success'}
                  />
                </Box>
              </Stack>
            </Card>

            {/* Specialties Card */}
            {doctor.specialties && doctor.specialties.length > 0 && (
              <Card sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Especialidades
                </Typography>
                <Stack spacing={1} sx={{ mt: 2 }}>
                  {doctor.specialties?.map((specialty) => {
                    if (!specialty || !specialty.id) {
                      console.error('Invalid specialty object:', specialty)
                      return null
                    }
                    return (
                      <Chip
                        key={specialty.id}
                        label={specialty.specialty?.name || 'Sin nombre'}
                        variant="outlined"
                        size="small"
                        color="primary"
                      />
                    )
                  })}
                </Stack>
              </Card>
            )}

            {/* Action Card */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Acciones
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Button
                  variant="contained"
                  fullWidth
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                >
                  Editar Doctor
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default DoctorDetailsProfile
