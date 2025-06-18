import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'

type AppointmentDto = {
  patientId: string
  scheduleId: string
  reason: string
  status: string
  paymentStatus: string
  deleted?: boolean
}

export const useCreateAppointment = () => {
  return useMutation({
    mutationFn: async (appointment: AppointmentDto) => {
      const data = await ApiBackend.post('/appointments', appointment)
      return data
    },
  })
}