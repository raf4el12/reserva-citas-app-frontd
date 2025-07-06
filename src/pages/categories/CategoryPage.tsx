import { Box, LinearProgress, Typography } from '@mui/material'

import CategoryItems from '../../components/categories/CategoryItems'
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
      <CategoryItems categories={categories?.data ?? []} />
    </Box>
  )
}

export default CategoryPage
