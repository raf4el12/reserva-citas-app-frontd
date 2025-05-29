import { Box, LinearProgress, Typography } from '@mui/material'
import Layout from '../components/Layout'
import ClientCard from '../components/client/ClientCard'
import { useClient } from '../hook/useClient'
import CardNew from '../components/commons/CardNew'

const Client = () => {
  const { isPending, ...clients } = useClient()

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
            <ClientCard
              key={`client-card-${index}`}
              item={item} />
          ))
        }
        <CardNew href='/clients/new' />
      </Box>
    </Layout>
  )
}

export default Client