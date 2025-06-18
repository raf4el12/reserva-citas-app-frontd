import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router'

const NavbarUser = () => {
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
            <Button href="/auth/login" LinkComponent="a" color="inherit">
              Logout
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  )
}

export default NavbarUser