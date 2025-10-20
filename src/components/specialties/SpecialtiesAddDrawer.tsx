import { Close as CloseIcon } from '@mui/icons-material'
import {
  Box,
  Button,
  Divider,
  Drawer,
  FormControl,
  FormControlLabel,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'

import { useCategories } from '../../hook/categories/useCategories'
import { useSpecialtiesCreate } from '../../hook/specialties/useSpecialtiesCreate'
import type { CreateSpecialtyDto } from '../../types/specialties/specialtiesSchema'

interface SpecialtiesAddDrawerProps {
  open: boolean
  onClose: () => void
}

const defaultFormState: CreateSpecialtyDto = {
  name: '',
  categoryId: 0,
  description: '',
  duration: null,
  price: null,
  requirements: '',
  isActive: true,
}

const SpecialtiesAddDrawer = ({ open, onClose }: SpecialtiesAddDrawerProps) => {
  const { mutateAsync: createSpecialty, isPending } = useSpecialtiesCreate()
  const { data: categories } = useCategories()

  const [formData, setFormData] = useState<CreateSpecialtyDto>(defaultFormState)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: keyof CreateSpecialtyDto, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es obligatorio'
    }

    if (!formData.categoryId || formData.categoryId === 0) {
      newErrors.categoryId = 'Debes seleccionar una categoría'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (!validateForm()) return

    try {
      await createSpecialty({
        ...formData,
        name: formData.name.trim(),
        description: formData.description?.trim() || undefined,
        requirements: formData.requirements?.trim() || undefined,
      })
      handleClose()
    } catch (error) {
      console.error('Error al crear especialidad:', error)
    }
  }

  const handleClose = () => {
    setFormData(defaultFormState)
    setErrors({})
    onClose()
  }

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={handleClose}
      PaperProps={{ sx: { width: { xs: '100%', sm: 420 } } }}
    >
      <Box
        sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            mb: 2,
          }}
        >
          <Typography variant="h6" component="h2">
            Nueva Especialidad
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider sx={{ mb: 3 }} />

        <Box sx={{ flex: 1 }}>
          <Stack spacing={3}>
            <TextField
              fullWidth
              label="Nombre de la especialidad"
              value={formData.name}
              onChange={(event) =>
                handleInputChange('name', event.target.value)
              }
              error={!!errors.name}
              helperText={errors.name}
              required
              autoFocus
            />

            <FormControl fullWidth required error={!!errors.categoryId}>
              <InputLabel>Categoría</InputLabel>
              <Select
                label="Categoría"
                value={formData.categoryId || ''}
                onChange={(event) =>
                  handleInputChange('categoryId', Number(event.target.value))
                }
              >
                <MenuItem value="">
                  <em>Seleccione una categoría</em>
                </MenuItem>
                {categories
                  ?.filter((category) => category.isActive && !category.deleted)
                  .map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
              </Select>
              {errors.categoryId && (
                <FormHelperText>{errors.categoryId}</FormHelperText>
              )}
            </FormControl>

            <TextField
              fullWidth
              label="Descripción"
              value={formData.description || ''}
              onChange={(event) =>
                handleInputChange('description', event.target.value)
              }
              multiline
              rows={4}
              placeholder="Descripción opcional de la especialidad..."
            />

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label="Duración (minutos)"
                type="number"
                value={formData.duration ?? ''}
                onChange={(event) =>
                  handleInputChange(
                    'duration',
                    event.target.value ? Number(event.target.value) : null
                  )
                }
                inputProps={{ min: 1 }}
              />
              <TextField
                fullWidth
                label="Precio"
                type="number"
                value={formData.price ?? ''}
                onChange={(event) =>
                  handleInputChange(
                    'price',
                    event.target.value ? Number(event.target.value) : null
                  )
                }
                inputProps={{ min: 0, step: 0.01 }}
              />
            </Stack>

            <TextField
              fullWidth
              label="Requisitos"
              value={formData.requirements || ''}
              onChange={(event) =>
                handleInputChange('requirements', event.target.value)
              }
              multiline
              rows={3}
              placeholder="Lista de requisitos necesarios..."
            />

            <FormControlLabel
              control={
                <Switch
                  checked={formData.isActive}
                  onChange={(event) =>
                    handleInputChange('isActive', event.target.checked)
                  }
                />
              }
              label={formData.isActive ? 'Activa' : 'Inactiva'}
            />
          </Stack>
        </Box>

        <Box sx={{ pt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            onClick={handleClose}
            fullWidth
            disabled={isPending}
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
            disabled={
              isPending || !formData.name.trim() || !formData.categoryId
            }
          >
            {isPending ? 'Creando...' : 'Crear'}
          </Button>
        </Box>
      </Box>
    </Drawer>
  )
}

export default SpecialtiesAddDrawer
