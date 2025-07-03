import { createBrowserRouter } from 'react-router-dom'

import LayoutAdmin from './components/layout/LayoutAdmin'
import LayoutAuth from './components/layout/LayoutAuth'
import LayoutMain from './components/layout/LayoutMain'

import MainPage from './pages/Main'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

import CommonPage from './pages/commons/CommonPage'

import DashboardPage from './pages/dashboard/DashboardPage'

import CategoryDetailPage from './pages/categories/CategoryDetailPage'
import CategoryNewPage from './pages/categories/CategoryNewPage'
import CategoryPage from './pages/categories/CategoryPage'

const router = createBrowserRouter([
  {
    path: '/',
    Component: LayoutMain,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: 'admin',
    Component: LayoutAdmin,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: <DashboardPage />,
          },
        ],
      },
      {
        path: 'medical-appointments',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
      },
      {
        path: 'planning',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
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
      {
        path: 'specialties',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
      },
      {
        path: 'specialties',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
      },
      {
        path: 'doctors',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
      },
      {
        path: 'patients',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            element: <CommonPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    Component: LayoutAuth,
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
