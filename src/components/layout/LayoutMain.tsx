import { Outlet } from 'react-router'

import AppBarBase from './AppBarBase'
import Layout from './Layout'

const LayoutMain = () => {
  const title = 'Sisol'

  return (
    <>
      <AppBarBase title={title} />
      <Layout>
        <Outlet />
      </Layout>
    </>
  )
}

export default LayoutMain
