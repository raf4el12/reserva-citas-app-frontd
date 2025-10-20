import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material'
import {
  Box,
  Chip,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'

import type { Specialties } from '../../types/specialties/specialties'

interface SpecialtiesDetailDrawerProps {
  open: boolean
  onClose: () => void
  onEdit?: (specialty: Specialties) => void
  specialty: Specialties | null
}

const SpecialtiesDetailDrawer = ({
  open,
  onClose,
  onEdit,
  specialty,
}: SpecialtiesDetailDrawerProps) => {
  if (!specialty) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(specialty)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 420 } } }}
    >
      <Box
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Detalles de la Especialidad
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            {onEdit && (
              <IconButton onClick={handleEdit} size="small" color="primary">
                <EditIcon />
              </IconButton>
            )}
            <IconButton onClick={onClose} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Stack spacing={3} sx={{ flex: 1 }}>
          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              ID
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              #{specialty.id}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Nombre
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {specialty.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Categoría
            </Typography>
            <Typography variant="body1">
              {specialty.category?.name || 'Sin categoría'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Estado
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={specialty.isActive ? 'Activa' : 'Inactiva'}
                color={specialty.isActive ? 'success' : 'default'}
                size="small"
                variant="outlined"
              />
              {specialty.deleted && (
                <Chip
                  label="Eliminada"
                  color="error"
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body1">
              {specialty.description || 'Sin descripción'}
            </Typography>
          </Box>

          <Stack direction="row" spacing={2}>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Duración
              </Typography>
              <Typography variant="body1">
                {specialty.duration
                  ? `${specialty.duration} minutos`
                  : 'No especificado'}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Precio
              </Typography>
              <Typography variant="body1">
                {specialty.price !== null && specialty.price !== undefined
                  ? `$${Number(specialty.price).toFixed(2)}`
                  : 'No especificado'}
              </Typography>
            </Box>
          </Stack>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Requisitos
            </Typography>
            <Typography variant="body1">
              {specialty.requirements || 'Sin requisitos definidos'}
            </Typography>
          </Box>

          <Divider />

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Fecha de Creación
            </Typography>
            <Typography variant="body2">
              {new Date(specialty.createdAt).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </Typography>
          </Box>

          {specialty.updatedAt && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Última Actualización
              </Typography>
              <Typography variant="body2">
                {new Date(specialty.updatedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Drawer>
  )
}

export default SpecialtiesDetailDrawer
