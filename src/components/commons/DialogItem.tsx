import { Dialog } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface DialogItemProps {
  open: boolean
  onClose: () => void
  children: ReactNode
}

const DialogItem: FC<DialogItemProps> = ({ open, onClose, children }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {children}
    </Dialog>
  )
}

export default DialogItem