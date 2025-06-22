import { Button } from '@mui/material'
import NavbarBase from './navbar/NavbarBase'

const NavbarUser = () => {
  const title = 'Mi turno'

  return (
    <NavbarBase
      isPrivate
      title={title}
      actionLeft={
        <>
          <Button href="/perfil" LinkComponent="a" color="inherit">
            Ver perfil
          </Button>
          <Button href="/mis-citas" LinkComponent="a" color="inherit">
            Mis citas
          </Button>
        </>
      }
    />
  )
}

export default NavbarUser
