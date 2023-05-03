import { Button, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import ErrorStatus from '@/components/ErrorStatus';
import Logo from '@/components/Logo';
import SignInForm from '@/components/SignInForm';
import {
  useLoginMutation,
  useSendLogoutMutation,
} from '@/features/auth/authApiSlice';
import { selectToken, setCredentials } from '@/features/auth/authSlice';

export type SignInFormValues = {
  username: string;
  password: string;
};

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const token = useAppSelector(selectToken);

  const [login, { isLoading, isError, error }] = useLoginMutation();
  const [sendLogout, { isLoading: isLogoutLoading }] = useSendLogoutMutation();

  const handleSubmit = async (
    values: SignInFormValues,
    resetValues: () => void
  ) => {
    try {
      const response = await login(values).unwrap();
      dispatch(setCredentials(response));
      resetValues();
      navigate('/dash');
    } catch (err) {
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  const handleLogout = async () => {
    await sendLogout();
    navigate('/');
  };

  return (
    <Stack h="100dvh" justify="center" align="center">
      <Logo />
      {isError && (
        <Stack spacing={8} mx="auto" maxW="lg" w="full" px={6}>
          <ErrorStatus error={error} />
        </Stack>
      )}
      {!token ? (
        <SignInForm handleSubmit={handleSubmit} isLoading={isLoading} />
      ) : (
        <Button onClick={handleLogout} isLoading={isLogoutLoading}>
          Wyloguj się
        </Button>
      )}
    </Stack>
  );
}
