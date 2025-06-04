import { Box, LinearProgress, Typography } from '@mui/material'
import Layout from '../components/Layout'
import { useCategories } from '../hook/categories/useCategories'
import CardNew from '../components/commons/CardNew'
import ClientCard from '../components/category/CategoryCard'

const CategoryPage = () => {
  const { isPending, ...clients } = useCategories()

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
          !clients?.data && (
            <Typography variant="h4">No hay clientes</Typography>
          )
        }
        {
          clients?.data && clients.data.map((item, index) => (
            <div
              key={`client-card-${index}`}>
                <ClientCard
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