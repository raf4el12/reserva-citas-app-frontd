import CloseIcon from '@mui/icons-material/Close'
import { IconButton } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface CardTitleProps {
  title: string
  placeholder?: string
  to: string
}

const CardTitle: FC<CardTitleProps> = ({ placeholder, title, to }) => {
  return (
    <div className="flex gap-2 justify-between items-center mb-6">
      {placeholder && !title ? (
        <h2 className="text-2xl font-bold text-gray-400 italic">
          {placeholder}
        </h2>
      ) : (
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
      )}
      <IconButton component={Link} size="small" to={to}>
        <CloseIcon />
      </IconButton>
    </div>
  )
}

export default CardTitle
