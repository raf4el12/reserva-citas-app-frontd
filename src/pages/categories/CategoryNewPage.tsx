import CloseIcon from '@mui/icons-material/Close'
import { Alert, Box, Button, IconButton, Paper, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useCreateCategory } from '../../hook/categories/useCreatedCategories'

const CategoryNewPage = () => {
  const navigate = useNavigate()
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
          navigate('/admin/categories')
        },
      }
    )
  }

  return (
    <Paper elevation={4} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <div className="flex gap-2 justify-between h-[50px] items-center">
        <h2 className="text-2xl font-bold text-primary mb-2">
          Nueva Categoría
        </h2>
        <IconButton size="small">
          <Link to="/admin/categories">
            <CloseIcon />
          </Link>
        </IconButton>
      </div>
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

export default CategoryNewPage
