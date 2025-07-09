import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

import type {
  Appointment,
  AppointmentCreateDto,
} from '../../types/appointments'

export const useAppointmentCreate = () => {
  return useMutation({
    mutationFn: async (newAppointment: AppointmentCreateDto) => {
      const data = await ApiBackend.post('/appointments', newAppointment)
      return data as Appointment
    },
  })
}
