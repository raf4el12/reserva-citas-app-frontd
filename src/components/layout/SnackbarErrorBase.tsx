import { Alert, Snackbar } from '@mui/material'
import type { FC } from 'react'

interface SnackbarErrorBaseProps {
  open: boolean
  onClose: () => void
  title?: string
}

const SnackbarErrorBase: FC<SnackbarErrorBaseProps> = ({
  open,
  onClose,
  title = 'Ocurrio un error ',
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={onClose}>
      <Alert
        onClose={onClose}
        severity="error"
        variant="filled"
        sx={{ width: '100%' }}
      >
        {title}
      </Alert>
    </Snackbar>
  )
}

export default SnackbarErrorBase
