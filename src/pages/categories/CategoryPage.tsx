import { Box, LinearProgress, Typography } from '@mui/material'

import CategoryCard from '../../components/category/CategoryCard'
import CardNew from '../../components/commons/CardNew'
import Layout from '../../components/layout/Layout'
import { useCategories } from '../../hook/categories/useCategories'

const CategoryPage = () => {
  const { isPending, ...categories } = useCategories()

  if (isPending)
    return (
      <Layout>
        <LinearProgress />
      </Layout>
    )

  return (
    <Layout>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 1,
        }}
      >
        {!categories?.data && (
          <Typography variant="h4">No hay categorias</Typography>
        )}
        {categories?.data?.map((item, index) => (
          <div key={`category-card-${index}`}>
            <CategoryCard item={item} />
          </div>
        ))}
        <CardNew href="/admin/categories/new" />
      </Box>
    </Layout>
  )
}

export default CategoryPage
