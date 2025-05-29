import { createBrowserRouter } from "react-router-dom";
import ClientPage from './pages/Client'
import ClientDetailPage from './pages/ClientDetail'
import ClientNewPage from './pages/ClientNew'
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
        path: 'clients',
        children: [
          {
            path: '',
            element: <ClientPage />
          },
          {
            path: ':id/detail',
            element: <ClientDetailPage />
          },
          {
            path: 'new',
            element: <ClientNewPage />
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
