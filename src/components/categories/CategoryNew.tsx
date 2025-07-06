import { type FC, useState } from 'react'

import { useCreateCategory } from '../../hook/categories/useCreateCategory'
import type { CategoryDto } from '../../types/category'
import CategoryUpsert from './CategoryUpsert'

interface CategoryNewProps {
  onSuccess?: () => void
}

const CategoryNew: FC<CategoryNewProps> = ({ onSuccess }) => {
  const createCategory = useCreateCategory()
  const [error, setError] = useState('')

  const handleSuccess = (data: CategoryDto) => {
    createCategory.mutate(data, {
      onSuccess: () => {
        onSuccess?.()
      },
      onError: (err: any) => {
        setError(err?.message || 'Error al crear la categoría')
      },
    })
  }

  return <CategoryUpsert rootError={error} onSuccess={handleSuccess} />
}

export default CategoryNew
