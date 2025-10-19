import { useState } from 'react'
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
import { useCreateCategory } from '../../hook/categories/useCreatedCategories'

interface CategoryAddDrawerProps {
  open: boolean
  onClose: () => void
}

const CategoryAddDrawer = ({ open, onClose }: CategoryAddDrawerProps) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true
  })
  const [errors, setErrors] = useState<{ name?: string; description?: string }>({})

  const createCategory = useCreateCategory()

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
    if (!validateForm()) return

    try {
      await createCategory.mutateAsync({
        name: formData.name.trim(),
        description: formData.description.trim() || undefined,
        isActive: formData.isActive
      })
      
      // Resetear formulario y cerrar drawer
  setFormData({ name: '', description: '', isActive: true })
      setErrors({})
      onClose()
    } catch (error) {
      console.error('Error al crear categoría:', error)
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
            Nueva Categoría
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
            disabled={createCategory.isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={createCategory.isPending || !formData.name.trim()}
          >
            {createCategory.isPending ? 'Creando...' : 'Crear Categoría'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default CategoryAddDrawer
