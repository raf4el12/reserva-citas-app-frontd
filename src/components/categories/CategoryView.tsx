import { LinearProgress } from '@mui/material'
import type { FC } from 'react'

import { useGetCategoryById } from '../../hook/categories/useCategoryById'
import CardTitle from '../commons/CardTitle'
import TextItem from '../commons/TextItem'

interface CategoryViewProps {
  id: number
}

const CategoryView: FC<CategoryViewProps> = ({ id }) => {
  const { isPending, data } = useGetCategoryById(id)

  if (isPending) return <LinearProgress />

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow-lg p-8 border border-gray-100">
      <CardTitle title={data?.name || ''} to="/admin/categories" />
      <TextItem text={id} title="ID" />
    </div>
  )
}

export default CategoryView
