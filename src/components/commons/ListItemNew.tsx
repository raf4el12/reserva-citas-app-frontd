import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  ListItemButton,
  ListItem as ListItemMui,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface ListItemNewProps {
  to: string
  text?: string
}

const ListItemNew: FC<ListItemNewProps> = ({ to, text = 'Nuevo' }) => {
  return (
    <ListItemMui disablePadding>
      <ListItemButton component={Link} to={to}>
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
