import { Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '@/app/hooks';
import ErrorStatus from '@/components/ErrorStatus';
import Logo from '@/components/Logo';
import SignInForm from '@/components/SignInForm';
import { useLoginMutation } from '@/features/auth/authApiSlice';
import { setCredentials } from '@/features/auth/authSlice';
import paths from '@/routes/paths';

export type SignInFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const handleSubmit = async (
    values: SignInFormValues,
    resetValues: () => void
  ) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setCredentials(response));
      resetValues();
      navigate(paths.home);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  return (
    <Stack h="100dvh" justify="center" align="center">
      <Logo />
      {isError && (
        <Stack spacing={8} mx="auto" maxW="lg" w="full" px={6}>
          <ErrorStatus error={error} />
        </Stack>
      )}
      <SignInForm handleSubmit={handleSubmit} isLoading={isLoading} />
    </Stack>
  );
}
