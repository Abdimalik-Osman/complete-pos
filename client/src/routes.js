import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Blog from './pages/Blog';
import User from './pages/User';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Products from './pages/Products';
import DashboardApp from './pages/DashboardApp';
import SharedLayouts from './pages/SharedLayouts';
import Protected from './pages/Protected';
import AddExpense from './pages/AddExpense';
import Reports from './pages/Reports';
import Cart from './pages/Cart';
import Bills from './pages/Bills';
// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: '/dashboard',
      element: <DashboardLayout />,
      children: [
        { path: 'app', element: <DashboardApp /> },
        {
          path: 'products',
          element: (
            <Protected>
              {' '}
              <User />{' '}
            </Protected>
          ),
        },
        {
          path: 'shop',
          element: (
            <Protected>
              {' '}
              <Products />{' '}
            </Protected>
          ),
        },
        {
          path: 'cart',
          element: (
            <Protected>
              {' '}
              <Cart />{' '}
            </Protected>
          ),
        },
        {
          path: 'add-products',
          element: (
            <Protected>
              {' '}
              <AddExpense />{' '}
            </Protected>
          ),
        },
        {
          path: 'bills',
          element: (
            <Protected>
              {' '}
              <Bills />{' '}
            </Protected>
          ),
        },
        {
          path: 'reports',
          element: (
            <Protected>
              {' '}
              <Reports />{' '}
            </Protected>
          ),
        },
        { path: 'blog', element: <Blog /> },
      ],
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        // { path: '/', element: <Navigate to="/dashboard/app" /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}
