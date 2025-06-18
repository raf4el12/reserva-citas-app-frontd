import AlternateEmailIcon from '@mui/icons-material/AlternateEmail'
import PersonIcon from '@mui/icons-material/Person'
import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import type { FC } from 'react'
import type { Category } from '../../types/category'
import ItemContainer from '../commons/ItemContainer'

interface CategoryCardProps {
  item: Category
}

const CategoryCard: FC<CategoryCardProps> = ({ item }) => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardActionArea component="a" href={`/admin/categories/${item.id}/detail`}>
        <CardContent>
          <ItemContainer>
            <AlternateEmailIcon fontSize="small" />
            <Typography
              gutterBottom
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {item.name}
            </Typography>
          </ItemContainer>
          <ItemContainer>
            <PersonIcon fontSize="small" />
            <Typography variant="h5" component="div">
              {item.deleted}
            </Typography>
          </ItemContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CategoryCard
