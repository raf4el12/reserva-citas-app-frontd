import { Alert, Button, TextField } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { useCreateCategory } from '../../hook/categories/useCreatedCategory'
import CardTitle from '../commons/CardTitle'

const CategoryEdit = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const createCategory = useCreateCategory()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
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
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle title="Nueva Categoría" to="/admin/categories" />
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="mb-6">
          <TextField
            label="Nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
          />
        </div>
        {createCategory.isError && (
          <Alert severity="error" className="mt-2">
            {createCategory.error instanceof Error
              ? createCategory.error.message
              : 'Error al crear la categoría'}
          </Alert>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/admin/categories"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={createCategory.isPending}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default CategoryEdit
