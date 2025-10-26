'use client'

// React Imports
import { useState } from 'react'
import type { SyntheticEvent } from 'react'

import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Divider from '@mui/material/Divider'
import FormControl from '@mui/material/FormControl'
// MUI Imports
import Grid from '@mui/material/Grid2'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

// Types
import type { DoctorCreate } from '../../../types/doctors/doctorSchema'

interface DoctorVariantsProps {
  formData: Partial<DoctorCreate>
  onFormChange: (field: keyof DoctorCreate, value: any) => void
  errors?: Record<string, string>
  specialties?: Array<{ id: number; name: string; description?: string }>
}

const DoctorVariants = ({
  formData,
  onFormChange,
  errors = {},
  specialties = [],
}: DoctorVariantsProps) => {
  // States
  const [specialtyCount, setSpecialtyCount] = useState(
    formData.specialtyIds?.length || 1
  )

  const deleteSpecialty = (e: SyntheticEvent, index: number) => {
    e.preventDefault()

    const currentSpecialties = formData.specialtyIds || []
    const newSpecialties = currentSpecialties.filter((_, i) => i !== index)
    onFormChange('specialtyIds', newSpecialties)

    if (specialtyCount > 1) {
      setSpecialtyCount(specialtyCount - 1)
    }
  }

  const addSpecialty = () => {
    setSpecialtyCount(specialtyCount + 1)
    const currentSpecialties = formData.specialtyIds || []
    onFormChange('specialtyIds', [...currentSpecialties, ''])
  }

  const handleSpecialtyChange = (index: number, value: string | number) => {
    const currentSpecialties = formData.specialtyIds || []
    const newSpecialties = [...currentSpecialties]
    newSpecialties[index] = value
    onFormChange('specialtyIds', newSpecialties)
  }

  return (
    <Card>
      <CardHeader title="Especialidades Médicas" />
      <CardContent>
        <Grid container spacing={3}>
          {/* Header con descripción */}
          <Grid size={{ xs: 12 }}>
            <Typography
              variant="body2"
              color="text.secondary"
              className="mbe-3"
            >
              Selecciona las especialidades médicas del doctor. Puedes agregar
              múltiples especialidades.
            </Typography>
          </Grid>

          {/* Selectores de especialidades */}
          {Array.from(Array(specialtyCount).keys()).map((_, index) => (
            <Grid key={index} size={{ xs: 12 }}>
              <Grid container spacing={2} alignItems="flex-start">
                <Grid size={{ xs: 12, sm: 6 }}>
                  <FormControl
                    fullWidth
                    error={!!errors[`specialtyIds.${index}`]}
                  >
                    <InputLabel>Especialidad</InputLabel>
                    <Select
                      label="Especialidad"
                      value={formData.specialtyIds?.[index] || ''}
                      onChange={(e) =>
                        handleSpecialtyChange(index, e.target.value)
                      }
                    >
                      <MenuItem value="">
                        <em>Seleccionar especialidad</em>
                      </MenuItem>
                      {specialties.map((specialty) => (
                        <MenuItem key={specialty.id} value={specialty.id}>
                          {specialty.name}
                        </MenuItem>
                      ))}
                    </Select>
                    {errors[`specialtyIds.${index}`] && (
                      <Typography
                        variant="caption"
                        color="error"
                        className="mts-1"
                      >
                        {errors[`specialtyIds.${index}`]}
                      </Typography>
                    )}
                  </FormControl>
                </Grid>
                <Grid size={{ xs: 12, sm: 5 }}>
                  <TextField
                    fullWidth
                    label="Descripción"
                    value={
                      specialties.find(
                        (s) => s.id === formData.specialtyIds?.[index]
                      )?.description || ''
                    }
                    disabled
                    size="small"
                    helperText="Descripción de la especialidad"
                  />
                </Grid>
                <Grid size={{ xs: 12, sm: 1 }}>
                  {specialtyCount > 1 && (
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={(e) => deleteSpecialty(e, index)}
                      size="small"
                      sx={{ minWidth: 'fit-content' }}
                      startIcon={<i className="ri-close-line" />}
                    >
                      Eliminar
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Grid>
          ))}

          {/* Botón agregar especialidad */}
          <Grid size={{ xs: 12 }}>
            <Button
              variant="outlined"
              onClick={addSpecialty}
              startIcon={<i className="ri-add-line" />}
              disabled={specialties.length === 0}
            >
              Agregar Especialidad
            </Button>
            {specialties.length === 0 && (
              <Typography
                variant="caption"
                color="text.secondary"
                className="mli-2"
              >
                No hay especialidades disponibles
              </Typography>
            )}
          </Grid>

          {/* Resumen de especialidades seleccionadas */}
          {formData.specialtyIds && formData.specialtyIds.length > 0 && (
            <>
              <Grid size={{ xs: 12 }}>
                <Divider className="mbe-3 mte-2" />
              </Grid>
              <Grid size={{ xs: 12 }}>
                <Typography
                  variant="subtitle2"
                  className="mbe-2"
                  fontWeight={500}
                >
                  Especialidades Seleccionadas
                </Typography>
                <div className="flex flex-wrap gap-2">
                  {formData.specialtyIds
                    .filter((id) => id !== '' && id !== null)
                    .map((specialtyId, index) => {
                      const specialty = specialties.find(
                        (s) => s.id === specialtyId
                      )
                      return specialty ? (
                        <div
                          key={index}
                          className="flex items-center gap-2 px-3 py-1 border rounded-full bg-gray-50"
                        >
                          <Typography variant="body2">
                            {specialty.name}
                          </Typography>
                          <Button
                            size="small"
                            variant="text"
                            color="error"
                            onClick={(e) => deleteSpecialty(e, index)}
                            sx={{ minWidth: 'fit-content', p: 0.5 }}
                          >
                            <i className="ri-close-line text-sm" />
                          </Button>
                        </div>
                      ) : null
                    })}
                </div>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  )
}

export default DoctorVariants
