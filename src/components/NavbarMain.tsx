import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router'

const NavbarMain = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Box sx={{
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center'
            }}>
              <Typography variant="h6" sx={{ marginRight: 1, color: 'white' }} component={Link} href='/'>
                Reserva Cita
              </Typography>
            </Box>
            <Button href='/auth/login' LinkComponent='a' color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  )
}

export default NavbarMain