import { type FC, Fragment, useState } from 'react'

import { Divider, List } from '@mui/material'
import { useDeleteCategory } from '../../hook/categories/useDeleteCategory'
import { formatDateAndTime } from '../../shared/utils/format'
import type { Category } from '../../types/category'
import CardItem from '../commons/CardItem'
import CardItemNew from '../commons/CardItemNew'
import ConfirmDeleteDialog from '../commons/ConfirmDeleteDialog'
import ListItem from '../commons/ListItem'
import ListItemNew from '../commons/ListItemNew'
import useLayoutAdminContext from '../layout/LayoutAdmin/context'

interface CategoryItemsProps {
  categories: Category[]
}

const CategoryItems: FC<CategoryItemsProps> = ({ categories }) => {
  const { toggleView } = useLayoutAdminContext()
  const deleteCategory = useDeleteCategory()
  const [deleteId, setDeleteId] = useState(0)

  const handleDelete = (id: number) => {
    setDeleteId(id)
  }

  const handleConfirmDeleteDialogConfirm = () => {
    deleteCategory.mutate(deleteId)
    setDeleteId(0)
  }

  const handleConfirmDeleteDialogClose = () => {
    setDeleteId(0)
  }

  return (
    <>
      {toggleView === 'list' && (
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItemNew to="/admin/categories/new" />
          <Divider component="li" />
          {categories.map((item, index) => (
            <Fragment key={`category-list-${index}`}>
              <ListItem
                onDelete={() => handleDelete(item.id)}
                toEdit={`/admin/categories/${item.id}/edit`}
                toDetail={`/admin/categories/${item.id}/detail`}
                textMain={`${item.id.toString()} - ${item.name}`}
                textSecondary={formatDateAndTime(item.createdAt)}
              />
              {categories.length !== index + 1 && <Divider component="li" />}
            </Fragment>
          ))}
        </List>
      )}
      {toggleView !== 'list' && (
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
      )}
      <ConfirmDeleteDialog
        open={Boolean(deleteId)}
        onClose={handleConfirmDeleteDialogClose}
        onConfirm={handleConfirmDeleteDialogConfirm}
      />
    </>
  )
}

export default CategoryItems
