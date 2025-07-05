import { Card, CardActionArea, CardContent, Typography } from '@mui/material'
import type { FC } from 'react'

import ItemContainer from '../commons/ItemContainer'

interface CardItemProps {
  href: string
  textMain: string
  textSecondary: string
}

const CardItem: FC<CardItemProps> = ({ href, textMain, textSecondary }) => {
  return (
    <Card sx={{ minWidth: 275 }} variant="outlined">
      <CardActionArea component="a" href={href}>
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