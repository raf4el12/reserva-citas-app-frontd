import { Box, LinearProgress, Typography } from '@mui/material'
import Layout from '../components/Layout'
import { useCategories } from '../hook/categories/useCategories'
import CardNew from '../components/commons/CardNew'
import ClientCard from '../components/category/CategoryCard'
import { useLoginMutation } from '../hook/auth/useLogin'
import { useState } from 'react'

const CategoryPage = () => {
  const { isPending, ...clients } = useCategories()
  const mutation = useLoginMutation()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handlerLogin = () => {
    mutation.mutateAsync({
      email,
      password
    })
  }

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
          clients?.data && clients?.data?.map((item, index) => (
            <div
              key={`client-card-${index}`}>
                <ClientCard
                  item={item} />
            </div>
          ))
        }
        <CardNew href='/categories/new' />
      </Box>
      <Box>
        <input onChange={(e) => setEmail(e.target.value)} />
        <input type='password' onChange={(e) => setPassword(e.target.value)} />
        <button type='button' onClick={handlerLogin} >Login</button>
      </Box>
    </Layout>
  )
}

export default CategoryPage