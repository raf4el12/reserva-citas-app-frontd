import { createBrowserRouter } from "react-router-dom";
import CategoryPage from './pages/Category'
import CategoryDetailPage from './pages/CategoryDetail'
import CategoryNewPage from './pages/CategoryNew'
import ProductPage from "./pages/Product";
import OrderPage from "./pages/Order";
import Navbar from "./components/Navbar";
import MainPage from "./pages/Main";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Navbar,
    children: [
      {
        index: true,
        element: <MainPage />
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
      {
        path: 'products',
        element: <ProductPage />
      },
      {
        path: 'orders',
        element: <OrderPage />
      }
    ]
  },
])

export default router
