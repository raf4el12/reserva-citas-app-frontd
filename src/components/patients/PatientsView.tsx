import { LinearProgress } from '@mui/material'
import type { FC } from 'react'

import { useGetPatientsById } from '../../hook/patients/usePatientsById.ts'
import CardTitle from '../commons/CardTitle'
import TextItem from '../commons/TextItem'

interface PatientViewProps {
  id: number
}

const PatientView: FC<PatientViewProps> = ({ id }) => {
  const { isLoading, data, error } = useGetPatientsById(id)

  if (isLoading) return <LinearProgress /> // Muestra el progreso de carga
  if (error instanceof Error) return <div>Error al cargar los datos del paciente: {error.message}</div>
  if (!data) return <div>No se encontró información para el paciente con ID {id}</div>

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle
        title={`${data?.profile.name || 'Nombre no disponible'} ${data?.profile.lastName || 'Apellido no disponible'}`}
        to="/admin/patients"
      />
      <TextItem text={id} title="ID" />
      <TextItem text={data?.emergencyContact || 'No disponible'} title="Contacto de emergencia" />
      <TextItem text={data?.bloodType || 'No disponible'} title="Tipo de sangre" />
      <TextItem text={data?.allergies || 'No tiene alergias registradas'} title="Alergias" />
      <TextItem text={data?.chronic_conditions || 'No tiene condiciones crónicas registradas'} title="Condiciones crónicas" />
    </div>
  )
}

export default PatientView
