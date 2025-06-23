import { LinearProgress, Typography } from '@mui/material'
import { useParams } from 'react-router'
import { useGetCategoryById } from '../../hook/categories/useCategoriesById'

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { isPending, data } = useGetCategoryById(Number(id))

  if (isPending) return <LinearProgress />

  return (
    <>
      <Typography variant="h4">Detalle cliente</Typography>
      <Typography variant="h5">Cliente: {data?.name} </Typography>
      <Typography>Fecha creación: {data?.createdAt}</Typography>
      <Typography>ID: {id}</Typography>
    </>
  )
}

export default CategoryDetailPage
