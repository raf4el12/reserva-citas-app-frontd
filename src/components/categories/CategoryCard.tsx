import type { FC } from 'react'

import type { Category } from '../../types/category'
import CardItem from '../commons/CardItem'

interface CategoryCardProps {
  item: Category
}

const CategoryCard: FC<CategoryCardProps> = ({ item }) => {
  return (
    <CardItem
      href={`/admin/categories/${item.id}/detail`}
      textMain={item.name}
      textSecondary={item.id.toString()}
    />
  )
}

export default CategoryCard
