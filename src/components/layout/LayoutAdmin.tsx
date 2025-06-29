import { Outlet, useLocation } from 'react-router'

import { useMemo } from 'react'
import SidebarBase from './SidebarBase'

const TITLES: Record<string, string> = {
  '/admin/dashboard': 'Dashboard',
  '/admin/medical-appointments': 'Citas Médicas',
  '/admin/planning': 'Planificación',
  '/admin/categories': 'Categorias',
  '/admin/specialties': 'Especialidades',
  '/admin/doctors': 'Médicos',
  '/admin/patients': 'Pacientes',
  '/admin/profiles': 'Perfiles',
  '/admin/settings': 'Configuración',
}

const PageTitle = () => {
  const location = useLocation()
  const title = useMemo(() => {
    const found = Object.entries(TITLES).find(([path]) =>
      location.pathname.startsWith(path)
    )
    return found ? found[1] : ''
  }, [location.pathname])
  return <h1 className="text-2xl font-bold mb-6">{title}</h1>
}

const LayoutAdmin = () => {
  return (
    <div className="flex min-h-screen">
      <SidebarBase />
      <main className="flex-1 bg-gray-50 p-8">
        <PageTitle />
        <Outlet />
      </main>
    </div>
  )
}

export default LayoutAdmin
