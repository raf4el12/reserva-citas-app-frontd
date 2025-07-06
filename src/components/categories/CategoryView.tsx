import { LinearProgress } from '@mui/material'
import type { FC } from 'react'

import { useGetCategoryById } from '../../hook/categories/useCategoryById'
import CardTitle from '../commons/CardTitle'
import ContentItem from '../commons/ContentItem'
import TextItem from '../commons/TextItem'

interface CategoryViewProps {
  id: number
}

const CategoryView: FC<CategoryViewProps> = ({ id }) => {
  const { isPending, data } = useGetCategoryById(id)

  if (isPending) return <LinearProgress />

  return (
    <ContentItem>
      <CardTitle title={data?.name || ''} to="/admin/categories" />
      <TextItem text={id} title="ID" />
      <TextItem text={data?.createdAt} title="Creado el" />
    </ContentItem>
  )
}

export default CategoryView
