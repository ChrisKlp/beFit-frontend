import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { useRefreshMutation } from './authApiSlice';
import { selectToken } from './authSlice';
import LoadingIndicator from '@/components/LoadingIndicator';
import ErrorStatus from '@/components/ErrorStatus';

export default function RefreshLogin() {
  const effectRan = useRef(false);
  const token = useSelector(selectToken);
  const [trueSuccess, setTrueSuccess] = useState(false);

  const [refresh, { isUninitialized, isLoading, isSuccess, isError, error }] =
    useRefreshMutation();

  useEffect(() => {
    if (effectRan.current === true || process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        try {
          await refresh();
          setTrueSuccess(true);
        } catch (err) {
          // eslint-disable-next-line no-console
          console.error(err);
        }
      };

      if (!token) verifyRefreshToken();
    }

    return () => {
      effectRan.current = true;
    };

    // eslint-disable-next-line
  }, []);

  return (isSuccess && trueSuccess) || (token && isUninitialized) ? (
    <Outlet />
  ) : isError ? (
    <ErrorStatus error={error} />
  ) : isLoading ? (
    <LoadingIndicator />
  ) : null;
}
