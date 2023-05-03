import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppSelector } from '@/app/hooks';
import { selectToken } from './authSlice';

export default function RequireAuth() {
  const location = useLocation();
  const token = useAppSelector(selectToken);

  return token ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} />
  );
}
