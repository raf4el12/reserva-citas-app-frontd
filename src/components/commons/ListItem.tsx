import {
  ListItemButton,
  ListItem as ListItemMui,
  ListItemText,
} from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'
import DropDownActionItem from './DropDownActionItem'

interface ListItemProps {
  toEdit?: string
  toDetail: string
  textMain: string
  textSecondary: string
  onEdit?: () => void
  onDelete?: () => void
}

const ListItem: FC<ListItemProps> = ({
  toDetail,
  textMain,
  textSecondary,
  toEdit,
  onEdit,
  onDelete,
}) => {
  return (
    <ListItemMui
      disablePadding
      secondaryAction={
        <DropDownActionItem
          toEdit={toEdit}
          onEdit={onEdit}
          onDelete={onDelete}
          disabledAbsolute
        />
      }
    >
      <ListItemButton component={Link} to={toDetail}>
        <ListItemText primary={textMain} secondary={textSecondary} />
      </ListItemButton>
    </ListItemMui>
  )
}

export default ListItem
