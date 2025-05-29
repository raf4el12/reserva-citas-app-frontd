import { Box, Card, CardActionArea, CardContent, Typography } from '@mui/material'
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { FC } from 'react';

interface CardNewProps {
  href: string;
  text?: string;
}

const CardNew: FC<CardNewProps> = ({ href, text = 'Nuevo' }) => {
  return (
    <Card
      sx={{ minWidth: 275, borderColor: 'green' }}
      variant='outlined'>
      <CardActionArea component="a" href={href} sx={{ height: '100%', display: 'flex' }}>
        <CardContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: 0.5 }}>
            <PersonAddIcon />
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {text}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardNew