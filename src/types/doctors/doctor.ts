import type { Profile } from '../profile'
import type { Specialties } from '../specialties/specialties'

export interface Doctor {
  id: number
  profileId: number
  licenseNumber: string
  resume: string | null
  deleted: boolean
  createdAt: string
  updatedAt: string | null
  profile: Profile
  specialties: Specialties[]
}
