import type { FC } from 'react'

import { Divider, List } from '@mui/material'
import type { Category } from '../../types/category'
import { formatDateAndTime } from '../../utils/format'
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

  if (toggleView === 'list')
    return (
      <>
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
          <ListItemNew href="/admin/categories/new" />
          <Divider component="li" />
          {categories.map((item, index) => (
            <>
              <ListItem
                key={`category-list-${index}`}
                href={`/admin/categories/${item.id}/detail`}
                textMain={`${item.id.toString()} - ${item.name}`}
                textSecondary={formatDateAndTime(item.createdAt)}
              />
              {categories.length !== index + 1 && <Divider component="li" />}
            </>
          ))}
        </List>
      </>
    )

  return (
    <>
      <CardItemNew href="/admin/categories/new" />
      {categories.map((item, index) => (
        <CardItem
          key={`category-card-${index}`}
          href={`/admin/categories/${item.id}/detail`}
          textMain={item.name}
          textSecondary={item.id.toString()}
        />
      ))}
    </>
  )
}

export default CategoryItems
