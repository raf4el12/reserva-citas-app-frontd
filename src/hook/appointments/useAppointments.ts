import { useQuery } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Appointment } from '../../types/appointments'

export const useAppointments = () => {
  const dataQuery = useQuery({
    queryKey: ['appointments'],
    queryFn: async () => {
      const data = await ApiBackend.get('/appointments')

      return data as Appointment[]
    },
  })

  return dataQuery
}
