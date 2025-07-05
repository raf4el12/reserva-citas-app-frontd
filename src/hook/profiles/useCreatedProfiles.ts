import { useMutation } from '@tanstack/react-query'

import ApiBackend from '../../shared/services/api.backend'
import type { Profile, ProfileCreateDto } from '../../types/profile'

export const useCreateProfiles = () => {
  return useMutation({
    mutationFn: async (newCategory: ProfileCreateDto) => {
      const data = await ApiBackend.post('/profiles', newCategory)
      return data as Profile
    },
  })
}