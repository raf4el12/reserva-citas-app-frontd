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
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import FormFieldError from '../../components/commons/FormFieldError'
import useAuthContext from '../../context/AuthContext'
import { useCreateProfile } from '../../hook/profiles/useProfilesCreate'
import { type ProfileForm, profileSchema } from '../../types/profileSchema'

const ProfilesCreatePage = () => {
  const { user } = useAuthContext()
  const createProfile = useCreateProfile()
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileForm>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: '',
      lastName: '',
      email: '',
      birthday: '',
      gender: '',
      national: '',
      photo: '',
      phone: '',
      address: '',
      typeProfileId: '',
      typeDocument: '',
      numberDocument: '',
    },
  })

  const onSubmit = async (form: ProfileForm) => {
    if (!user?.id) {
      alert('No se encontró el usuario. No se puede crear el perfil.')
      return
    }

    await createProfile.mutateAsync({
      ...form,
      userId: user.id,
      birthday: form.birthday
        ? new Date(form.birthday).toISOString()
        : undefined,
      photo: form.photo ? form.photo : undefined,
      typeProfileId: form.typeProfileId ? Number(form.typeProfileId) : null,
    })
    navigate('/admin/profiles')
  }

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Nuevo Perfil
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
            <Box display="flex" justifyContent="flex-end" mt={2}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting || createProfile.isPending}
              >
                Crear
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilesCreatePage
