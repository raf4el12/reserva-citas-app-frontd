import type { FC } from 'react'

import type { Appointment } from '../../types/appointments'
import CardItem from '../commons/CardItem'

interface AppointmentCardProps {
  item: Appointment
}

const AppointmentCard: FC<AppointmentCardProps> = ({ item }) => {
  return (
    <CardItem
      href={`/admin/appointments/${item.id}/detail`}
      textMain={`Paciente: ${item.patientId}`}
      textSecondary={`Estado: ${item.status} | Fecha: ${new Date(item.createdAt).toLocaleDateString()}`}
    />
  )
}

export default AppointmentCard
