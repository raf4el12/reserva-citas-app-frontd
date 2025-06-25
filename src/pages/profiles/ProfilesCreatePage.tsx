import { Box, Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateProfile } from '../../hook/profiles/useProfilesCreate'
import useAuthContext from '../../context/AuthContext'

const ProfilesCreatePage = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const { user } = useAuthContext() // Asegúrate que user existe y tiene id
  const createProfile = useCreateProfile()
  const navigate = useNavigate()

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  if (!user?.id) {
    alert('No se encontró el usuario. No se puede crear el perfil.')
    return
  }
  await createProfile.mutateAsync({ name, lastName, email, userId: user.id })
  navigate('/admin/profiles')
}

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Nuevo Perfil
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Nombre"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Apellido"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              required
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={createProfile.isPending}
            >
              Crear
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilesCreatePage