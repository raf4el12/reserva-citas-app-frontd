import {
  ListItemButton,
  ListItem as ListItemMui,
  ListItemText,
} from '@mui/material'
import type { FC } from 'react'

interface ListItemProps {
  href: string
  textMain: string
  textSecondary: string
}

const ListItem: FC<ListItemProps> = ({ href, textMain, textSecondary }) => {
  return (
    <ListItemMui disablePadding>
      <ListItemButton component="a" href={href}>
        <ListItemText primary={textMain} secondary={textSecondary} />
      </ListItemButton>
    </ListItemMui>
  )
}

export default ListItem
