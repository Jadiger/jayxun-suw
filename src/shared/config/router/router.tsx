import { lazy } from 'react'
import { createBrowserRouter, defer } from 'react-router-dom'

import { Auth } from '@/auth/ui/auth'
import { ProtectedRoutes } from '@/auth/ui/protected-routes'
import { AuthRoute } from '@/auth/ui/auth-route'

import { checkAuth } from '@/auth/utils/check-auth'
import { ROUTES } from '../../constants/routes'
import { AuthLayout } from '@/shared/layouts/auth-layout/auth-layout'

import { MainLayout } from '@/shared/layouts/main-layout/main-layout'

const LoginPage = lazy(() => import('@/pages/auth/login'))

const OrdersPage = lazy(() => import('@/pages/orders/orders'))
const OrderPage = lazy(() => import('@/pages/orders/order/order'))
const CreateOrderPage = lazy(
  () => import('@/pages/orders/create-order/create-order')
)
const OrdersClientCreate = lazy(
  () => import('@/pages/orders/orders-client-create/orders-client-create')
)

const CreateClientPage = lazy(() => import('@/pages/clients/create'))
const ClientsPage = lazy(() => import('@/pages/clients/clients'))
const ClientPage = lazy(() => import('@/pages/clients/client'))
const ClientEditPage = lazy(() => import('@/pages/clients/edit'))

const ProductsPage = lazy(() => import('@/pages/products/products'))
const ProductPage = lazy(() => import('@/pages/products/product'))
const ProductCreatePage = lazy(() => import('@/pages/products/create'))
const ProductEditPage = lazy(() => import('@/pages/products/edit'))
const DriversPage = lazy(() => import('@/pages/drivers/drivers'))
const DriverPage = lazy(() => import('@/pages/drivers/driver'))
const DriversCreatePage = lazy(() => import('@/pages/drivers/create'))
const DriverEditPage = lazy(() => import('@/pages/drivers/edit'))

export const router = createBrowserRouter([
  {
    element: <Auth />,
    loader: () => defer({ auth: checkAuth() }),
    children: [
      {
        element: <ProtectedRoutes />,
        children: [
          {
            element: <MainLayout />,
            children: [
              {
                path: ROUTES.HOME,
                element: <OrdersPage />,
              },
              {
                path: ROUTES.CLIENTS,
                element: <ClientsPage />,
              },
              {
                path: ROUTES.PRODUCTS,
                element: <ProductsPage />,
              },
              {
                path: ROUTES.DRIVERS,
                element: <DriversPage />,
              },
            ],
          },
          {
            path: ROUTES.ORDER,
            element: <OrderPage />,
          },
          {
            path: ROUTES.ORDERCREATE,
            element: <CreateOrderPage />,
          },
          {
            path: ROUTES.ORDERSCLIENTCREATE,
            element: <OrdersClientCreate />,
          },

          {
            path: ROUTES.CLIENTCREATE,
            element: <CreateClientPage />,
          },
          {
            path: ROUTES.CLIENT,
            element: <ClientPage />,
          },
          {
            path: ROUTES.CLIENTEDIT,
            element: <ClientEditPage />,
          },

          {
            path: ROUTES.PRODUCT,
            element: <ProductPage />,
          },
          {
            path: ROUTES.PRODUCTCREATE,
            element: <ProductCreatePage />,
          },
          {
            path: ROUTES.PRODUCTEDIT,
            element: <ProductEditPage />,
          },
          { path: ROUTES.DRIVER, element: <DriverPage /> },
          { path: ROUTES.DRIVERCREATE, element: <DriversCreatePage /> },
          { path: ROUTES.DRIVEREDIT, element: <DriverEditPage /> },
        ],
      },

      {
        element: <AuthRoute />,
        children: [
          {
            element: <AuthLayout />,
            children: [
              {
                path: ROUTES.LOGIN,
                element: <LoginPage />,
              },
            ],
          },
        ],
      },
    ],
  },
])
