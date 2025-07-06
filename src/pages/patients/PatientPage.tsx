import { Box, LinearProgress, Typography } from '@mui/material'

import CardNew from '../../components/commons/CardNew'
import PatientCard from '../../components/patients/PatientsCard'
import { usePatients } from '../../hook/patients/usePatients'

const PatientPage = () => {
  const { isPending, ...patients } = usePatients()

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
      {!patients?.data && (
        <Typography variant="h4">No hay pacientes</Typography>
      )}
      {patients?.data?.map((item, index) => (
        <div key={`patient-card-${index}`}>
          <PatientCard item={item} />
        </div>
      ))}
      <CardNew href="/admin/patients/new" />
    </Box>
  )
}

export default PatientPage
