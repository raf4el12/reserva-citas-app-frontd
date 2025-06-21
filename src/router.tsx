import { createBrowserRouter } from 'react-router-dom'

import NavbarAdmin from './components/NavbarAdmin'
import NavbarAuth from './components/NavbarAuth'
import NavbarHome from './components/NavbarHome'
import NavbarMain from './components/NavbarMain'

import MainPage from './pages/Main'

import AppointmentForm from './components/appoitments/AppoitmentsCard'
import TurnoHome from './components/home/TurnoHomeCard'
import RegisterCard from './components/register/registerCard'
import LoginPage from './pages/auth/LoginPage'
import CategoryDetailPage from './pages/categories/CategoryDetail'
import CategoryNewPage from './pages/categories/CategoryNew'
import CategoryPage from './pages/categories/CategoryPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: NavbarMain,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: 'turno-home',
    Component: NavbarHome,
    children: [
      { index: true, element: <TurnoHome /> },
      { path: 'sacar-cita', element: <AppointmentForm /> },
    ],
  },
  {
    path: 'admin',
    Component: NavbarAdmin,
    children: [
      {
        index: true,
        element: <CategoryPage />,
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
          {
            path: ':id/detail',
            element: <CategoryDetailPage />,
          },
          {
            path: 'new',
            element: <CategoryNewPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    Component: NavbarAuth,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterCard />,
      },
    ],
  },
])

export default router
