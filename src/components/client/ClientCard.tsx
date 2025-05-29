import { FC } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import { Client } from '../../types/client'
import ItemContainer from '../commons/ItemContainer';

interface ClientCardProps {
  item: Client
}

const ClientCard: FC<ClientCardProps> = ({ item }) => {
  return (
    <Card
      sx={{ minWidth: 275 }}
      variant='outlined'>
      <CardActionArea component="a" href={`clients/${item._id}/detail`}>
        <CardContent>
          <ItemContainer>
            <AlternateEmailIcon fontSize='small' />
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {item.email}
            </Typography>
          </ItemContainer>
          <ItemContainer>
            <PersonIcon fontSize='small' />
            <Typography variant="h5" component="div">
              {`${item.name} ${item.lastName}`}
            </Typography>
          </ItemContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ClientCard