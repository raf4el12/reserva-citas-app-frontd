import { zodResolver } from '@hookform/resolvers/zod'
import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { z } from 'zod'

import { useCreateDoctor } from '../../hook/doctors/useCreatedDoctor'
import { useCreateProfiles } from '../../hook/profiles/useCreatedProfiles'
import { useSpecialties } from '../../hook/specialties/useSpecialties'
import { useCreateDoctorSpecialty } from '../../hook/doctors/useCreateDoctorSpecialty'

import { doctorCreateSchema } from '../../types/doctors'
import { type ProfileCreateDto, profileCreateSchema } from '../../types/profile'
import CardTitle from '../commons/CardTitle'
import ProfileEdit from '../profiles/ProfileEdit'

type FormValues = ProfileCreateDto & {
  licenseNumber: string
  resume?: string | null
  specialtyIds: number[]
}

const DoctorEdit = () => {
  const navigate = useNavigate()
  const createDoctor = useCreateDoctor()
  const createProfile = useCreateProfiles()
  const createDoctorSpecialty = useCreateDoctorSpecialty()

  const { data: specialties, isLoading, isError } = useSpecialties()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(
      profileCreateSchema.extend({
        licenseNumber: doctorCreateSchema.shape.licenseNumber,
        resume: doctorCreateSchema.shape.resume,
        specialtyIds: z
          .array(z.number().int())
          .min(1, { message: 'Debe seleccionar al menos una especialidad' }),
      })
    ),
    defaultValues: {
      specialtyIds: [],
      name: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      birthday: '',
      gender: '',
      licenseNumber: '',
      resume: '',
    },
  })

  const selectedSpecialtyIds = useWatch({
    control,
    name: 'specialtyIds',
  })

  const onSubmit = async (data: FormValues) => {
    // Paso 1: Crear el perfil del doctor
    createProfile.mutate(data, {
      onSuccess: (profile) => {
        const doctorDataToSend = {
          profileId: profile.id,
          licenseNumber: data.licenseNumber,
          resume: data.resume,
        }

        createDoctor.mutate(doctorDataToSend, {
          onSuccess: (newDoctor) => {
            if (data.specialtyIds && data.specialtyIds.length > 0) {
              const specialtyCreationPromises = data.specialtyIds.map(
                async (specialtyId) => {
                  console.log(
                    `Creando relación DoctorsSpecialty para doctorId: ${newDoctor.id} y specialtyId: ${specialtyId}`
                  )
                  return createDoctorSpecialty.mutateAsync({
                    doctorId: newDoctor.id,
                    specialtyId,
                  })
                }
              )

              Promise.all(specialtyCreationPromises)
                .then(() => {
                  console.log(
                    'Todas las relaciones de especialidad se han creado exitosamente.'
                  )
                  navigate('/admin/doctors')
                })
                .catch((relationErr: any) => {
                  console.error(
                    'Error al crear relaciones de especialidad:',
                    relationErr
                  )
                  setError('root', {
                    message:
                      relationErr?.message ||
                      'Error al crear relaciones de especialidad. Intente nuevamente.',
                  })
                })
            } else {
              console.log(
                'No se seleccionaron especialidades. Navegando directamente.'
              )
              navigate('/admin/doctors')
            }
          },
          onError: (err: any) => {
            console.error('Error al crear el doctor:', err)
            setError('root', {
              message: err?.message || 'Error al crear el doctor',
            })
          },
        })
      },
      onError: (err: any) => {
        console.error('Error al crear el perfil:', err)
        setError('root', {
          message: err?.message || 'Error al crear el perfil',
        })
      },
    })
  }

  if (isLoading || !Array.isArray(specialties)) {
    return <div>Cargando especialidades...</div>
  }

  if (isError) {
    return <div>Error al cargar las especialidades.</div>
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle title="Nuevo Médico" to="/admin/doctors" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileEdit register={register} errors={errors} />
          <div>
            <TextField
              label="Número de licencia"
              fullWidth
              {...register('licenseNumber')}
              error={!!errors.licenseNumber}
              helperText={errors.licenseNumber?.message}
              size="small"
            />
          </div>
          <div>
            <TextField
              label="Resumen"
              fullWidth
              {...register('resume')}
              error={!!errors.resume}
              helperText={errors.resume?.message}
              size="small"
            />
          </div>
          <div>
            <FormControl
              fullWidth
              margin="normal"
              error={!!errors.specialtyIds}
            >
              <InputLabel id="specialties-label">Especialidades</InputLabel>
              <Controller
                name="specialtyIds"
                control={control}
                render={({ field }) => (
                  <Select
                    labelId="specialties-label"
                    id="specialties-select"
                    multiple
                    label="Especialidades"
                    value={field.value}
                    onChange={(event) => {
                      const value = event.target.value
                      const newSelectedIds = Array.isArray(value) ? value : []
                      field.onChange(newSelectedIds)
                    }}
                    onBlur={field.onBlur}
                    name={field.name}
                    renderValue={(selectedIds: number[]) => {
                      return specialties
                        .filter((spec) => selectedIds.includes(spec.id))
                        .map((spec) => spec.name)
                        .join(', ')
                    }}
                  >
                    {specialties.map((spec) => (
                      <MenuItem key={spec.id} value={spec.id}>
                        <Checkbox
                          checked={selectedSpecialtyIds.includes(spec.id)}
                        />
                        <ListItemText primary={spec.name} />
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
              {errors.specialtyIds && (
                <FormHelperText>{errors.specialtyIds.message}</FormHelperText>
              )}
            </FormControl>
          </div>
        </div>
        {errors.root && (
          <Alert severity="error" className="mt-2">
            {errors.root.message}
          </Alert>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            variant="outlined"
            color="secondary"
            component={Link}
            to="/admin/doctors"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={
              isSubmitting ||
              createProfile.isPending ||
              createDoctor.isPending ||
              createDoctorSpecialty.isPending
            }
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default DoctorEdit
