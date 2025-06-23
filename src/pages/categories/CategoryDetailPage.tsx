import { LinearProgress, Typography } from '@mui/material'
import { useParams } from 'react-router'

import Layout from '../../components/layout/Layout'
import { useGetCategoryById } from '../../hook/categories/useCategoriesById'

const CategoryDetailPage = () => {
  const { id } = useParams<{ id: string }>()
  const { isPending, data } = useGetCategoryById(Number(id))

  if (isPending)
    return (
      <Layout>
        <LinearProgress />
      </Layout>
    )

  return (
    <Layout>
      <Typography variant="h4">Detalle cliente</Typography>
      <Typography variant="h5">Cliente: {data?.name} </Typography>
      <Typography>Fecha creación: {data?.createdAt}</Typography>
      <Typography>ID: {id}</Typography>
    </Layout>
  )
}

export default CategoryDetailPage
