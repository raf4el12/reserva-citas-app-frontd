import { zodResolver } from '@hookform/resolvers/zod'
import { Alert, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import { useCreatePatients } from '../../hook/patients/useCreatedPatients'
import { useCreateProfiles } from '../../hook/profiles/useCreatedProfiles'
import { patientsCreateSchema } from '../../types/patients'
import { type ProfileCreateDto, profileCreateSchema } from '../../types/profile'
import CardTitle from '../commons/CardTitle'
import ProfileEdit from '../profiles/ProfileEdit'

type FormValues = ProfileCreateDto & {
  emergencyContact: string
  bloodType: string
  allergies?: string | null
  chronic_conditions?: string | null
}

const PatientsEdit = () => {
  const navigate = useNavigate()
  const createPatients = useCreatePatients()
  const createProfile = useCreateProfiles()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(
      profileCreateSchema.extend({
        emergencyContact: patientsCreateSchema.shape.emergencyContact,
        bloodType: patientsCreateSchema.shape.bloodType,
        allergies: patientsCreateSchema.shape.allergies,
        chronic_conditions: patientsCreateSchema.shape.chronic_conditions,
      })
    ),
  })

  const onSubmit = async (data: FormValues) => {
    createProfile.mutate(data, {
      onSuccess: (profile) => {
        createPatients.mutate(
          {
            profileId: profile.id,
            emergencyContact: data.emergencyContact,
            bloodType: data.bloodType,
            allergies: data.allergies,
            chronic_conditions: data.chronic_conditions,
          },
          {
            onSuccess: () => {
              navigate('/admin/patients')
            },
            onError: (err: any) => {
              setError('root', {
                message: err?.message || 'Error al crear el paciente',
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
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle title="Nuevo Paciente" to="/admin/patients" />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <ProfileEdit register={register} errors={errors} />
          <div>
            <TextField
              label="Número de contacto de emergencia"
              fullWidth
              {...register('emergencyContact')}
              error={!!errors.emergencyContact}
              helperText={errors.emergencyContact?.message}
              size="small"
            />
          </div>
          <div>
            <TextField
              label="Tipo de sangre"
              fullWidth
              {...register('bloodType')}
              error={!!errors.bloodType}
              helperText={errors.bloodType?.message}
              size="small"
            />
          </div>
          <div>
            <TextField
              label="Alergias"
              fullWidth
              {...register('allergies')}
              error={!!errors.allergies}
              helperText={errors.allergies?.message}
              size="small"
            />
          </div>
          <div>
            <TextField
              label="Condiciones crónicas"
              fullWidth
              {...register('chronic_conditions')}
              error={!!errors.chronic_conditions}
              helperText={errors.chronic_conditions?.message}
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
            to="/admin/patients"
          >
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            disabled={isSubmitting || createPatients.isPending}
          >
            Guardar
          </Button>
        </div>
      </form>
    </div>
  )
}

export default PatientsEdit
