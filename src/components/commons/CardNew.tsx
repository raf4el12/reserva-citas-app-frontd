import AddIcon from '@mui/icons-material/Add'
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from '@mui/material'
import type { FC } from 'react'

interface CardNewProps {
  href: string
  text?: string
}

const CardNew: FC<CardNewProps> = ({ href, text = 'Nuevo' }) => {
  return (
    <Card sx={{ minWidth: 275, borderColor: 'green' }} variant="outlined">
      <CardActionArea component="a" href={href} sx={{ height: '100%' }}>
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

export default CardNew
