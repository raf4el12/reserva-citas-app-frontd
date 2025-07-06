import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  ListItemButton,
  ListItem as ListItemMui,
  Typography,
} from '@mui/material'
import type { FC } from 'react'

interface ListItemNewProps {
  href: string
  text?: string
}

const ListItemNew: FC<ListItemNewProps> = ({ href, text = 'Nuevo' }) => {
  return (
    <ListItemMui disablePadding>
      <ListItemButton component="a" href={href}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
            color: 'green',
          }}
        >
          <AddIcon />
          <Typography sx={{ fontSize: 14 }}>{text}</Typography>
        </Box>
      </ListItemButton>
    </ListItemMui>
  )
}

export default ListItemNew
