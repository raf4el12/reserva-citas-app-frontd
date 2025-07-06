import { Box, LinearProgress, Typography } from '@mui/material'

import CardNew from '../../components/commons/CardNew'
import DoctorCard from '../../components/doctors/DoctorCard'
import { useDoctors } from '../../hook/doctors/useDoctors'

const DoctorPage = () => {
  const { isPending, ...doctors } = useDoctors()

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
      {!doctors?.data && <Typography variant="h4">No hay medicos</Typography>}
      {doctors?.data?.map((item, index) => (
        <div key={`doctor-card-${index}`}>
          <DoctorCard item={item} />
        </div>
      ))}
      <CardNew href="/admin/doctors/new" />
    </Box>
  )
}

export default DoctorPage
