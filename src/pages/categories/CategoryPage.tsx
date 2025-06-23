import { Box, LinearProgress, Typography } from '@mui/material'

import CategoryCard from '../../components/category/CategoryCard'
import CardNew from '../../components/commons/CardNew'
import { useCategories } from '../../hook/categories/useCategories'

const CategoryPage = () => {
  const { isPending, ...categories } = useCategories()

  if (isPending) return <LinearProgress />

  return (
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
  )
}

export default CategoryPage
