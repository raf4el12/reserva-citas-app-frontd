import { useMutation } from '@tanstack/react-query'
import ApiBackend from '../../shared/services/api.backend'
import type { Profile } from '../../types/profile'

type CreateProfileDto = {
  name: string
  lastName: string
  email: string
  birthday?: string | null
  gender?: string | null
  national?: string | null
  photo?: string | null
  phone?: string | null
  address?: string | null
  typeProfileId?: number | null
  typeDocument?: string | null
  numberDocument?: string | null
  userId: number
}

export const useCreateProfile = () => {
  return useMutation({
    mutationFn: async (newProfile: CreateProfileDto) => {
      const data = await ApiBackend.post('/profiles', newProfile)
      return data as Profile
    },
  })
}
