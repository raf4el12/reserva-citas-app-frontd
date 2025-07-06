import { zodResolver } from '@hookform/resolvers/zod'
import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import FormFieldError from '../../components/commons/FormFieldError'
import { useProfileById } from '../../hook/profiles/useProfilesById'
import { useUpdateProfile } from '../../hook/profiles/useProfilesUpdate'
import {
  type Profile,
  profileSchema,
  type UpdateProfileDto,
} from '../../types/profile'

const ProfilesUpdatePage = () => {
  const { id } = useParams<{ id: string }>()
  const profileId = Number(id)
  const { data, isLoading } = useProfileById(profileId)
  const updateProfile = useUpdateProfile()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Profile>({
    resolver: zodResolver(profileSchema),
  })

  // Cuando llegan los datos, los seteamos en el formulario
  useEffect(() => {
    if (data) {
      reset(data)
    }
  }, [data, reset])

  const onSubmit = async (form: UpdateProfileDto) => {
    await updateProfile.mutateAsync({
      id: profileId,
      ...form,
      photo: form.photo ? form.photo : undefined,
      typeProfileId: form.typeProfileId ? Number(form.typeProfileId) : null,
    })
    navigate('/admin/profiles')
  }

  if (isLoading) return <div>Cargando...</div>
  if (!data) return <div>No se encontró el perfil.</div>

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Editar Perfil
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nombre"
                  {...register('name')}
                  error={!!errors.name}
                  required
                />
                {errors.name && (
                  <FormFieldError>{errors.name.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Apellido"
                  {...register('lastName')}
                  error={!!errors.lastName}
                  required
                />
                {errors.lastName && (
                  <FormFieldError>{errors.lastName.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  type="email"
                  required
                />
                {errors.email && (
                  <FormFieldError>{errors.email.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Fecha de nacimiento"
                  {...register('birthday')}
                  type="date"
                  InputLabelProps={{ shrink: true }}
                />
                {errors.birthday && (
                  <FormFieldError>{errors.birthday.message}</FormFieldError>
                )}
                <TextField
                  select
                  fullWidth
                  margin="normal"
                  label="Género"
                  {...register('gender')}
                  error={!!errors.gender}
                  defaultValue=""
                >
                  <MenuItem value="">Selecciona una opción</MenuItem>
                  <MenuItem value="Femenino">Femenino</MenuItem>
                  <MenuItem value="Masculino">Masculino</MenuItem>
                  <MenuItem value="Otro">Otro</MenuItem>
                </TextField>
                {errors.gender && (
                  <FormFieldError>{errors.gender.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Nacionalidad"
                  {...register('national')}
                />
                {errors.national && (
                  <FormFieldError>{errors.national.message}</FormFieldError>
                )}
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  margin="normal"
                  label="Foto (URL)"
                  {...register('photo')}
                />
                {errors.photo && (
                  <FormFieldError>{errors.photo.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Teléfono"
                  {...register('phone')}
                />
                {errors.phone && (
                  <FormFieldError>{errors.phone.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Dirección"
                  {...register('address')}
                />
                {errors.address && (
                  <FormFieldError>{errors.address.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tipo de perfil (ID)"
                  {...register('typeProfileId')}
                />
                {errors.typeProfileId && (
                  <FormFieldError>
                    {errors.typeProfileId.message}
                  </FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Tipo de documento"
                  {...register('typeDocument')}
                />
                {errors.typeDocument && (
                  <FormFieldError>{errors.typeDocument.message}</FormFieldError>
                )}
                <TextField
                  fullWidth
                  margin="normal"
                  label="Número de documento"
                  {...register('numberDocument')}
                />
                {errors.numberDocument && (
                  <FormFieldError>
                    {errors.numberDocument.message}
                  </FormFieldError>
                )}
              </Grid>
            </Grid>
            <Box display="flex" gap={2} mt={2}>
              <Button
                type="button"
                variant="outlined"
                onClick={() => navigate('/admin/profiles')}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || updateProfile.isPending}
              >
                Guardar
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilesUpdatePage
