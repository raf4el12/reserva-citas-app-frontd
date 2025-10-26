'use client'

import CloudUploadIcon from '@mui/icons-material/CloudUpload'
// MUI Components
import {
  Button,
  Card,
  CardContent,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material'

// Types
import type { DoctorCreate } from '../../../types/doctors/doctorSchema'
import PhotoPreview from './PhotoPreview'

interface DoctorInformationProps {
  formData: Partial<DoctorCreate>
  onFormChange: (field: keyof DoctorCreate, value: any) => void
  errors?: Record<string, string>
}

// COMPONENTE PRINCIPAL: DoctorInformation
const DoctorInformation = ({
  formData,
  onFormChange,
  errors = {},
}: DoctorInformationProps) => {
  const handleInputChange =
    (field: keyof DoctorCreate) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      onFormChange(field, event.target.value)
    }

  const handleSelectChange = (field: keyof DoctorCreate) => (event: any) => {
    onFormChange(field, event.target.value)
  }

  return (
    <Card>
      <CardContent>
        {/* Información Personal */}
        <Typography variant="h6" className="mbe-3" color="primary">
          Información Personal
        </Typography>

        <Grid container spacing={3} className="mbe-5">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Nombre"
              placeholder="Juan"
              value={formData.name || ''}
              onChange={handleInputChange('name')}
              error={!!errors.name}
              helperText={errors.name}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Apellido"
              placeholder="Pérez"
              value={formData.lastName || ''}
              onChange={handleInputChange('lastName')}
              error={!!errors.lastName}
              helperText={errors.lastName}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Email"
              placeholder="juan.perez@email.com"
              type="email"
              value={formData.email || ''}
              onChange={handleInputChange('email')}
              error={!!errors.email}
              helperText={errors.email}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Teléfono"
              placeholder="+1 234 567 8900"
              value={formData.phone || ''}
              onChange={handleInputChange('phone')}
              error={!!errors.phone}
              helperText={errors.phone}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Fecha de Nacimiento"
              type="date"
              InputLabelProps={{ shrink: true }}
              value={formData.birthday || ''}
              onChange={handleInputChange('birthday')}
              error={!!errors.birthday}
              helperText={errors.birthday}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth error={!!errors.gender}>
              <InputLabel>Género</InputLabel>
              <Select
                value={formData.gender || ''}
                onChange={handleSelectChange('gender')}
                label="Género"
              >
                <MenuItem value="">Seleccionar género</MenuItem>
                <MenuItem value="male">Masculino</MenuItem>
                <MenuItem value="female">Femenino</MenuItem>
                <MenuItem value="other">Otro</MenuItem>
              </Select>
              {errors.gender && (
                <FormHelperText>{errors.gender}</FormHelperText>
              )}
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Dirección"
              placeholder="Calle 123, Ciudad, País"
              multiline
              rows={2}
              value={formData.address || ''}
              onChange={handleInputChange('address')}
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="URL de Foto (opcional)"
              placeholder="https://ejemplo.com/foto.jpg"
              value={typeof formData.photo === 'string' ? formData.photo : ''}
              onChange={(event) => {
                if (
                  !(
                    formData.photo instanceof File ||
                    formData.photo instanceof Blob
                  )
                ) {
                  onFormChange('photo', event.target.value)
                }
              }}
              error={!!errors.photo}
              helperText={errors.photo || 'O selecciona una imagen desde tu PC'}
              disabled={
                formData.photo instanceof File || formData.photo instanceof Blob
              }
              InputProps={{
                startAdornment:
                  formData.photo instanceof File ? (
                    <Typography
                      variant="caption"
                      sx={{ mr: 1, color: 'text.secondary' }}
                    >
                      📁 {formData.photo.name}
                    </Typography>
                  ) : undefined,
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="photo-upload"
              type="file"
              onChange={(event) => {
                const file = event.target.files?.[0]
                if (file) {
                  onFormChange('photo', file)
                }
              }}
            />
            <label htmlFor="photo-upload">
              <Button
                variant="outlined"
                component="span"
                fullWidth
                sx={{ height: '56px' }}
                startIcon={<CloudUploadIcon />}
              >
                {formData.photo instanceof File ||
                formData.photo instanceof Blob
                  ? 'Cambiar imagen'
                  : 'Subir imagen desde PC'}
              </Button>
            </label>
          </Grid>
        </Grid>

        {/* Vista previa de la foto */}
        <Grid container spacing={3} className="mbe-5">
          <Grid item xs={12}>
            <PhotoPreview
              photoUrl={formData.photo}
              firstName={formData.name || ''}
              lastName={formData.lastName || ''}
              onRemove={() => onFormChange('photo', undefined)}
            />
          </Grid>
        </Grid>

        <Divider className="mbe-5" />

        {/* Información Profesional */}
        <Typography variant="h6" className="mbe-3" color="primary">
          Información Profesional
        </Typography>

        <Grid container spacing={3} className="mbe-5">
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Número de Licencia Médica"
              placeholder="LM123456789"
              value={formData.licenseNumber || ''}
              onChange={handleInputChange('licenseNumber')}
              error={!!errors.licenseNumber}
              helperText={errors.licenseNumber}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="ID de Usuario (Opcional)"
              placeholder="123"
              type="number"
              value={formData.userId ?? ''}
              onChange={(event) => {
                const rawValue = event.target.value
                if (rawValue === '') {
                  onFormChange('userId', undefined)
                  return
                }
                const parsedValue = Number(rawValue)
                onFormChange(
                  'userId',
                  Number.isNaN(parsedValue) ? undefined : parsedValue
                )
              }}
              error={!!errors.userId}
              helperText={errors.userId}
            />
          </Grid>
        </Grid>

        {/* Resumen profesional */}
        <Typography className="mbe-1">
          Resumen Profesional (Opcional)
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={6}
          placeholder="Escribe el resumen profesional del doctor..."
          value={formData.resume || ''}
          onChange={handleInputChange('resume')}
          error={!!errors.resume}
          helperText={errors.resume}
          className="mbe-5"
        />
      </CardContent>
    </Card>
  )
}

export default DoctorInformation
