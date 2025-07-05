import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import DashboardIcon from '@mui/icons-material/Dashboard'
import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import LoginIcon from '@mui/icons-material/Login'
import LogoutIcon from '@mui/icons-material/Logout'
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart'
import SettingsIcon from '@mui/icons-material/Settings'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'

import useAuthContext from '../../context/AuthContext'
import { useLogoutMutation } from '../../hook/auth/useLogout'
import SidebarAvatar from '../auth/SidebarAvatar'
import LoadingPage from '../commons/LoadingPage'
import SnackbarErrorBase from './SnackbarErrorBase'

const menu = [
  { label: 'Dashboard', icon: <DashboardIcon />, href: '/admin/dashboard' },
  {
    label: 'Citas Médicas',
    icon: <LocalHospitalIcon />,
    href: '/admin/medical-appointments',
  },
  {
    label: 'Planificación',
    icon: <CalendarMonthIcon />,
    href: '/admin/planning',
  },
]

const docs = [
  { label: 'Categorias', href: '/admin/categories' },
  { label: 'Especialidades', href: '/admin/specialties' },
  { label: 'Médicos', href: '/admin/doctors' },
  { label: 'Pacientes', href: '/admin/patients' },
]

export default function SidebarBase() {
  const navigate = useNavigate()
  const { user, isLoading } = useAuthContext()
  const logoutMutation = useLogoutMutation()

  const [openSnack, setOpenSnack] = useState(false)

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync()
      navigate('/auth/login')
    } catch {
      setOpenSnack(true)
    }
  }

  const handleCloseSnackbar = () => {
    setOpenSnack(false)
  }

  if (isLoading) {
    return <LoadingPage />
  }

  if (!user && !isLoading) {
    window.location.href = '/auth/login'

    return <LoadingPage />
  }

  return (
    <aside className="flex flex-col w-64 h-screen bg-white border-r px-4 py-6">
      <Link
        to="/"
        className="flex items-center mb-8 rounded-lg p-3 text-white bg-black hover:bg-gray-900 transition"
      >
        <span className="mr-3">
          <MonitorHeartIcon />
        </span>
        <span className="font-bold text-xl">Sisol Admin</span>
      </Link>
      <nav className="flex-1">
        <ul className="space-y-1">
          {menu.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="flex items-center w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-8 mb-2 text-xs text-gray-400 uppercase">
          Maestros
        </div>
        <ul className="space-y-1">
          {docs.map((item) => (
            <li key={item.label}>
              <Link
                to={item.href}
                className="flex items-center w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="mt-auto space-y-2">
        <Link
          to="/admin/settings"
          className="flex items-center w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition"
        >
          <span className="mr-3">
            <SettingsIcon />
          </span>{' '}
          Configuración
        </Link>
        {!user && (
          <button
            type="button"
            className="flex items-center w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition"
          >
            <span className="mr-3">
              <LoginIcon />
            </span>{' '}
            Iniciar Sesión
          </button>
        )}
        {user && (
          <>
            <button
              type="button"
              className="flex items-center w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100"
              onClick={handleLogout}
            >
              <span className="mr-3">
                <LogoutIcon />
              </span>{' '}
              Cerrar Sesión
            </button>
            <SidebarAvatar user={user} />
          </>
        )}
      </div>
      <SnackbarErrorBase
        open={openSnack}
        onClose={handleCloseSnackbar}
        title="Ocurrio un error al cerrar sesión"
      />
    </aside>
  )
}