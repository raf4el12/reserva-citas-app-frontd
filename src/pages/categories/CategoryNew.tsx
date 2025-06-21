import { Alert, Box, Button, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useCreateCategory } from '../../hook/categories/createdCategories'

const CategoryNew = () => {
  const [name, setName] = useState('')
  const [success, setSuccess] = useState(false)
  const createCategory = useCreateCategory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)
    createCategory.mutate(
      { name },
      {
        onSuccess: () => {
          setSuccess(true)
          setName('')
        },
      }
    )
  }

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2} align="center" fontWeight="bold">
        Nueva Categoría
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={createCategory.isPending}
        >
          {createCategory.isPending ? 'Creando...' : 'Crear'}
        </Button>
        {createCategory.isError && (
          <Alert severity="error">
            {createCategory.error instanceof Error
              ? createCategory.error.message
              : 'Error al crear la categoría'}
          </Alert>
        )}
        {success && <Alert severity="success">¡Categoría creada!</Alert>}
      </Box>
    </Paper>
  )
}

export default CategoryNew
