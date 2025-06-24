import { Box, Button, Card, CardContent, LinearProgress, Typography } from '@mui/material'
import { useParams, useNavigate } from 'react-router-dom'
import { useGetCategoryById } from '../../hook/categories/useCategoriesById'

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { isPending, data } = useGetCategoryById(Number(id))

  if (isPending) return <LinearProgress />

  return (
    <Box maxWidth={400} mx="auto" mt={4}>
      <Card>
        <CardContent>
          <Typography variant="h5" mb={2}>
            Detalle de Categoría
          </Typography>
          <Typography variant="subtitle1">
            <strong>ID:</strong> {data?.id}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Nombre Categoría:</strong> {data?.name}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Fecha creación:</strong> {data?.createdAt}
          </Typography>
          <Button sx={{ mt: 2 }} variant="outlined" onClick={() => navigate(-1)}>
            VOLVER
          </Button>
        </CardContent>
      </Card>
    </Box>
  )
}

export default CategoryDetailPage