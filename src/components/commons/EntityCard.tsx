import { Box, Button, Typography } from '@mui/material'

interface EntityCardProps<T> {
  item: T
  mainField: keyof T
  onDelete: (id: string) => void
  onUpdate: (id: string, value: string) => void
  getId: (item: T) => string
  detailUrl?: (item: T) => string
}

function EntityCard<T>({
  item,
  mainField,
  onDelete,
  onUpdate,
  getId,
  detailUrl,
}: EntityCardProps<T>) {
  return (
    <Box
      sx={{ border: '1px solid #eee', p: 2, borderRadius: 2, minWidth: 220 }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        {item[mainField] as string}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          size="small"
          variant="outlined"
          onClick={() => onUpdate(getId(item), String(item[mainField]))}
        >
          Editar
        </Button>
        <Button
          size="small"
          variant="outlined"
          color="error"
          onClick={() => onDelete(getId(item))}
        >
          Eliminar
        </Button>
        {detailUrl && (
          <Button size="small" variant="outlined" href={detailUrl(item)}>
            Detalle
          </Button>
        )}
      </Box>
    </Box>
  )
}

export default EntityCard
