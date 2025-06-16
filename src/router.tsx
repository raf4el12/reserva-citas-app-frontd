import { createBrowserRouter } from "react-router-dom";

import NavbarMain from "./components/NavbarMain";
import NavbarAdmin from "./components/NavbarAdmin";
import NavbarAuth from "./components/NavbarAuth";
import MainPage from "./pages/Main";

import CategoryPage from './pages/categories/CategoryPage'
import CategoryDetailPage from './pages/categories/CategoryDetail'
import CategoryNewPage from './pages/categories/CategoryNew'
import LoginPage from "./pages/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: '/',
    Component: NavbarMain,
    children: [
      {
        index: true,
        element: <MainPage />
      },
    ]
  },
  {
    path: "admin",
    Component: NavbarAdmin,
    children: [
      {
        index: true,
        element: <CategoryPage />
      },
      {
        path: 'categories',
        children: [
          {
            path: '',
            element: <CategoryPage />
          },
          {
            path: ':id/detail',
            element: <CategoryDetailPage />
          },
          {
            path: 'new',
            element: <CategoryNewPage />
          }
        ],
      },
    ]
  },
  {
    path: "auth",
    Component: NavbarAuth,
    children: [
      {
        index: true,
        element: <LoginPage />
      },
      {
        path: 'login',
        element: <LoginPage />
      }
    ]
  },
])

export default router
