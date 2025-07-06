import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material'
import { type FC, useState } from 'react'
import { useNavigate } from 'react-router'

import { Link } from 'react-router-dom'
import useAuthContext from '../../context/AuthContext'
import { useLogoutMutation } from '../../hook/auth/useLogout'
import DropdownAvatar from '../auth/DropdownAvatar'
import SnackbarErrorBase from './SnackbarErrorBase'

interface AppBarBaseProps {
  isPrivate?: boolean
  title?: string
  actionLeft?: React.ReactNode
}

const AppBarBase: FC<AppBarBaseProps> = ({
  actionLeft,
  isPrivate,
  title = 'Sisol',
}) => {
  const navigate = useNavigate()
  const { user, isLoading } = useAuthContext()
  const logoutMutation = useLogoutMutation()

  const [openSnack, setOpenSnack] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      navigate('/auth/login')
    } catch {
      setOpenSnack(true)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnack(false)
  }

  if (isPrivate && isLoading) {
    return null
  }

  if (!user && isPrivate && !isLoading) {
    window.location.href = '/auth/login'

    return null
  }

  return (
    <>
      <AppBar
        position="static"
        variant="outlined"
        elevation={0}
        color="inherit"
        className="!border-0"
      >
        <Toolbar>
          <Box
            sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Typography
              variant="h6"
              sx={{ marginRight: 1, textDecoration: 'none' }}
              component={Link}
              to="/"
            >
              {title}
            </Typography>
          </Box>
          {actionLeft}
          {user && <DropdownAvatar user={user} onLogout={handleLogout} />}
          {!user && (
            <Button to="/auth/login" component={Link} color="inherit">
              Iniciar Sesión
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <SnackbarErrorBase
        open={openSnack}
        onClose={handleCloseSnackbar}
        title="Ocurrio un error al cerrar sesión"
      />
    </>
  )
}

export default AppBarBase
