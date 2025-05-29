import { AppBar, Box, Button, Link, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router'

const RouterMain = [
  {
    name: 'Clientes',
    href: '/clients'
  },
  {
    name: 'Productos',
    href: '/products'
  },
  {
    name: 'Ordenes',
    href: '/orders'
  }
]

const Navbar = () => {
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
                Carrito Compra
              </Typography>
              {
                RouterMain.map((item, index) => {
                  return (
                    <Link
                      sx={{
                        color: 'white',
                        padding: '0px 10px 0px 10px'
                      }}
                      key={`router-main-${index}`}
                      href={item.href}>
                      {item.name}
                    </Link>
                  )
                })
              }
            </Box>
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  )
}

export default Navbar