import { Box, LinearProgress, Typography } from '@mui/material'

import Layout from '../../components/Layout'
import { useCategories } from '../../hook/categories/useCategories'
import CardNew from '../../components/commons/CardNew'
import CategoryCard from '../../components/category/CategoryCard'

const CategoryPage = () => {
  const { isPending, ...categories } = useCategories()

  if (isPending) return (
    <Layout>
       <LinearProgress />
    </Layout>
  )

  return (
    <Layout>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 1
      }}>
        {
          !categories?.data && (
            <Typography variant="h4">No hay categorias</Typography>
          )
        }
        {
          categories?.data && categories?.data?.map((item, index) => (
            <div
              key={`category-card-${index}`}>
                <CategoryCard
                  item={item} />
            </div>
          ))
        }
        <CardNew href='/categories/new' />
      </Box>
    </Layout>
  )
}

export default CategoryPage