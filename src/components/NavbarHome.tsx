import { Alert, AppBar, Box, Button, Link, Snackbar, Toolbar, Typography } from '@mui/material'
import { Outlet, useNavigate } from 'react-router'
import { useUserById } from '../hook/users/useUserById'
import { useGetUserIdContext } from '../hook/auth/useGetUserIdContext'
import { useLogoutMutation } from '../hook/auth/useLogout'
import { useState } from 'react'

const NavbarUser = () => {
  const navigate = useNavigate()
  const userId = useGetUserIdContext()
  const logoutMutation = useLogoutMutation()
  const { data: user } = useUserById(userId)

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

  if (!user)
    return navigate('/auth/login')

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
                Mi Turno
              </Typography>
            </Box>
            <Button href="/perfil" LinkComponent="a" color="inherit">
              Ver perfil
            </Button>
            <Button href="/mis-citas" LinkComponent="a" color="inherit">
              Mis citas
            </Button>
            <Button onClick={handleLogout} color="inherit">
              Salir ({user?.name})
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Snackbar open={openSnack} autoHideDuration={6000} onClose={handleCloseSnackbar}>
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

export default NavbarUser
