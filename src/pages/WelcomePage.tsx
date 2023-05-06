import { Stack } from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '@/components/Logo';
import { usePingQuery } from '@/features/auth/authApiSlice';
import LoadingIndicator from '@/components/LoadingIndicator';

export default function WelcomePage() {
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = usePingQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate('/home');
    }
  }, [isSuccess, navigate]);

  return (
    <Stack h="100dvh" justify="center" align="center">
      <Logo isBig isError={isError} />
      {isLoading && <LoadingIndicator />}
    </Stack>
  );
}
