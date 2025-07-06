import ViewListIcon from '@mui/icons-material/ViewList'
import ViewModuleIcon from '@mui/icons-material/ViewModule'
import { ToggleButton, ToggleButtonGroup } from '@mui/material'
import { Outlet } from 'react-router'

import SidebarBase from '../SidebarBase'
import useLayoutAdminContext, {
  type ToggleViewType,
  LayoutAdminProvider,
} from './context'

const LayoutAdminBase = () => {
  const { showToggleView, title, toggleView, onToggleView } =
    useLayoutAdminContext()

  const handleChangeToggleView = (
    _event: React.MouseEvent<HTMLElement>,
    nextView: string
  ) => {
    console.log('nextView', nextView)
    onToggleView(nextView as ToggleViewType)
  }
  console.log('toggleView', toggleView)

  return (
    <div className="flex min-h-screen">
      <SidebarBase />
      <main className="flex-1 bg-gray-50 p-8">
        <div className="flex flex-row justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">{title}</h1>
          {showToggleView && (
            <ToggleButtonGroup
              exclusive
              value={toggleView}
              onChange={handleChangeToggleView}
            >
              <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
              </ToggleButton>
              <ToggleButton value="module" aria-label="module">
                <ViewModuleIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          )}
        </div>
        <Outlet />
      </main>
    </div>
  )
}
const LayoutAdmin = () => (
  <LayoutAdminProvider>
    <LayoutAdminBase />
  </LayoutAdminProvider>
)

export default LayoutAdmin
