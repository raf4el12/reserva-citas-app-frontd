import {
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

interface PatientMedicalInfoProps {
  formData: any
  onFormChange: (field: string, value: any) => void
  errors: Record<string, string>
}

const PatientMedicalInfo = ({
  formData,
  onFormChange,
  errors,
}: PatientMedicalInfoProps) => {
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-']

  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Información Médica
        </Typography>
        <Stack spacing={3}>
          {/* Contacto de emergencia */}
          <TextField
            label="Contacto de emergencia"
            fullWidth
            value={formData.emergencyContact || ''}
            onChange={(e) => onFormChange('emergencyContact', e.target.value)}
            error={!!errors.emergencyContact}
            helperText={
              errors.emergencyContact ||
              'Campo requerido - Nombre y teléfono de contacto'
            }
            required
            inputProps={{ maxLength: 100 }}
            placeholder="Ej: María García - +1 234 567 8900"
          />

          {/* Tipo de sangre */}
          <FormControl fullWidth required error={!!errors.bloodType}>
            <InputLabel>Tipo de sangre</InputLabel>
            <Select
              value={formData.bloodType || ''}
              onChange={(e) => onFormChange('bloodType', e.target.value)}
              error={!!errors.bloodType}
              label="Tipo de sangre"
            >
              {bloodTypes.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
            {errors.bloodType && (
              <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>
                {errors.bloodType}
              </Typography>
            )}
            {!errors.bloodType && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ mt: 1, ml: 2 }}
              >
                Campo requerido - Selecciona el tipo de sangre del paciente
              </Typography>
            )}
          </FormControl>

          {/* Alergias */}
          <TextField
            label="Alergias"
            fullWidth
            multiline
            rows={3}
            value={formData.allergies || ''}
            onChange={(e) => onFormChange('allergies', e.target.value)}
            error={!!errors.allergies}
            helperText={
              errors.allergies ||
              'Especifica las alergias conocidas del paciente (opcional)'
            }
            placeholder="Ej: Penicilina, polen, mariscos, látex..."
            inputProps={{ maxLength: 500 }}
          />

          {/* Condiciones crónicas */}
          <TextField
            label="Condiciones crónicas"
            fullWidth
            multiline
            rows={3}
            value={formData.chronic_conditions || ''}
            onChange={(e) => onFormChange('chronic_conditions', e.target.value)}
            error={!!errors.chronic_conditions}
            helperText={
              errors.chronic_conditions ||
              'Especifica las condiciones médicas crónicas (opcional)'
            }
            placeholder="Ej: Diabetes tipo 2, hipertensión, asma, artritis..."
            inputProps={{ maxLength: 500 }}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PatientMedicalInfo
