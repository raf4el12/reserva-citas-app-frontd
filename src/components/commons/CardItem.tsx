import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

import ItemContainer from '../commons/ItemContainer'
import DropDownActionItem from './DropDownActionItem'

interface CardItemProps {
  toEdit?: string
  toDetail: string
  textMain: string
  textSecondary: string
  onEdit?: () => void
  onDelete?: () => void
}

const CardItem: FC<CardItemProps> = ({
  onEdit,
  onDelete,
  toEdit,
  toDetail,
  textMain,
  textSecondary,
}) => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined" className="relative">
      <DropDownActionItem toEdit={toEdit} onEdit={onEdit} onDelete={onDelete} />
      <CardActionArea component={Link} to={toDetail}>
        <CardContent>
          <ItemContainer>
            <Typography
              gutterBottom
              noWrap
              sx={{ color: 'text.secondary', fontSize: 14 }}
            >
              {textMain}
            </Typography>
          </ItemContainer>
          <ItemContainer>
            <Typography variant="h5" component="div">
              {textSecondary}
            </Typography>
          </ItemContainer>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

export default CardItem
