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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { useCreateDoctor } from '../../hook/doctors/useCreatedDoctor'
import { useCreateProfiles } from '../../hook/profiles/useCreatedProfiles'
import { doctorCreateSchema } from '../../types/doctor'
import { type ProfileCreateDto, profileCreateSchema } from '../../types/profile'
import ProfileEdit from '../profiles/ProfileEdit'

type FormValues = ProfileCreateDto & {
  licenseNumber: string
  resume?: string | null
}

const DoctorEdit = () => {
  const navigate = useNavigate()
  const createDoctor = useCreateDoctor()
  const createProfile = useCreateProfiles()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
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
              navigate('/admin/doctors')
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
            Nuevo Médico
          </Typography>
          <IconButton size="small" component={Link} to="/admin/doctors">
            <CloseIcon />
          </IconButton>
        </div>
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
