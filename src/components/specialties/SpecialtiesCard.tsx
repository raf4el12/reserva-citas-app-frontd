import { Box, Button, Typography } from '@mui/material'
import type { Specialties } from '../../types/specialties'

interface SpecialtiesCardProps {
  item: Specialties
  onDelete?: (id: number) => void
  onUpdate?: (id: number, name: string) => void
  detailUrl?: (item: Specialties) => string
}

const SpecialtiesCard = ({ item, onDelete, onUpdate, detailUrl }: SpecialtiesCardProps) => {
  return (
    <Box sx={{ border: '1px solid #eee', p: 2, borderRadius: 2, minWidth: 220 }}>
      <Typography variant="h6" sx={{ mb: 1 }}>
        {item.name}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        {onUpdate && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => onUpdate(item.id, item.name)}
          >
            Editar
          </Button>
        )}
        {onDelete && (
          <Button
            size="small"
            variant="outlined"
            color="error"
            onClick={() => onDelete(item.id)}
          >
            Eliminar
          </Button>
        )}
        {detailUrl && (
          <Button
            size="small"
            variant="outlined"
            href={detailUrl(item)}
          >
            Detalle
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default SpecialtiesCard