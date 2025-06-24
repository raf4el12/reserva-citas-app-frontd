import { Alert, Box, Button, MenuItem, Paper, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useSpecialtiesCreate } from '../../hook/specialties/useSpecialtiesCreate'
import { useCategories } from '../../hook/categories/useCategories'
import { useNavigate } from 'react-router-dom'

const SpecialtiesNewPage = () => {
  const [name, setName] = useState('')
  const [categoryId, setCategoryId] = useState('')
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const createSpecialty = useSpecialtiesCreate()
  const { data: categories } = useCategories()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSuccess(false)
    createSpecialty.mutate(
      { name, categoryId: Number(categoryId) },
      {
        onSuccess: () => {
          setSuccess(true)
          setName('')
          setCategoryId('')
          setTimeout(() => {
            navigate('/admin/specialties')
          }, 200)
        },
      }
    )
  }

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Typography variant="h6" mb={2} align="center" fontWeight="bold">
        Nueva Especialidad
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
        <TextField
          select
          label="Categoría"
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
          fullWidth
        >
          <MenuItem value="">Selecciona una categoría</MenuItem>
          {categories?.map((cat: any) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.name}
            </MenuItem>
          ))}
        </TextField>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={createSpecialty.isPending}
        >
          {createSpecialty.isPending ? 'Creando...' : 'Crear'}
        </Button>
        {createSpecialty.isError && (
          <Alert severity="error">
            {createSpecialty.error instanceof Error
              ? createSpecialty.error.message
              : 'Error al crear la especialidad'}
          </Alert>
        )}
        {success && <Alert severity="success">¡Especialidad creada!</Alert>}
      </Box>
    </Paper>
  )
}

export default SpecialtiesNewPage