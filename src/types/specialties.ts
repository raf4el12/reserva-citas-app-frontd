export interface Specialties {
  id: number
  name: string
  categoryId: number
  deleted: boolean
  createdAt: string
  updatedAt?: string | null
  category?: {
    id: number
    name: string
  }
}
