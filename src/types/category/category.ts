export interface Category {
  id: number
  name: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
  deleted: boolean
  createdAt: string
  updatedAt?: string
  deletedAt?: string
}

// DTOs para operaciones CRUD
export interface CreateCategoryDto {
  name: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

export interface UpdateCategoryDto {
  name?: string
  description?: string
  icon?: string
  color?: string
  order?: number
  isActive?: boolean
}

export interface CategoryFilters {
  isActive?: boolean
  deleted?: boolean
  search?: string
}
