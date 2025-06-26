import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfileById } from '../../hook/profiles/useProfilesById'
import { useUpdateProfile } from '../../hook/profiles/useProfilesUpdate'

const ProfilesUpdatePage = () => {
  const { id } = useParams<{ id: string }>()
  const profileId = Number(id)
  const { data, isLoading } = useProfileById(profileId)
  const updateProfile = useUpdateProfile()
  const navigate = useNavigate()

  // Estado para los campos editables
  const [form, setForm] = useState({
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
  })

  // Cargar datos actuales al montar
  useEffect(() => {
    if (data) {
      setForm({
        name: data.name ?? '',
        lastName: data.lastName ?? '',
        email: data.email ?? '',
        birthday: data.birthday ?? '',
        gender: data.gender ?? '',
        national: data.national ?? '',
        photo: data.photo ?? '',
        phone: data.phone ?? '',
        address: data.address ?? '',
        typeProfileId: data.typeProfileId ? String(data.typeProfileId) : '',
        typeDocument: data.typeDocument ?? '',
        numberDocument: data.numberDocument ?? '',
      })
    }
  }, [data])

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [field]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await updateProfile.mutateAsync({
      id: profileId,
      ...form,
      typeProfileId: form.typeProfileId ? Number(form.typeProfileId) : null,
    })
    navigate('/admin/profiles')
  }

  if (isLoading) return <div>Cargando...</div>
  if (!data) return <div>No se encontró el perfil.</div>

  return (
    <Box maxWidth={500} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Editar Perfil
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              value={form.name}
              onChange={handleChange('name')}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Apellido"
              value={form.lastName}
              onChange={handleChange('lastName')}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={form.email}
              onChange={handleChange('email')}
              type="email"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Fecha de nacimiento"
              value={form.birthday}
              onChange={handleChange('birthday')}
              type="date"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Género"
              value={form.gender}
              onChange={handleChange('gender')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Nacionalidad"
              value={form.national}
              onChange={handleChange('national')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Foto (URL)"
              value={form.photo}
              onChange={handleChange('photo')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Teléfono"
              value={form.phone}
              onChange={handleChange('phone')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Dirección"
              value={form.address}
              onChange={handleChange('address')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tipo de perfil (ID)"
              value={form.typeProfileId}
              onChange={handleChange('typeProfileId')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Tipo de documento"
              value={form.typeDocument}
              onChange={handleChange('typeDocument')}
            />
            <TextField
              fullWidth
              margin="normal"
              label="Número de documento"
              value={form.numberDocument}
              onChange={handleChange('numberDocument')}
            />
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
                disabled={updateProfile.isPending}
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