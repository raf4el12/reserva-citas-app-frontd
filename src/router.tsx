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

// Specialties Pages
const SpecialtiesPage = lazy(
  () =>
    import(
      './pages/specialties/SpecialtiesPage' /* webpackChunkName: "specialties-page" */
    )
)
const SpecialtiesDetailPage = lazy(
  () =>
    import(
      './pages/specialties/SpecialtiesDetailPage' /* webpackChunkName: "specialties-detail-page" */
    )
)
const SpecialtiesNewPage = lazy(
  () =>
    import(
      './pages/specialties/SpecialtiesNewPage' /* webpackChunkName: "specialties-new-page" */
    )
)

// Patients Pages
const PatientPage = lazy(
  () =>
    import(
      './pages/patients/PatientPage' /* webpackChunkName: "patient-page" */
    )
)
const PatientDetailPage = lazy(
  () =>
    import(
      './pages/patients/PatientDetailPage' /* webpackChunkName: "patient-detail-page" */
    )
)
const PatientsNewPage = lazy(
  () =>
    import(
      './pages/patients/PatientNewPage' /* webpackChunkName: "patients-new-page" */
    )
)

// Appointments Pages
const AppointmentPage = lazy(
  () =>
    import(
      './pages/appointments/AppointmentPage' /* webpackChunkName: "appointment-page" */
    )
)

const AppointmentNewPage = lazy(
  () =>
    import(
      './pages/appointments/AppointmentsNewPage' /* webpackChunkName: "appointment-new-page" */
    )
)
const AppointmentDetailPage = lazy(
  () => import('./pages/appointments/AppointmentDetail')
)

const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutMain />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
    ],
  },
  {
    path: 'admin',
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <DashboardPage />,
      },
      {
        path: 'dashboard',
        element: <DashboardPage />,
      },
      {
        path: 'medical-appointments', // Path for viewing appointments
        element: <AppointmentPage />, // Use AppointmentPage to show appointments
      },
      {
        path: 'appointments', // Path for creating appointments
        children: [
          {
            path: 'new',
            element: <AppointmentNewPage />, // Page to create a new appointment
          },
          {
            path: ':id/detail',
            element: <AppointmentDetailPage />,
          },
        ],
      },
      {
        path: 'planning',
        element: <CommonPage />,
      },
      {
        path: 'categories',
        children: [
          {
            index: true,
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
            index: true,
            element: <SpecialtiesPage />,
          },
          {
            path: ':id/detail',
            element: <SpecialtiesDetailPage />,
          },
          {
            path: 'new',
            element: <SpecialtiesNewPage />,
          },
        ],
      },
      {
        path: 'doctors',
        children: [
          {
            index: true,
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
            index: true,
            element: <PatientPage />,
          },
          {
            path: ':id/detail',
            element: <PatientDetailPage />,
          },
          {
            path: 'new',
            element: <PatientsNewPage />,
          },
        ],
      },
      {
        path: 'settings',
        children: [
          {
            index: true,
            element: <CommonPage />,
          },
        ],
      },
    ],
  },
  {
    path: 'auth',
    element: <LayoutAuth />,
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
