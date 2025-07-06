import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface CardItemNewProps {
  to: string
  text?: string
}

const CardItemNew: FC<CardItemNewProps> = ({ to, text = 'Nuevo' }) => {
  return (
    <Card sx={{ minWidth: 275, borderColor: 'green' }} variant="outlined">
      <CardActionArea component={Link} to={to} sx={{ height: '100%' }}>
        <CardContent sx={{ height: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
            }}
          >
            <AddIcon />
            <Typography sx={{ color: 'text.secondary', fontSize: 14 }}>
              {text}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardItemNew
