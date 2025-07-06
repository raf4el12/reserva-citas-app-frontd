import { LinearProgress } from '@mui/material'
import { type FC, useState } from 'react'

import { useGetCategoryById } from '../../hook/categories/useCategoryById'
import { useEditCategory } from '../../hook/categories/useEditCategory'
import type { CategoryDto } from '../../types/category'
import CategoryUpsert from './CategoryUpsert'

interface CategoryEditProps {
  id: number
  onSuccess?: () => void
}

const CategoryEdit: FC<CategoryEditProps> = ({ id, onSuccess }) => {
  const [error, setError] = useState('')
  const editCategory = useEditCategory(id)
  const { isPending, data } = useGetCategoryById(id)

  if (isPending) return <LinearProgress />

  const handleSuccess = (data: CategoryDto) => {
    editCategory.mutate(data, {
      onSuccess: () => {
        onSuccess?.()
      },
      onError: (err: any) => {
        setError(err?.message || 'Error al editar la categoría')
      },
    })
  }

  return (
    <CategoryUpsert
      category={data}
      rootError={error}
      onSuccess={handleSuccess}
    />
  )
}

export default CategoryEdit
