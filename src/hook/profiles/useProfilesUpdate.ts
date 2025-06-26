import { useMutation, useQueryClient } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Profile } from '../../types/profile'

type UpdateProfileDto = {
  name?: string
  lastName?: string
  email?: string
  birthday?: string | null
  gender?: string | null
  national?: string | null
  photo?: string | null
  phone?: string | null
  address?: string | null
  typeProfileId?: number | null
  typeDocument?: string | null
  numberDocument?: string | null
}

export const useUpdateProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, ...updatedProfile }: { id: number } & UpdateProfileDto) => {
      const data = await ApiBackend.put(`/profiles/${id}`, updatedProfile)
      return data as Profile
    },
    onSuccess: (data) => {

      queryClient.invalidateQueries({ queryKey: ['profiles'] })

      queryClient.setQueryData(['profiles'], (oldData: Profile[] | undefined) => {
        if (!oldData) return []

        return oldData.map(profile =>
          profile.id === data.id ? { ...profile, ...data } : profile
        )
      })
    },
  })
}
