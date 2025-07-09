import { Box, LinearProgress, Typography } from '@mui/material'

import CardNew from '../../components/commons/CardNew'
import AppointmentCard from '../../components/appointments/AppointmentsCard'
import { useAppointments } from '../../hook/appointments/useAppointments'

const AppointmentPage = () => {
  const { isPending, ...appointments } = useAppointments()

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
      {!appointments?.data && <Typography variant="h4">No hay citas</Typography>}
      {appointments?.data?.map((item, index) => (
        <div key={`appointment-card-${index}`}>
          <AppointmentCard item={item} />
        </div>
      ))}
      <CardNew href="/admin/appointments/new" />
    </Box>
  )
}

export default AppointmentPage
