import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface CardTitleProps {
  title: string
  to: string
}

const CardTitle: FC<CardTitleProps> = ({ title, to }) => {
  return (
    <div className="flex gap-2 justify-between mb-6">
      <h2 className="text-3xl font-bold text-primary mb-2">{title}</h2>
      <IconButton size="small">
        <Link to={to}>
          <CloseIcon />
        </Link>
      </IconButton>
    </div>
  )
}

export default CardTitle