import { Link } from '@mui/material'
import NavbarBase from './navbar/NavbarBase'

const RouterMain = [
  {
    name: 'Categorias',
    href: '/admin/categories',
  },
]

const NavbarAdmin = () => {
  return (
    <NavbarBase
      isPrivate
      title="Admin Panel"
      actionLeft={RouterMain.map((item, index) => {
        return (
          <Link
            sx={{
              color: 'white',
              padding: '0px 10px 0px 10px',
            }}
            key={`router-main-${index}`}
            href={item.href}
          >
            {item.name}
          </Link>
        )
      })}
    />
  )
}

export default NavbarAdmin
