import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { FC } from 'react'

import type { Patient } from '../../../types/patients/patientSchema'

interface PatientCardProps {
  item: Patient
  onView?: (patient: Patient) => void
  onEdit?: (patient: Patient) => void
  onDelete?: (patient: Patient) => void
}

const PatientCard: FC<PatientCardProps> = ({
  item,
  onView,
  onEdit,
  onDelete,
}) => {
  const profile = item.profile
  const fullName =
    [profile?.name, profile?.lastName].filter(Boolean).join(' ') || 'Sin nombre'
  const email = profile?.email
  const phone = profile?.phone
  const photo = profile?.photo ?? undefined
  const bloodType = item.bloodType
  const emergencyContact = item.emergencyContact
  const allergies = item.allergies
  const chronicConditions = item.chronic_conditions
  const isDeleted = item.deleted ?? false

  const initials = fullName
    .split(' ')
    .filter(Boolean)
    .map((word) => word[0]?.toUpperCase())
    .slice(0, 2)
    .join('')

  const handleView = () => onView?.(item)
  const handleEdit = () => onEdit?.(item)
  const handleDelete = () => onDelete?.(item)

  return (
    <Card
      variant="outlined"
      sx={{
        minWidth: 280,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Stack spacing={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
            }}
          >
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Avatar src={photo} alt={fullName} sx={{ width: 48, height: 48 }}>
                {!photo && initials}
              </Avatar>
              <Box>
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{
                    fontWeight: 600,
                    color: 'text.primary',
                    lineHeight: 1.2,
                  }}
                >
                  {fullName}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ID: #{item.id}
                </Typography>
              </Box>
            </Box>
            <Chip
              label={isDeleted ? 'Eliminado' : 'Activo'}
              color={isDeleted ? 'error' : 'success'}
              size="small"
              variant="outlined"
            />
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Tipo de sangre
            </Typography>
            <Box sx={{ mt: 0.5 }}>
              <Chip
                label={bloodType}
                color="primary"
                size="small"
                variant="outlined"
              />
            </Box>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Contacto de emergencia
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {emergencyContact || 'No registrado'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Contacto
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {email || 'Sin correo registrado'}
            </Typography>
            {phone && (
              <Typography variant="body2" color="text.secondary">
                Teléfono: {phone}
              </Typography>
            )}
          </Box>

          {(allergies || chronicConditions) && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Información médica
              </Typography>
              {allergies && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  <strong>Alergias:</strong> {allergies}
                </Typography>
              )}
              {chronicConditions && (
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    mt: allergies ? 0.5 : 0,
                  }}
                >
                  <strong>Condiciones crónicas:</strong> {chronicConditions}
                </Typography>
              )}
            </Box>
          )}
        </Stack>
      </CardContent>

      <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
        <Box>
          <IconButton size="medium" onClick={handleView} title="Ver detalles">
            <i
              className="ri-eye-line"
              style={{ fontSize: '24px', color: '#5271FF' }}
            />
          </IconButton>
          <IconButton size="medium" onClick={handleEdit} title="Editar">
            <i
              className="ri-edit-box-line"
              style={{ fontSize: '24px', color: '#5271FF' }}
            />
          </IconButton>
        </Box>
        <IconButton size="medium" onClick={handleDelete} title="Eliminar">
          <i
            className="ri-delete-bin-6-line"
            style={{ fontSize: '24px', color: '#FF3535' }}
          />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default PatientCard
