import { RouteObject } from 'react-router-dom';
import ErrorPage from '@/pages/ErrorPage';
import HomePage from '@/pages/HomePage';
import Layout from '@/components/Layout';

const HomeRoutes: RouteObject = {
  path: 'home',
  element: <Layout />,
  errorElement: <ErrorPage />,
  children: [{ index: true, element: <HomePage /> }],
};

export default HomeRoutes;
