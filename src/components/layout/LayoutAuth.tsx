import { AppBar, Box, Link, Toolbar, Typography } from '@mui/material'
import { Outlet } from 'react-router'

const LayoutAuth = () => {
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
                underline="none"
                href="/"
              >
                Sisol Auth
              </Typography>
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
      <Outlet />
    </>
  )
}

export default LayoutAuth
