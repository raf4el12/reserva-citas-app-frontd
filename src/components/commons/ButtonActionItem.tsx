import { Button } from '@mui/material'
import type { FC } from 'react'
import { Link } from 'react-router-dom'

interface ButtonActionItemProps {
  to: string
  disabled?: boolean
}

const ButtonActionItem: FC<ButtonActionItemProps> = ({ to, disabled }) => {
  return (
    <div className="flex justify-end gap-2 mt-4">
      <Button
        variant="outlined"
        color="secondary"
        component={Link}
        disabled={disabled}
        to={to}
      >
        Cancelar
      </Button>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        disabled={disabled}
      >
        Guardar
      </Button>
    </div>
  )
}

export default ButtonActionItem
