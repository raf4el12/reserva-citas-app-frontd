import { LinearProgress } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import PatientsListTable from '../../components/patients/PatientsListTable'
import { usePatients } from '../../hook/patients/usePatients'

const PatientPage = () => {
  const navigate = useNavigate()
  const { data: patients = [], isPending } = usePatients()

  const handleDelete = (id: number) => {
    // Implementar lógica de eliminación
    console.log('Eliminar paciente:', id)
  }

  const handleAdd = () => {
    navigate('/admin/patients/new')
  }

  if (isPending) return <LinearProgress />

  return (
    <PatientsListTable 
      patients={patients} 
      onDelete={handleDelete}
      onAdd={handleAdd}
      loading={isPending}
    />
  )
}

export default PatientPage