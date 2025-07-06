import { type FC, Fragment } from 'react'

import { Divider, List } from '@mui/material'
import { useDeleteCategory } from '../../hook/categories/useDeleteCategory'
import { formatDateAndTime } from '../../shared/utils/format'
import type { Category } from '../../types/category'
import CardItem from '../commons/CardItem'
import CardItemNew from '../commons/CardItemNew'
import ListItem from '../commons/ListItem'
import ListItemNew from '../commons/ListItemNew'
import useLayoutAdminContext from '../layout/LayoutAdmin/context'

interface CategoryItemsProps {
  categories: Category[]
}

const CategoryItems: FC<CategoryItemsProps> = ({ categories }) => {
  const { toggleView } = useLayoutAdminContext()
  const deleteCategory = useDeleteCategory()

  const handleDelete = (id: number) => {
    deleteCategory.mutate(id)
  }

  if (toggleView === 'list')
    return (
      <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItemNew to="/admin/categories/new" />
          <Divider component="li" />
          {categories.map((item, index) => (
            <Fragment key={`category-list-${index}`}>
              <ListItem
                to={`/admin/categories/${item.id}/detail`}
                textMain={`${item.id.toString()} - ${item.name}`}
                textSecondary={formatDateAndTime(item.createdAt)}
              />
              {categories.length !== index + 1 && <Divider component="li" />}
            </Fragment>
          ))}
        </List>
      </>
    )

  return (
    <>
      <CardItemNew to="/admin/categories/new" />
      {categories.map((item, index) => (
        <CardItem
          key={`category-card-${index}`}
          onDelete={() => handleDelete(item.id)}
          toEdit={`/admin/categories/${item.id}/edit`}
          toDetail={`/admin/categories/${item.id}/detail`}
          textMain={item.name}
          textSecondary={item.id.toString()}
        />
      ))}
    </>
  )
}

export default CategoryItems
