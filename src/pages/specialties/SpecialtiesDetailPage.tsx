import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useNavigate, useParams } from 'react-router-dom'
import { useGetSpecialtyById } from '../../hook/specialties/useSpecialtiesById'

const SpecialtiesDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const specialtyId = Number(id)
  const { data, isLoading, isError } = useGetSpecialtyById(specialtyId)

  if (isLoading) return <div>Cargando...</div>
  if (isError || !data) return <div>No se encontró la especialidad.</div>

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Detalle de Especialidad
          </Typography>
          <Typography variant="subtitle1">
            <strong>ID:</strong> {data.id}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Nombre Especialidad:</strong> {data.name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Categoría:</strong> {data.category?.name ?? 'Sin categoría'}
          </Typography>
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

export default SpecialtiesDetailPage
