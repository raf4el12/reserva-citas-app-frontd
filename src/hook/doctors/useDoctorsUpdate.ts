import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { DoctorUpdateDto, Doctor } from '../../types/doctors'

export const useUpdateDoctor = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({
      id,
      ...updateDoctor
    }: DoctorUpdateDto & { id: number }) => {
      const data = await ApiBackend.put(`/doctors/${id}`, updateDoctor)
      return data as Doctor
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['doctors'] })

      queryClient.setQueryData(['doctors'], (oldData: Doctor[] | undefined) => {
        if (!oldData) return []

        return oldData.map((doctor) =>
          doctor.id === data.id ? { ...doctor, ...data } : doctor
        )
      })
    },
  })
}
