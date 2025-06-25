import { createBrowserRouter } from 'react-router-dom'

import LayoutAdmin from './components/layout/LayoutAdmin'
import LayoutAuth from './components/layout/LayoutAuth'
import LayoutMain from './components/layout/LayoutMain'

import MainPage from './pages/Main'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'

import CategoryDetailPage from './pages/categories/CategoryDetailPage'
import CategoryNewPage from './pages/categories/CategoryNewPage'
import CategoryPage from './pages/categories/CategoryPage'

import SpecialtiesDetailPage from './pages/specialties/SpecialtiesDetailPage'
import SpecialtiesNewPage from './pages/specialties/SpecialtiesNewPage'
import SpecialtiesPage from './pages/specialties/SpecialtiesPage'

import ProfilesPage from './pages/profiles/ProfilesPage'
import ProfilesCreatePage from './pages/profiles/ProfilesCreatePage'
import ProfilesDetailPage from './pages/profiles/ProfilesDetailPage'

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
        element: <CategoryPage />,
      },
      {
        path: 'dashboard',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'medical-appointments',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'planning',
        children: [
          {
            path: '',
            element: <CategoryPage />,
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
            element: <SpecialtiesPage />,
          },
          {
            path: 'new',
            element: <SpecialtiesNewPage />,
          },
          {
            path: ':id/detail',
            element: <SpecialtiesDetailPage />,
          },
        ],
      },
      {
        path: 'profiles',
        children: [
          {
            path: '',
            element: <ProfilesPage />,
          },
          {
            path: 'new',
            element: <ProfilesCreatePage />,
          },
          {
            path: ':id/detail',
            element: <ProfilesDetailPage />,
          },
        ],
      },
      {
        path: 'doctors',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'patients',
        children: [
          {
            path: '',
            element: <CategoryPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            path: '',
            element: <CategoryPage />,
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