import { Navigate, RouteObject } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import DashRoutes from './DashRoutes';
import RequireAuth from '@/features/auth/RequireAuth';
import Role from '@/types/Role';
import RefreshLogin from '@/features/auth/RefreshLogin';

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
        element: <RefreshLogin />,
        children: [
          {
            element: <RequireAuth allowedRoles={[Role.admin]} />,
            children: [DashRoutes],
          },
        ],
      },
    ],
  },
];

export default AppRoutes;
