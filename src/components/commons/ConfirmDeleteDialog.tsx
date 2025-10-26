import { Button, Typography } from '@mui/material'
import type { FC } from 'react'
import ContentItem from './ContentItem'
import DialogItem from './DialogItem'

interface ConfirmDeleteDialogProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmDeleteDialog: FC<ConfirmDeleteDialogProps> = ({
  open,
  onClose,
  onConfirm,
}) => {
  return (
    <DialogItem open={open} onClose={onClose}>
      <ContentItem>
        <Typography gutterBottom variant="h6" color="error">
          ¿Está seguro de eliminar?
        </Typography>
        <Typography gutterBottom>
          Esta apunto de eliminar el siguiente registro.
        </Typography>
        <div className="flex justify-end mt-6 gap-3">
          <Button onClick={onClose}>Cancelar</Button>
          <Button color="error" onClick={onConfirm} variant="contained">
            Aceptar
          </Button>
        </div>
      </ContentItem>
    </DialogItem>
  )
}

export default ConfirmDeleteDialog
