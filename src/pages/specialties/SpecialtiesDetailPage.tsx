import { Box, Button, Card, CardContent, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetSpecialtyById } from '../../hook/specialties/useSpecialtiesById'
import { useCategories } from '../../hook/categories/useCategories'

const SpecialtiesDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const specialtyId = Number(id)
  const { data, isLoading, isError } = useGetSpecialtyById(specialtyId)
  const { data: categories } = useCategories()

  if (isLoading) return <div>Cargando...</div>
  if (isError || !data) return <div>No se encontró la especialidad.</div>

  // Buscar el nombre de la categoría por categoryId
  const categoryName =
    categories?.find(cat => cat.id === data.categoryId)?.name ?? 'Sin categoría'

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
            <strong>Categoría:</strong> {categoryName}
          </Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate(-1)}>
            VOLVER
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default SpecialtiesDetailPage