import {
  ListItemButton,
  ListItem as ListItemMui,
  ListItemText,
} from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface ListItemProps {
  to: string
  textMain: string
  textSecondary: string
}

const ListItem: FC<ListItemProps> = ({ to, textMain, textSecondary }) => {
  return (
    <ListItemMui disablePadding>
      <ListItemButton component={Link} to={to}>
        <ListItemText primary={textMain} secondary={textSecondary} />
      </ListItemButton>
    </ListItemMui>
  )
}

export default ListItem
