import { Alert, LinearProgress } from '@mui/material'
import type { FC } from 'react'
import { useGetAppointmentsById } from '../../hook/appointments/useAppointmentsById' // Usamos el hook para obtener la cita
import CardTitle from '../commons/CardTitle'
import TextItem from '../commons/TextItem'

interface AppointmentViewProps {
  id: number
}

const AppointmentView: FC<AppointmentViewProps> = ({ id }) => {
  const {
    isPending,
    data: appointment,
    isError,
    error,
  } = useGetAppointmentsById(id) // Obtener la cita

  if (isPending) return <LinearProgress /> // Mientras se carga la cita

  if (isError) {
    return (
      <Alert severity="error">
        Error al cargar los detalles de la cita:{' '}
        {error instanceof Error ? error.message : 'Error desconocido'}
      </Alert>
    )
  }

  if (!appointment) {
    return <div>No se encontró información para la cita con ID {id}.</div>
  }

  // Usar template literals en lugar de concatenación
  const patientName = `${appointment.patient?.profile?.name || 'Paciente no asignado'} ${appointment.patient?.profile?.lastName || ''}`
  const specialtyName =
    appointment.schedule?.specialty?.name || 'Especialidad no asignada'
  const doctorName = `${appointment.schedule?.doctor?.profile?.name || 'Médico no asignado'} ${appointment.schedule?.doctor?.profile?.lastName || ''}`
  const scheduleDate = appointment.schedule
    ? new Date(appointment.schedule.scheduleDate).toLocaleString()
    : 'No disponible'

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle title={`Cita para ${patientName}`} to="/admin/appointments" />
      <TextItem text={appointment.id} title="ID de Cita" />
      <TextItem text={patientName} title="Paciente" />
      <TextItem text={specialtyName} title="Especialidad" />
      <TextItem text={doctorName} title="Médico" />
      <TextItem text={scheduleDate} title="Fecha y Hora de la Cita" />
      <TextItem
        text={appointment.status || 'Estado no asignado'}
        title="Estado de la Cita"
      />
      <TextItem text={appointment.notes || 'No hay notas'} title="Notas" />
    </div>
  )
}

export default AppointmentView
