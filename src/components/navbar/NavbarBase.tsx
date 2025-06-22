import {
  Alert,
  AppBar,
  Box,
  Button,
  Link,
  Snackbar,
  Toolbar,
  Typography,
} from '@mui/material'
import { type FC, useState } from 'react'
import { Outlet, useNavigate } from 'react-router'

import useAuthContext from '../../context/AuthContext'
import { useLogoutMutation } from '../../hook/auth/useLogout'
import LoadingPage from '../LoadingPage'
import DropdownAvatar from '../auth/DropdownAvatar'

interface NavbarBaseProps {
  isPrivate?: boolean
  title?: string
  actionLeft?: React.ReactNode
}

const NavbarBase: FC<NavbarBaseProps> = ({
  actionLeft,
  isPrivate,
  title = 'Sisol Reserva',
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
    return <LoadingPage />
  }

  if (!user && isPrivate && !isLoading) {
    window.location.href = '/auth/login'

    return <LoadingPage />
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
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
                sx={{ marginRight: 1, color: 'white' }}
                component={Link}
                href="/"
              >
                {title}
              </Typography>
            </Box>
            {actionLeft}
            {user && <DropdownAvatar user={user} onLogout={handleLogout} />}
            {!user && (
              <Button href="/auth/login" LinkComponent="a" color="inherit">
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Ocurrio un error al cerrar sesión
        </Alert>
      </Snackbar>
      <Outlet />
    </>
  )
}

export default NavbarBase
