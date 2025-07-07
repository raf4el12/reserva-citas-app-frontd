import MoreVertIcon from '@mui/icons-material/MoreVert'
import { IconButton, Menu, MenuItem } from '@mui/material'
import { type FC, useState } from 'react'
import { Link } from 'react-router-dom'

interface DropDownActionItemProps {
  toEdit?: string
  onEdit?: () => void
  onDelete?: () => void
  disabledAbsolute?: boolean
}

const DropDownActionItem: FC<DropDownActionItemProps> = ({
  toEdit,
  onEdit,
  onDelete,
  disabledAbsolute,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleEdit = () => {
    onEdit?.()
    handleClose()
  }

  const handleDelete = () => {
    onDelete?.()
    handleClose()
  }

  return (
    <div
      {...(!disabledAbsolute && {
        className: 'absolute top-2 right-2 z-10',
      })}
    >
      <IconButton size="small" onClick={handleClick}>
        <MoreVertIcon fontSize="inherit" />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          list: {
            'aria-labelledby': 'basic-button',
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem
          {...(toEdit && {
            component: Link,
            to: toEdit,
          })}
          className="!text-xs"
          onClick={handleEdit}
        >
          Editar
        </MenuItem>
        <MenuItem className="!text-xs" onClick={handleDelete}>
          Eliminar
        </MenuItem>
      </Menu>
    </div>
  )
}

export default DropDownActionItem
