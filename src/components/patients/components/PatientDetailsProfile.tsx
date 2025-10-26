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
import type { Patient } from '../../../types/patients/patientSchema'

interface PatientDetailsProfileProps {
  patient: Patient | null
  onBack: () => void
  onEdit?: (patient: Patient) => void
}

const PatientDetailsProfile = ({
  patient,
  onBack,
  onEdit,
}: PatientDetailsProfileProps) => {
  if (!patient) return null

  const handleEdit = () => {
    onEdit?.(patient)
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
              {patient.profile?.name} {patient.profile?.lastName}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              Paciente ID: {patient.id}
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
              <Chip
                label={patient.bloodType}
                size="small"
                color="primary"
                variant="outlined"
              />
              <Chip
                label={patient.deleted ? 'Eliminado' : 'Activo'}
                size="small"
                color={patient.deleted ? 'error' : 'success'}
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
                src={patient.profile?.photo || undefined}
              >
                {patient.profile?.name?.[0]}
                {patient.profile?.lastName?.[0]}
              </Avatar>
            </Box>
          </Card>

          {/* Medical Information */}
          <Card sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información Médica
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Tipo de Sangre
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {patient.bloodType}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Contacto de Emergencia
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {patient.emergencyContact || 'No registrado'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack spacing={2}>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Alergias
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {patient.allergies || 'Ninguna'}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Condiciones Crónicas
                    </Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {patient.chronic_conditions || 'Ninguna'}
                    </Typography>
                  </Box>
                </Stack>
              </Grid>
            </Grid>
          </Card>

          {/* Personal Information */}
          <Card sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Información Personal
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Detalles de contacto y datos personales del paciente.
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="caption" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {patient.profile?.email || 'No disponible'}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Teléfono
                  </Typography>
                  <Typography variant="body1" fontWeight={500}>
                    {patient.profile?.phone || 'No disponible'}
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6}>
                {patient.profile?.birthday && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="caption" color="text.secondary">
                      Fecha de Nacimiento
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {new Date(patient.profile.birthday).toLocaleDateString()}
                    </Typography>
                  </Box>
                )}
                {patient.profile?.address && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Dirección
                    </Typography>
                    <Typography variant="body1" fontWeight={500}>
                      {patient.profile.address}
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
                    {patient.profile?.name} {patient.profile?.lastName}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    ID del Paciente
                  </Typography>
                  <Typography variant="body1" fontWeight={600}>
                    {patient.id}
                  </Typography>
                </Box>
                <Box>
                  <Chip
                    label={patient.deleted ? 'Eliminado' : 'Activo'}
                    size="small"
                    color={patient.deleted ? 'error' : 'success'}
                  />
                </Box>
              </Stack>
            </Card>

            {/* Medical Info Card */}
            <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Información Médica
              </Typography>
              <Stack spacing={2} sx={{ mt: 2 }}>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Tipo de Sangre
                  </Typography>
                  <Chip
                    label={patient.bloodType}
                    variant="outlined"
                    size="small"
                    color="primary"
                  />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary">
                    Contacto de Emergencia
                  </Typography>
                  <Typography variant="body2" fontWeight={500}>
                    {patient.emergencyContact || 'No registrado'}
                  </Typography>
                </Box>
                {patient.allergies && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Alergias
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {patient.allergies}
                    </Typography>
                  </Box>
                )}
                {patient.chronic_conditions && (
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Condiciones Crónicas
                    </Typography>
                    <Typography variant="body2" fontWeight={500}>
                      {patient.chronic_conditions}
                    </Typography>
                  </Box>
                )}
              </Stack>
            </Card>

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
                  Editar Paciente
                </Button>
              </Stack>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PatientDetailsProfile
