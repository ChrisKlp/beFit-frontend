import { Stack } from '@chakra-ui/react';
import Logo from '@/components/Logo';
import SignInForm from '@/components/SignInForm';

export type SignInFormValues = {
  login: string;
  password: string;
};

export default function LoginPage() {
  const handleSubmit = async (values: SignInFormValues) => {
    console.log(values);
  };

  return (
    <Stack h="100dvh" justify="center" align="center">
      <Logo />
      <SignInForm handleSubmit={handleSubmit} />
    </Stack>
  );
}
