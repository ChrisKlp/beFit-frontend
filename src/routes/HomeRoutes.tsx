import { RouteObject } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';

const HomeRoutes: RouteObject = {
  path: 'home',
  element: <HomePage />,
  errorElement: <ErrorPage />,
  children: [],
};

export default HomeRoutes;
