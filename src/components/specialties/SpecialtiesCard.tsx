import {
  Box,
  Card,
  CardActions,
  CardContent,
  Chip,
  IconButton,
  Stack,
  Typography,
} from '@mui/material'
import type { Specialties } from '../../types/specialties/specialties'

interface SpecialtiesCardProps {
  item: Specialties
  onView?: (specialty: Specialties) => void
  onEdit?: (specialty: Specialties) => void
  onDelete?: (specialty: Specialties) => void
}

const SpecialtiesCard = ({
  item,
  onView,
  onEdit,
  onDelete,
}: SpecialtiesCardProps) => {
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
            <Typography
              variant="h6"
              component="h3"
              sx={{
                fontWeight: 600,
                color: 'text.primary',
                lineHeight: 1.2,
              }}
            >
              {item.name}
            </Typography>
            <Chip
              label={item.isActive ? 'Activa' : 'Inactiva'}
              color={item.isActive ? 'success' : 'default'}
              size="small"
              variant="outlined"
            />
          </Box>

          {item.category?.name && (
            <Typography variant="caption" color="text.secondary">
              Categoría: {item.category.name}
            </Typography>
          )}

          {item.description && (
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.description}
            </Typography>
          )}

          <Box sx={{ mt: 'auto' }}>
            <Typography variant="caption" color="text.secondary">
              Creado: {new Date(item.createdAt).toLocaleDateString('es-ES')}
            </Typography>
            {item.updatedAt && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block' }}
              >
                Actualizado:{' '}
                {new Date(item.updatedAt).toLocaleDateString('es-ES')}
              </Typography>
            )}
          </Box>
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

export default SpecialtiesCard
