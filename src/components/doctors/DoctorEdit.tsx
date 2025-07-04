import { zodResolver } from '@hookform/resolvers/zod'
import CloseIcon from '@mui/icons-material/Close'
import {
  Alert,
  Box,
  Button,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { useCreateDoctor } from '../../hook/doctors/useCreatedDoctor'
import { useCreateProfiles } from '../../hook/profiles/useCreatedProfiles'
import { doctorCreateSchema } from '../../types/doctor'
import { type ProfileCreateDto, profileCreateSchema } from '../../types/profile'

type FormValues = ProfileCreateDto & {
  licenseNumber: string
  resume?: string | null
}

const DoctorEdit = () => {
  const navigate = useNavigate()
  const [success, setSuccess] = useState(false)
  const createDoctor = useCreateDoctor()
  const createProfile = useCreateProfiles()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<FormValues>({
    resolver: zodResolver(
      profileCreateSchema.extend({
        licenseNumber: doctorCreateSchema.shape.licenseNumber,
        resume: doctorCreateSchema.shape.resume,
      })
    ),
  })

  const onSubmit = async (data: FormValues) => {
    createProfile.mutate(data, {
      onSuccess: (profile) => {
        createDoctor.mutate(
          {
            profileId: profile.id,
            licenseNumber: data.licenseNumber,
            resume: data.resume,
          },
          {
            onSuccess: () => {
              setSuccess(true)
              reset()
              setTimeout(() => navigate('/admin/doctors'), 1200)
            },
            onError: (err: any) => {
              setError('root', {
                message: err?.message || 'Error al crear el doctor',
              })
            },
          }
        )
      },
      onError: (err: any) => {
        setError('root', {
          message: err?.message || 'Error al crear el perfil',
        })
      },
    })
  }

  return (
    <Box className="max-w-2xl mx-auto mt-10">
      <Paper className="p-8 rounded-xl shadow-lg border border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <Typography variant="h5" className="font-bold text-primary">
            Nuevo Doctor
          </Typography>
          <IconButton size="small" component={Link} to="/admin/doctors">
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <TextField
                label="Nombre"
                fullWidth
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Apellido"
                fullWidth
                {...register('lastName')}
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Correo electrónico"
                fullWidth
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Teléfono"
                fullWidth
                {...register('phone')}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Dirección"
                fullWidth
                {...register('address')}
                error={!!errors.address}
                helperText={errors.address?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Nacionalidad"
                fullWidth
                {...register('national')}
                error={!!errors.national}
                helperText={errors.national?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Tipo de documento"
                fullWidth
                {...register('typeDocument')}
                error={!!errors.typeDocument}
                helperText={errors.typeDocument?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Número de documento"
                fullWidth
                {...register('numberDocument')}
                error={!!errors.numberDocument}
                helperText={errors.numberDocument?.message}
                size="small"
              />
            </div>
            <div>
              <TextField
                label="Fecha de nacimiento"
                type="date"
                fullWidth
                {...register('birthday')}
                error={!!errors.birthday}
                helperText={errors.birthday?.message}
                size="small"
                InputLabelProps={{ shrink: true }}
              />
            </div>
            <div>
              <TextField
                label="Género"
                fullWidth
                {...register('gender')}
                error={!!errors.gender}
                helperText={errors.gender?.message}
                size="small"
              />
            </div>
            {/* Campos Doctor */}
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
          </div>
          {errors.root && (
            <Alert severity="error" className="mt-2">
              {errors.root.message}
            </Alert>
          )}
          {success && (
            <Alert severity="success" className="mt-2">
              ¡Doctor creado exitosamente!
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
                createDoctor.isPending
              }
            >
              Guardar
            </Button>
          </div>
        </form>
      </Paper>
    </Box>
  )
}

export default DoctorEdit
