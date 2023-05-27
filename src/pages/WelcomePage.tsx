import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LoadingView from '@/components/LoadingView';
import { usePingQuery } from '@/features/auth/authApiSlice';
import paths from '@/routes/paths';

export default function WelcomePage() {
  const navigate = useNavigate();

  const { isLoading, isSuccess, isError } = usePingQuery(undefined, {
    pollingInterval: 5000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });

  useEffect(() => {
    if (isSuccess) {
      navigate(paths.home);
    }
  }, [isSuccess, navigate]);

  return <LoadingView isError={isError} isLoading={isLoading} />;
}
