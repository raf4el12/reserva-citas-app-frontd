import { useQuery } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Appointment } from '../../types/appointments'

export const useGetAppointmentsById = (appointmentId: number) => {
  const query = useQuery({
    queryKey: ['appointment', appointmentId],
    queryFn: async () => {
      if (!appointmentId) return null

      const data = await ApiBackend.get(`/appointments/${appointmentId}`)

      return data as Appointment
    },
    enabled: !!appointmentId,
  })

  return query
}
