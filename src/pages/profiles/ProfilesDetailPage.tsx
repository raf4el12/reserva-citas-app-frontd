import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useProfileById } from '../../hook/profiles/useProfilesById'

const ProfilesDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const profileId = Number(id)
  const { data, isLoading, isError } = useProfileById(profileId)

  if (isLoading) return <div>Cargando...</div>
  if (isError || !data) return <div>No se encontró el perfil.</div>

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Detalle de Perfil
          </Typography>
          <Typography variant="subtitle1">
            <strong>ID:</strong> {data.id}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Nombre:</strong> {data.name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Apellido:</strong> {data.lastName}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Email:</strong> {data.email}
          </Typography>
          {/* Agrega aquí más campos si tu modelo de perfil los tiene */}
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            VOLVER
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ProfilesDetailPage