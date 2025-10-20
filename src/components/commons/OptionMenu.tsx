import { MoreVert as MoreVertIcon } from '@mui/icons-material'
import {
  IconButton,
  type IconButtonProps,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material'
import { useState } from 'react'

interface OptionMenuItem {
  text: string
  icon?: string
  onClick?: () => void
  menuItemProps?: any
}

interface OptionMenuProps {
  iconButtonProps?: IconButtonProps
  iconClassName?: string
  options: OptionMenuItem[]
}

const OptionMenu = ({
  iconButtonProps,
  iconClassName,
  options,
}: OptionMenuProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOptionClick = (option: OptionMenuItem) => {
    if (option.onClick) {
      option.onClick()
    }
    handleClose()
  }

  return (
    <>
      <IconButton
        {...iconButtonProps}
        onClick={handleClick}
        aria-label="más opciones"
      >
        <MoreVertIcon className={iconClassName} />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        {options.map((option, index) => (
          <MenuItem
            key={index}
            onClick={() => handleOptionClick(option)}
            {...option.menuItemProps}
          >
            {option.icon && (
              <ListItemIcon>
                <i className={option.icon} />
              </ListItemIcon>
            )}
            <ListItemText>{option.text}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

export default OptionMenu
