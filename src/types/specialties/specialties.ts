export interface Specialties {
  id: number
  categoryId: number
  name: string
  description?: string | null
  duration?: number | null
  price?: number | null
  requirements?: string | null
  icon?: string | null
  isActive: boolean
  deleted: boolean
  createdAt: string
  updatedAt?: string | null
  category?: {
    id: number
    name: string
  }
}
