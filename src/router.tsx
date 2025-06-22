import { createBrowserRouter } from 'react-router-dom'

import NavbarAdmin from './components/NavbarAdmin'
import NavbarAuth from './components/NavbarAuth'
import NavbarMain from './components/NavbarMain'

import MainPage from './pages/Main'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

import CategoryDetailPage from './pages/categories/CategoryDetailPage'
import CategoryNewPage from './pages/categories/CategoryNewPage'
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
        path: 'signup',
        element: <SignupPage />,
      },
    ],
  },
])

export default router
