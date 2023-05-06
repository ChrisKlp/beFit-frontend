import { RouteObject } from 'react-router-dom';
import RefreshLogin from '@/features/auth/RefreshLogin';
import RequireAuth from '@/features/auth/RequireAuth';
import ErrorPage from '@/pages/ErrorPage';
import LoginPage from '@/pages/LoginPage';
import WelcomePage from '@/pages/WelcomePage';
import Role from '@/types/Role';
import DashRoutes from './DashRoutes';
import HomeRoutes from './HomeRoutes';

const AppRoutes: RouteObject[] = [
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <WelcomePage /> },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        element: <RefreshLogin />,
        children: [
          {
            element: (
              <RequireAuth allowedRoles={[Role.admin, Role.guest, Role.user]} />
            ),
            children: [HomeRoutes],
          },
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
