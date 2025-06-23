import { Link } from '@mui/material'
import { Outlet } from 'react-router'

import AppBarBase from './AppBarBase'
import Layout from './Layout'

const RouterMain = [
  {
    name: 'Categorias',
    href: '/admin/categories',
  },
]

const LayoutAdmin = () => {
  return (
    <>
      <AppBarBase
        isPrivate
        title="Admin Panel"
        actionLeft={RouterMain.map((item, index) => {
          return (
            <Link
              sx={{
                padding: '0px 10px 0px 10px',
              }}
              underline="none"
              key={`router-main-${index}`}
              href={item.href}
            >
              {item.name}
            </Link>
          )
        })}
      />
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default LayoutAdmin
