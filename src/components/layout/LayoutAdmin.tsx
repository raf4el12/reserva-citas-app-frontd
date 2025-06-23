import { Outlet } from 'react-router'

import SidebarBase from './SidebarBase'

const LayoutAdmin = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarBase />
      <main className="flex-1 bg-gray-50 p-8">
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
