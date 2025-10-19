import { useState, useEffect } from 'react'
import {
  Drawer,
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  IconButton,
  Divider,
  FormControlLabel,
  Switch
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useUpdateCategory } from '../../hook/categories/useUpdateCategories'
import type { Category } from '../../types/category'

interface CategoryEditDrawerProps {
  open: boolean
  onClose: () => void
  category: Category | null
}

const CategoryEditDrawer = ({ open, onClose, category }: CategoryEditDrawerProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  })
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  const updateCategory = useUpdateCategory()

  // Cargar datos de la categoría cuando se abre el drawer
  useEffect(() => {
    if (category) {
      setFormData({
        name: category.name || '',
        description: category.description || '',
        isActive: category.isActive ?? true
      })
    }
  }, [category])

  const handleInputChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFormData(prev => ({ ...prev, [field]: value }))
    
    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }))
    }
  }

  const validateForm = () => {
    const newErrors: { name?: string; description?: string } = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido'
    }
    
    if (formData.name.length > 100) {
      newErrors.name = 'El nombre no puede exceder 100 caracteres'
    }
    
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'La descripción no puede exceder 500 caracteres'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm() || !category) return

    try {
      await updateCategory.mutateAsync({
        id: category.id,
        data: {
          name: formData.name.trim(),
          description: formData.description.trim() || undefined,
          isActive: formData.isActive
        }
      })
      
      // Cerrar drawer
      handleClose()
    } catch (error) {
      console.error('Error al actualizar categoría:', error)
    }
  }

  const handleClose = () => {
  setFormData({ name: '', description: '', isActive: true })
    setErrors({})
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 } }
      }}
    >
      <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" component="h2">
            Editar Categoría
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {/* Form */}
        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nombre de la categoría"
              value={formData.name}
              onChange={handleInputChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
              autoFocus
            />
            
            <TextField
              fullWidth
              label="Descripción"
              value={formData.description}
              onChange={handleInputChange('description')}
              error={!!errors.description}
              helperText={errors.description}
              multiline
              rows={4}
              placeholder="Descripción opcional de la categoría..."
            />
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(event) =>
                    setFormData(prev => ({ ...prev, isActive: event.target.checked }))
                  }
                />
              }
              label={formData.isActive ? 'Activa' : 'Inactiva'}
            />
          </Stack>
        </Box>
        
        {/* Actions */}
        <Box sx={{ pt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            disabled={updateCategory.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={updateCategory.isPending || !formData.name.trim()}
          >
            {updateCategory.isPending ? 'Actualizando...' : 'Actualizar'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default CategoryEditDrawer
