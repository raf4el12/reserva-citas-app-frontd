import {
  Box,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material'

interface PatientInformationProps {
  formData: any
  onFormChange: (field: string, value: any) => void
  errors: Record<string, string>
}

const PatientInformation = ({
  formData,
  onFormChange,
  errors,
}: PatientInformationProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Información Personal
        </Typography>
        <Stack spacing={3}>
          {/* Nombre y Apellido */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Nombre"
              fullWidth
              value={formData.name || ''}
              onChange={(e) => onFormChange('name', e.target.value)}
              error={!!errors.name}
              helperText={errors.name || 'Campo requerido'}
              required
              inputProps={{ maxLength: 50 }}
            />
            <TextField
              label="Apellido"
              fullWidth
              value={formData.lastName || ''}
              onChange={(e) => onFormChange('lastName', e.target.value)}
              error={!!errors.lastName}
              helperText={errors.lastName || 'Campo requerido'}
              required
              inputProps={{ maxLength: 50 }}
            />
          </Box>

          {/* Email */}
          <TextField
            label="Correo electrónico"
            type="email"
            fullWidth
            value={formData.email || ''}
            onChange={(e) => onFormChange('email', e.target.value)}
            error={!!errors.email}
            helperText={
              errors.email || 'Campo requerido - Formato de email válido'
            }
            required
            inputProps={{ maxLength: 100 }}
          />

          {/* Teléfono y Fecha de nacimiento */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <TextField
              label="Teléfono"
              fullWidth
              value={formData.phone || ''}
              onChange={(e) => onFormChange('phone', e.target.value)}
              error={!!errors.phone}
              helperText={errors.phone || 'Número de teléfono (opcional)'}
              inputProps={{ maxLength: 20 }}
              placeholder="Ej: +1 234 567 8900"
            />
            <TextField
              label="Fecha de nacimiento"
              type="date"
              fullWidth
              value={formData.birthday || ''}
              onChange={(e) => onFormChange('birthday', e.target.value)}
              error={!!errors.birthday}
              helperText={errors.birthday || 'Fecha de nacimiento (opcional)'}
              InputLabelProps={{ shrink: true }}
              inputProps={{ max: new Date().toISOString().split('T')[0] }}
            />
          </Box>

          {/* Género y Dirección */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Género</InputLabel>
              <Select
                value={formData.gender || ''}
                onChange={(e) => onFormChange('gender', e.target.value)}
                error={!!errors.gender}
                label="Género"
              >
                <MenuItem value="">
                  <em>Seleccionar género</em>
                </MenuItem>
                <MenuItem value="masculino">Masculino</MenuItem>
                <MenuItem value="femenino">Femenino</MenuItem>
                <MenuItem value="otro">Otro</MenuItem>
                <MenuItem value="prefiero_no_decir">Prefiero no decir</MenuItem>
              </Select>
            </FormControl>
            <TextField
              label="Dirección"
              fullWidth
              value={formData.address || ''}
              onChange={(e) => onFormChange('address', e.target.value)}
              error={!!errors.address}
              helperText={errors.address || 'Dirección completa (opcional)'}
              inputProps={{ maxLength: 200 }}
              placeholder="Ej: Calle 123, Ciudad, País"
            />
          </Box>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PatientInformation
