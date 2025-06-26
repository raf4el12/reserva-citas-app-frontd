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
          <Typography variant="subtitle1">
            <strong>Fecha de nacimiento:</strong> {data.birthday ? data.birthday : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Género:</strong> {data.gender ? data.gender : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Nacionalidad:</strong> {data.national ? data.national : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Foto:</strong> {data.photo ? <img src={data.photo} alt="Foto" width={60} /> : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Teléfono:</strong> {data.phone ? data.phone : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Dirección:</strong> {data.address ? data.address : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Tipo de perfil (ID):</strong> {data.typeProfileId ?? 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Tipo de documento:</strong> {data.typeDocument ? data.typeDocument : 'No registrado'}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Número de documento:</strong> {data.numberDocument ? data.numberDocument : 'No registrado'}
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="outlined"
            onClick={() => navigate(-1)}
          >
            Volver
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}
export default ProfilesDetailPage