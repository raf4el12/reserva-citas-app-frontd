import { lazy } from 'react'
import { createBrowserRouter } from 'react-router-dom'

// Layouts
const LayoutAdmin = lazy(
  () =>
    import(
      './components/layout/LayoutAdmin' /* webpackChunkName: "layout-admin" */
    )
)
const LayoutAuth = lazy(
  () =>
    import(
      './components/layout/LayoutAuth' /* webpackChunkName: "layout-auth" */
    )
)
const LayoutMain = lazy(
  () =>
    import(
      './components/layout/LayoutMain' /* webpackChunkName: "layout-main" */
    )
)

// Pages
const MainPage = lazy(
  () => import('./pages/Main' /* webpackChunkName: "main-page" */)
)
const LoginPage = lazy(
  () => import('./pages/auth/LoginPage' /* webpackChunkName: "login-page" */)
)
const SignupPage = lazy(
  () => import('./pages/auth/SignupPage' /* webpackChunkName: "signup-page" */)
)
const CommonPage = lazy(
  () =>
    import('./pages/commons/CommonPage' /* webpackChunkName: "common-page" */)
)
const DashboardPage = lazy(
  () =>
    import(
      './pages/dashboard/DashboardPage' /* webpackChunkName: "dashboard-page" */
    )
)
const CategoryDetailPage = lazy(
  () =>
    import(
      './pages/categories/CategoryDetailPage' /* webpackChunkName: "category-detail-page" */
    )
)
const CategoryNewPage = lazy(
  () =>
    import(
      './pages/categories/CategoryNewPage' /* webpackChunkName: "category-new-page" */
    )
)
const CategoryPage = lazy(
  () =>
    import(
      './pages/categories/CategoryPage' /* webpackChunkName: "category-page" */
    )
)
const DoctorDetailPage = lazy(
  () =>
    import(
      './pages/doctors/DoctorDetailPage' /* webpackChunkName: "doctor-detail-page" */
    )
)
const DoctorNewPage = lazy(
  () =>
    import(
      './pages/doctors/DoctorNewPage' /* webpackChunkName: "doctor-new-page" */
    )
)
const DoctorPage = lazy(
  () =>
    import('./pages/doctors/DoctorPage' /* webpackChunkName: "doctor-page" */)
)

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
        path: 'doctors',
        children: [
          {
            path: '',
            element: <DoctorPage />,
          },
          {
            path: ':id/detail',
            element: <DoctorDetailPage />,
          },
          {
            path: 'new',
            element: <DoctorNewPage />,
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
