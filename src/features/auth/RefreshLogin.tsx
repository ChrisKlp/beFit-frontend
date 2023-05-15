import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import LoadingView from '@/components/LoadingView';
import { useRefreshMutation } from './authApiSlice';
import { selectToken } from './authSlice';

export default function RefreshLogin() {
  const effectRan = useRef(false);
  const token = useSelector(selectToken);
  const navigate = useNavigate();
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = () => {
        refresh().then(() => {
          setTrueSuccess(true);
        });
      };

      if (!token) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isError) {
      navigate('/login');
    }
  }, [isError, navigate]);

  return (isSuccess && trueSuccess) || (token && isUninitialized) ? (
    <Outlet />
  ) : isLoading ? (
    <LoadingView isLoading={isLoading} />
  ) : null;
}
