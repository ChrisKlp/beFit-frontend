import { Navigate, RouteObject } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import DashRoutes from './DashRoutes';
import RequireAuth from '@/features/auth/RequireAuth';

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Navigate to="login" /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <RequireAuth />,
        children: [DashRoutes],
      },
    ],
  },
];

export default AppRoutes;
