import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material'
import type { FC, ReactNode } from 'react'

interface ConfirmDialogProps {
  open: boolean
  title?: string
  message: ReactNode
  onConfirm: () => void
  onCancel: () => void
  confirmText?: string
  cancelText?: string
}

const ConfirmDialog: FC<ConfirmDialogProps> = ({
  open,
  title = 'Confirmar acción',
  message,
  onConfirm,
  onCancel,
  confirmText = 'Aceptar',
  cancelText = 'Cancelar',
}) => (
  <Dialog open={open} onClose={onCancel}>
    <DialogTitle>{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>{message}</DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={onCancel} color="primary" variant="outlined">
        {cancelText}
      </Button>
      <Button onClick={onConfirm} color="error" variant="contained">
        {confirmText}
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmDialog