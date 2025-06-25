export interface Profile {
  id: number
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
  user?: {
    id: number
    name: string
  }
  deleted: boolean
  createdAt: string
  updatedAt?: string | null
}
