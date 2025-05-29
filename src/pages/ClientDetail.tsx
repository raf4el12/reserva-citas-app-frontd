import { LinearProgress, Typography } from "@mui/material"
import Layout from "../components/Layout"
import { useParams } from "react-router"
import { useClientById } from "../hook/useClientById"

const ClientDetail = () => {
  const { id } = useParams<{ id: string }>()
  const { isPending, data } = useClientById(id)

  if (isPending) return (
    <Layout>
       <LinearProgress />
    </Layout>
  )

  return (
    <Layout>
      <Typography variant="h4">Detalle cliente</Typography>
      <Typography variant="h5">Cliente: {`${data?.name} ${data?.lastName}`}</Typography>
      <Typography>Fecha creación: {data?.createdAt}</Typography>
      <Typography>ID: {id}</Typography>
      <Typography>Email: {data?.email}</Typography>
      <Typography>Cumpleaños: {data?.birthday}</Typography>
    </Layout>
  )
}

export default ClientDetail