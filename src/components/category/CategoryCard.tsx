import { FC } from 'react'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import { Category } from '../../types/category'
import ItemContainer from '../commons/ItemContainer';


interface ClientCardProps {
  item: Category
}

const ClientCard: FC<ClientCardProps> = ({ item }) => {
  return (
    <Card
      sx={{ minWidth: 275 }}
      variant='outlined'>
      <CardActionArea component="a" href={`categories/${item.id}/detail`}>
        <CardContent>
          <ItemContainer>
            <AlternateEmailIcon fontSize='small' />
            <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
              {item.name}
            </Typography>
          </ItemContainer>
          <ItemContainer>
            <PersonIcon fontSize='small' />
            <Typography variant="h5" component="div">
              {item.deleted} 
            </Typography>
          </ItemContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default ClientCard