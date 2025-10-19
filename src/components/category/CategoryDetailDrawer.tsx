import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Divider,
  Chip,
  Stack,
} from '@mui/material'
import { Close as CloseIcon, Edit as EditIcon } from '@mui/icons-material'
import type { Category } from '../../types/category'

interface CategoryDetailDrawerProps {
  open: boolean
  onClose: () => void
  onEdit?: (category: Category) => void
  category: Category | null
}

const CategoryDetailDrawer = ({ open, onClose, onEdit, category }: CategoryDetailDrawerProps) => {
  if (!category) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(category)
    }
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Detalles de Categoría
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
        
        {/* Content */}
        <Stack spacing={3}>
          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              ID
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              #{category.id}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Nombre
            </Typography>
            <Typography variant="body1" fontWeight="medium">
              {category.name}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Descripción
            </Typography>
            <Typography variant="body1">
              {category.description || 'Sin descripción'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="caption" color="text.secondary" gutterBottom>
              Estado
            </Typography>
            <Stack direction="row" spacing={1}>
              <Chip
                label={category.isActive ? 'Activa' : 'Inactiva'}
                color={category.isActive ? 'success' : 'default'}
                size="small"
                variant="outlined"
              />
              {category.deleted && (
                <Chip
                  label="Eliminada"
                  color="error"
                  size="small"
                  variant="outlined"
                />
              )}
            </Stack>
          </Box>

          {category.createdAt && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Fecha de Creación
              </Typography>
              <Typography variant="body2">
                {new Date(category.createdAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            </Box>
          )}

          {category.updatedAt && (
            <Box>
              <Typography variant="caption" color="text.secondary" gutterBottom>
                Última Actualización
              </Typography>
              <Typography variant="body2">
                {new Date(category.updatedAt).toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </Drawer>
  )
}

export default CategoryDetailDrawer
