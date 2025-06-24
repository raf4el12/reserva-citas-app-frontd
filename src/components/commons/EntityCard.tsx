import { useState } from 'react'
import { Box, Button, TextField, Typography } from '@mui/material'

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
  const [edit, setEdit] = useState(false)
  const [value, setValue] = useState(String(item[mainField]))

  return (
    <Box sx={{ border: '1px solid #eee', p: 2, borderRadius: 2, minWidth: 220 }}>
      {edit ? (
        <>
          <TextField
            value={value}
            onChange={e => setValue(e.target.value)}
            size="small"
            fullWidth
            sx={{ mb: 1 }}
          />
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              size="small"
              variant="contained"
              color="primary"
              onClick={() => {
                onUpdate(getId(item), value)
                setEdit(false)
              }}
            >
              Guardar
            </Button>
            <Button
              size="small"
              variant="outlined"
              onClick={() => {
                setValue(String(item[mainField]))
                setEdit(false)
              }}
            >
              Cancelar
            </Button>
          </Box>
        </>
      ) : (
        <>
          <Typography variant="h6" sx={{ mb: 1 }}>
            {item[mainField] as string}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button size="small" variant="outlined" onClick={() => setEdit(true)}>
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
              <Button
                size="small"
                variant="outlined"
                href={detailUrl(item)}
              >
                Detalle
              </Button>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}

export default EntityCard