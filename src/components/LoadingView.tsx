import { Stack } from '@chakra-ui/react';
import LoadingIndicator from './LoadingIndicator';
import Logo from './Logo';

type Props = {
  isBig?: boolean;
  isError?: boolean;
  isLoading?: boolean;
};

export default function LoadingView({ isBig, isError, isLoading }: Props) {
  return (
    <Stack h="100dvh" justify="center" align="center">
      <Logo isBig={isBig} isError={isError} />
      {isLoading && <LoadingIndicator />}
    </Stack>
  );
}
